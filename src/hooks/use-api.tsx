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
import { suggestionEndpoints } from "@/api/services/dashboard/suggestion/endpoints";
import { onboardingEndpoints } from "@/api/services/onboarding/endpoints";
import { appConfig } from "@/config/app.config";
import type { PaginationParams } from "@/types";
import type { DocumentsResponse } from "@/types/action-item";
import type { ActivitySummaryResponse } from "@/types/activity-summary";
import { AxiosMethod } from "@/types/axios-method";
import type { OnboardingStatus } from "@/types/onboarding";
import type { SuggestedResponse } from "@/types/suggested";

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

	return {
		accessToken,
		getOnboardingStatus,
		getActivitySummary,
		getSuggestions,
		getDocuments,
	};
};

export default useApi;
