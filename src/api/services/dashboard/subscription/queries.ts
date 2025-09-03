import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryClient";
import useAxios from "@/hooks/use-axios";
import { subscriptionEndpoints } from "./endpoints";
import type { ProductPlan, SubscribeResponse } from "./types";

export const useGetProducts = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: [...queryKeys.products.all],
		queryFn: async () => {
			const { data } = await client.get<ProductPlan[]>(
				subscriptionEndpoints.getProducts(),
			);

			return data;
		},
	});
};

export const useSubscribeToProduct = () => {
	const { client } = useAxios();

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			const { data } = await client.post<SubscribeResponse>(
				subscriptionEndpoints.subscribeToProduct(id),
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json-patch+json",
						cancelPath: "/dashboard/subscription?cancel=true",
					},
					maxRedirects: 0,
				},
			);

			return { id, data };
		},
	});
};
