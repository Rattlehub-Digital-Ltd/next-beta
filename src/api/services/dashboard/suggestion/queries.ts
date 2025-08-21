"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryClient";
import useAxios from "@/hooks/use-axios";
import type { PaginationParams } from "@/types";
import { suggestionEndpoints } from "./endpoints";
import type { Suggested } from "./types";

export const useGetSuggestions = (paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: [...queryKeys.suggestions.all, paging],
		queryFn: async () => {
			const { data } = await client.get<Suggested[]>(
				suggestionEndpoints.getSuggestions(paging),
			);

			return data;
		},
	});
};

export const useToggleSuggestion = () => {
	const queryClient = useQueryClient();
	const { client } = useAxios();

	return useMutation({
		mutationFn: async ({ id, value }: { id: string; value: boolean }) => {
			await client.put(suggestionEndpoints.toggleSuggestion(), {
				isApplicable: value,
				id,
			});
			return { id, value };
		},
		onSuccess: ({ id }) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.suggestions.byId(id),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.suggestions.all });
		},
	});
};
