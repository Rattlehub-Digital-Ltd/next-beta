import { useAuth0 } from "@auth0/auth0-react";
import axios, {
	type AxiosError,
	type AxiosInstance,
	type CreateAxiosDefaults,
	type InternalAxiosRequestConfig,
} from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { appConfig } from "@/config/app.config";

// A flag to prevent multiple refresh calls simultaneously
let isRefreshing = false;

// A queue of requests waiting for the token refresh to complete
const failedRequestsQueue: ((token: string) => void)[] = [];

export default function useAxios() {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const initialize = useCallback(async () => {
		try {
			if (!isAuthenticated || isLoading) return;

			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
				},
				cacheMode: "off",
			});

			setAccessToken(accessToken);

			return accessToken;
		} catch (error) {
			console.log("Error getting access token:", error);
			return null;
		}
	}, [getAccessTokenSilently, isAuthenticated, isLoading]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	const client: AxiosInstance = useMemo(() => {
		const config: CreateAxiosDefaults = {
			baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/${appConfig.apiBasePath}`,
			timeout: 25000,

			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
				Authorization: `Bearer ${accessToken}`,
			},
		};

		const instance = axios.create(config);

		instance.interceptors.request.use(
			async (config: InternalAxiosRequestConfig) => {
				const bearerToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
					},
				});

				setAccessToken(bearerToken);

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
			async function onRejected(error) {
				const status = error.response ? error.response.status : null;
				const originalRequest = error.config;
				const retry = 0;

				if (status === 401) {
					console.log("Unauthorized");

					if (retry < 3 && !isRefreshing) {
						try {
							isRefreshing = true;

							originalRequest.__isRetryRequest = true;
							const accessToken = await getAccessTokenSilently({
								authorizationParams: {
									audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
								},
								cacheMode: "off",
							});

							setAccessToken(accessToken);

							if (accessToken) {
								originalRequest.headers.Authorization = `Bearer ${accessToken}`;
							}

							// Implement a delay before retrying (e.g., exponential backoff)
							await new Promise((resolve) =>
								setTimeout(resolve, (retry + 1) * 1000),
							);

							return instance(originalRequest);
						} catch (error) {
							console.log("Error refreshing token:", error);
							return Promise.reject(error);
						} finally {
							isRefreshing = false;
						}
					}

					// 🚨 Check 3: If refresh is in progress, queue the current failed request
					return new Promise((resolve) => {
						failedRequestsQueue.push((token: string) => {
							// Once the token is refreshed, resolve the promise by retrying the request
							originalRequest.headers.Authorization = `Bearer ${token}`;
							resolve(instance(originalRequest));
						});
					});
				}

				return Promise.reject(error);
			},
		);

		return instance;
	}, [getAccessTokenSilently, accessToken]);

	return { client, accessToken };
}
