import type { PaginationParams } from "@/types";

export const suggestionEndpoints = {
	getSuggestions: (paging: PaginationParams) =>
		`/suggestions?PageNumber=${paging.page}&PageSize=${paging.limit}`,
	toggleSuggestion: () => `/suggestions/toggle`,
} as const;
