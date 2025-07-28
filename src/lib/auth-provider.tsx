import { Auth0Provider, type Auth0ProviderOptions } from "@auth0/auth0-react";
import { appConfig } from "@/config/app.config";

const domain = process.env.NEXT_PUBLIC_OIDC_DOMAIN || "";
const clientId = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID || "";

const configuration: Auth0ProviderOptions = {
	domain,
	clientId,
	useRefreshTokens: true,
	cacheLocation: "localstorage",
	useRefreshTokensFallback: true,
	authorizationParams: {
		audience: process.env.NEXT_PUBLIC_AUDIENCE || "",
		redirect_uri: `${appConfig.baseURL}/snapshot`,
		scope: "openid profile offline_access",
	},
	onRedirectCallback: (appState, user) => {
		console.log(appState, user);
	},
};

function AuthProvider({ children }: { children: React.ReactNode }) {
	return <Auth0Provider {...configuration}>{children}</Auth0Provider>;
}

export default AuthProvider;
