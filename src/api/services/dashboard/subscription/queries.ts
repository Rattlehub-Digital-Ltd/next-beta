import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryClient";
import useAxios from "@/hooks/use-axios";
import { subscriptionEndpoints } from "./endpoints";
import type { Product } from "./types";

export const useGetProducts = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: [...queryKeys.products.all],
		queryFn: async () => {
			const { data } = await client.get<Product[]>(
				subscriptionEndpoints.getProducts(),
			);

			return data;
		},
	});
};

export const useSubscribeToProduct = () => {
	const queryClient = useQueryClient();
	const { client } = useAxios();

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			await client.put(subscriptionEndpoints.subscribeToProduct(id));
			return id;
		},
		onSuccess: (id) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.products.byId(id),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
		},
	});
};
