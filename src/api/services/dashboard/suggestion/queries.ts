"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import type { PaginationParams } from "@/types";
import { suggestionEndpoints } from "./endpoints";
import type { Suggested } from "./types";

export const useGetSuggestions = (paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["suggestions", paging],
		queryFn: async () => {
			const { data } = await client.get<Suggested[]>(
				suggestionEndpoints.getSuggestions(paging),
			);

			return data;
		},
	});
};

export const useToggleSuggestion = (paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["toggle_suggestion", paging],
		queryFn: async () => {
			const { data } = await client.get<object>(
				suggestionEndpoints.toggleSuggestion(),
			);

			return data;
		},
	});
};
