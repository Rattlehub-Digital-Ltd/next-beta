import { appConfig } from "@/config/app.config";
import type { PaginationParams } from "@/types";

export const dashboardEndpoints = {
	getActivitySummary: () =>
		"/documents/activity-summary?PageNumber=1&PageSize=1",
	getInfiniteDocuments: (page: number) => `/documents?PageNumber=${page}`,
	getDocuments: (paging: PaginationParams) =>
		`/documents?PageNumber=${paging.page}&PageSize=${paging.limit}`,
	getAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
	submitAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
	autoAdvanceAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
	getTimeline: (paging: PaginationParams) =>
		`/documents/activity?PageNumber=${paging.page}&PageSize=${paging.limit}`,
	getInfiniteTimeline: (page: number) =>
		`/documents/activity?PageNumber=${page}`,
	getGoalDocuments: (goalName: string) =>
		`/overview/documents?goalName=${goalName}`,
} as const;
