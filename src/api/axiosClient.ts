import { useAuth0 } from "@auth0/auth0-react";
import axios, {
	type AxiosError,
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";
import { appConfig } from "@/config/app.config";

export const client = (() => {
	return axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/${appConfig.apiBasePath}`,
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
		},
	});
})();

client.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const { getAccessTokenSilently } = useAuth0();

		const accessToken = await getAccessTokenSilently({
			authorizationParams: {
				audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
			},
		});

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

client.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},

	async (error) => {
		const { getAccessTokenSilently } = useAuth0();

		const status = error.response ? error.response.status : null;

		if (status === 401) {
			try {
				const originalRequest = error.config;

				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
					},
				});

				client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

				return await client(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		if (status === 403 && error.response.data) {
			return Promise.reject(error.response.data);
		}

		return Promise.reject(error);
	},
);

const axiosClient = async (options: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse) => {
		const { data } = response;
		return data;
	};

	const onError = (error: AxiosError) =>
		Promise.reject({
			message: error.message,
			code: error.code,
			response: error.response,
		});

	return client(options).then(onSuccess).catch(onError);
};

export default axiosClient;
