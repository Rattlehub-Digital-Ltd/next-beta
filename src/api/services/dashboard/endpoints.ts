import { appConfig } from "@/config/app.config";
import type { PaginationParams } from "@/types";

export const ONBOARDIND_QUERY_KEY = "ONBOARDIND_QUERY_KEY";

export const dashboardEndpoints = {
	getActivitySummary: () => "/documents/activity-summary",
	getDocuments: (paging: PaginationParams) =>
		`/documents?PageNumber=${paging.page}&PageSize=${paging.limit}`,
	getAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
	submitAdaptiveCard: () =>
		appConfig.previewMode ? "/api/AdaptiveCard" : "/guardian/api/AdaptiveCard",
} as const;
