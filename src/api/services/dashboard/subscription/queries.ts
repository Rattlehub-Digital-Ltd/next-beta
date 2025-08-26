import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryClient";
import useAxios from "@/hooks/use-axios";
import { subscriptionEndpoints } from "./endpoints";
import type { ProductPlan } from "./types";

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
	const queryClient = useQueryClient();
	const { client } = useAxios();

	return useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			await client.post(subscriptionEndpoints.subscribeToProduct(id), {
				headers: { "Content-Type": "application/json-patch+json" },
				cancelPath: "/dashboard/subscription?cancel=true",
				//"/\\I%vYYjyRo7f~p@pk {zMJ%O>hoV5CeB%3c0z_g*(b<a\"J>EAH/ZLsp_nn2hYk'W$eo\"g1@'@Bx(gUg6?%QBn#bmYLZ!*sa)-",
			});
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
