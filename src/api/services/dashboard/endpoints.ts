import { appConfig } from "@/config/app.config";
import type { PaginationParams } from "@/types";

export const dashboardEndpoints = {
	getActivitySummary: () => "/documents/activity-summary",
	getInfiniteDocuments: (page: number) => `/documents?PageNumber=${page}`,
	getDocuments: (paging: PaginationParams) =>
		`/documents?PageNumber=${paging.page}&PageSize=${paging.limit}`,
	getAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
	submitAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
	getTimeline: (paging: PaginationParams) =>
		`/documents/activity?PageNumber=${paging.page}&PageSize=${paging.limit}`,
} as const;
