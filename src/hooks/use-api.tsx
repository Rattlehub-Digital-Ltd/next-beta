import { useAuth0 } from "@auth0/auth0-react";
import axios, {
	type AxiosError,
	type AxiosInstance,
	type CreateAxiosDefaults,
	type InternalAxiosRequestConfig,
} from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { dashboardEndpoints } from "@/api/services/dashboard/endpoints";
import { goalEndpoints } from "@/api/services/dashboard/goal/endpoints";
import type { GoalsResponse } from "@/api/services/dashboard/goal/types";
import { onboardingEndpoints } from "@/api/services/dashboard/onboarding/endpoints";
import type { OnboardingStatus } from "@/api/services/dashboard/onboarding/types";
import { overviewEndpoints } from "@/api/services/dashboard/overview/endpoints";
import type {
	DocumentLocationResponse,
	EstatePlanResponse,
	FamilyResponse,
	LifeFileDocumentResponse,
} from "@/api/services/dashboard/overview/types";
import { suggestionEndpoints } from "@/api/services/dashboard/suggestion/endpoints";
import type { SuggestedResponse } from "@/api/services/dashboard/suggestion/types";
import { appConfig } from "@/config/app.config";
import type { PaginationParams } from "@/types";
import type { DocumentsResponse } from "@/types/action-item";
import type { ActivitySummaryResponse } from "@/types/activity-summary";
import { AxiosMethod } from "@/types/axios-method";

const useApi = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();
	const [accessToken, setAccessToken] = useState<string | null>();

	const initialize = useCallback(async () => {
		try {
			if (!isAuthenticated) return null;

			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
				},
			});

			setAccessToken(accessToken);

			return accessToken;
		} catch (error) {
			console.log("Error getting access token:", error);
			return null;
		}
	}, [getAccessTokenSilently, isAuthenticated]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	const client: AxiosInstance = useMemo(() => {
		const config: CreateAxiosDefaults = {
			baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/${appConfig.apiBasePath}`,
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
			},
		};

		const instance = axios.create(config);

		instance.interceptors.request.use(
			async (config: InternalAxiosRequestConfig) => {
				const bearerToken = accessToken ?? (await initialize());
				if (bearerToken) {
					config.headers.Authorization = `Bearer ${bearerToken}`;
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			},
		);

		instance.interceptors.response.use(
			function onFulfilled(response) {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response;
			},
			function onRejected(error) {
				const status = error.response ? error.response.status : null;

				if (status === 401) {
					console.log("Unauthorized");
					toast.error(
						"Unauthorized",
						error?.response?.message ??
							"You are not authorized to access this page, please login or contact support.",
					);
				}
				if (status === 403) {
					console.log("Forbidden");
					toast("Forbidden");
				}
				if (status === 404) {
					console.log("Not Found");
					toast("Not Found");
				}
				if (status === 500) {
					console.log("Internal Server Error");
					toast("Internal Server Error");
				}
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				// Do something with response error
				return Promise.reject(error);
			},
		);

		return instance;
	}, [initialize, accessToken]);

	/**
	 * Fetch onboarding status
	 * @returns Promise with onboarding data data
	 */
	const getOnboardingStatus = useCallback(async (): Promise<
		OnboardingStatus | undefined
	> => {
		return await client({
			url: onboardingEndpoints.getOnboardingStatus(),
			method: AxiosMethod.GET,
		});
	}, [client]);

	/**
	 * Fetch Activity summary
	 * @returns Promise with activity data
	 */
	const getActivitySummary = useCallback(async (): Promise<
		ActivitySummaryResponse | undefined
	> => {
		return await client({
			url: dashboardEndpoints.getActivitySummary(),
			method: AxiosMethod.GET,
		});
	}, [client]);

	// Suggestions
	const getSuggestions = useCallback(
		async (
			paging: PaginationParams,
		): Promise<SuggestedResponse | undefined> => {
			return await client({
				url: suggestionEndpoints.getSuggestions(paging),
				method: AxiosMethod.GET,
			});
		},
		[client],
	);

	// Documents
	const getDocuments = useCallback(
		async (
			paging: PaginationParams,
		): Promise<DocumentsResponse | undefined> => {
			return await client({
				url: dashboardEndpoints.getDocuments(paging),
				method: AxiosMethod.GET,
			});
		},
		[client],
	);

	// Goals
	const getGoals = useCallback(
		async (paging: PaginationParams): Promise<GoalsResponse | undefined> => {
			return await client({
				url: goalEndpoints.getGoals(paging),
				method: AxiosMethod.GET,
			});
		},
		[client],
	);

	// Overview
	const getOverviewLifeFileDocuments = useCallback(async (): Promise<
		LifeFileDocumentResponse | undefined
	> => {
		return await client({
			url: overviewEndpoints.getOverviewLifeFileDocuments(),
			method: AxiosMethod.GET,
		});
	}, [client]);

	const getOverviewFamily = useCallback(async (): Promise<
		FamilyResponse | undefined
	> => {
		return await client({
			url: overviewEndpoints.getOverviewFamily(),
			method: AxiosMethod.GET,
		});
	}, [client]);

	const getOverviewEstatePlan = useCallback(async (): Promise<
		EstatePlanResponse | undefined
	> => {
		return await client({
			url: overviewEndpoints.getOverviewEstatePlan(),
			method: AxiosMethod.GET,
		});
	}, [client]);

	const getOverviewDocumentLocations = useCallback(async (): Promise<
		DocumentLocationResponse | undefined
	> => {
		return await client({
			url: overviewEndpoints.getOverviewDocumentLocations(),
			method: AxiosMethod.GET,
		});
	}, [client]);

	// Adaptive card
	const getAdaptiveCard = useCallback(
		async (referer: string, recordId?: string) => {
			const headers: Record<string, string> = {};

			if (recordId) {
				// If recordId is provided, include it in the headers
				headers["x-record-identifier"] = recordId;
			}

			if (referer && referer.length > 0) {
				headers["x-referer-context"] = referer;
			}

			return await client({
				baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}`,
				url: dashboardEndpoints.getAdaptiveCard(),
				method: AxiosMethod.GET,
				headers: {
					...headers,
				},
			});
		},
		[client],
	);

	const submitAdaptiveCard = useCallback(
		async (
			formData: FormData,
			headers: object = {},
		): Promise<object | undefined> => {
			return await client({
				baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}`,
				url: dashboardEndpoints.getAdaptiveCard(),
				method: AxiosMethod.PUT,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
					...headers,
				},
			});
		},
		[client],
	);

	return {
		accessToken,
		getAdaptiveCard,
		submitAdaptiveCard,
		getOnboardingStatus,
		getActivitySummary,
		getSuggestions,
		getDocuments,
		getGoals,
		getOverviewFamily,
		getOverviewEstatePlan,
		getOverviewDocumentLocations,
		getOverviewLifeFileDocuments,
	};
};

export default useApi;
