import type { PaginationParams } from "@/types";

export const suggestionEndpoints = {
	getSuggestions: (params: PaginationParams) =>
		`/suggestions?PageNumber=${params.page}&PageSize=${params.limit}`,
	toggleSuggestion: () => `/suggestions/toggle`,
} as const;
