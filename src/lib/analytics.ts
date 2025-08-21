import customerIO from "@analytics/customerio";
import googleAnalytics from "@analytics/google-analytics";
import Analytics from "analytics";
import { appConfig } from "@/config/app.config";

const analytics = Analytics({
	app: appConfig.name,
	version: appConfig.version,
	plugins: [
		googleAnalytics({
			measurementIds: [process.env.NEXT_PUBLIC_MEASUREMENT_ID as string],
		}),
		customerIO({
			siteId: process.env.NEXT_PUBLIC_SITE_ID as string,
			apiKey: process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY as string,
		}),
	],
});

export function getUTMParams() {
	if (typeof window === "undefined" || !window.sessionStorage) {
		return {
			utm_source: undefined,
			utm_medium: undefined,
			utm_campaign: undefined,
			utm_term: undefined,
			utm_content: undefined,
		};
	}

	return {
		utm_source: sessionStorage.getItem("utm_source") || undefined,
		utm_medium: sessionStorage.getItem("utm_medium") || undefined,
		utm_campaign: sessionStorage.getItem("utm_campaign") || undefined,
		utm_term: sessionStorage.getItem("utm_term") || undefined,
		utm_content: sessionStorage.getItem("utm_content") || undefined,
	};
}

export const track = (
	eventName: string,
	payload?: Record<string, string | object>,
) => {
	if (appConfig.previewMode || process.env.NODE_ENV === "development") return;

	analytics.track(eventName, { ...payload, ...getUTMParams() });
};

export const identify = (
	userId: string,
	traits?: Record<string, string | object>,
) => {
	if (appConfig.previewMode || process.env.NODE_ENV === "development") return;

	analytics.identify(userId, { ...traits, ...getUTMParams() });
};

export default analytics;
