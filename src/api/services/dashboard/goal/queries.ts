"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import type { PaginationParams } from "@/types";
import { goalEndpoints } from "./endpoints";
import type { Goal } from "./types";

export const useGetGoals = (paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["goals", paging],
		queryFn: async () => {
			const { data } = await client.get<Goal[]>(goalEndpoints.getGoals(paging));

			return data;
		},
	});
};
