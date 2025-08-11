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
		}),
	],
});

export const track = (
	eventName: string,
	payload?: Record<string, string | object>,
) => {
	if (appConfig.previewMode || process.env.NODE_ENV === "development") return;

	analytics.track(eventName, payload);
};

export const identify = (
	userId: string,
	traits?: Record<string, string | object>,
) => {
	if (appConfig.previewMode || process.env.NODE_ENV === "development") return;

	analytics.identify(userId, traits);
};

export default analytics;
