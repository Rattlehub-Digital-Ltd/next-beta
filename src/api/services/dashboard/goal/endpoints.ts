import type { PaginationParams } from "@/types";

export const goalEndpoints = {
	getGoals: (paging: PaginationParams) =>
		`/goals?PageNumber=${paging.page}&PageSize=${paging.limit}`,
} as const;
