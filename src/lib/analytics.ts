import Analytics from "analytics";
import { appConfig } from "@/config/app.config";
import googleAnalytics from "@analytics/google-analytics";
import customerIO from "@analytics/customerio";

const analytics = Analytics({
	app: appConfig.name,
	version: appConfig.version,
	plugins: [
		googleAnalytics({
			trackingId: appConfig.analytics.googleAnalytics.trackingId,
		}),
		customerIO({
			siteId: appConfig.analytics.customerIO.siteId,
		}),
	],
});

export const track = (eventName: string, payload?: Record<string, any>) => {
	analytics.track(eventName, payload);
};

export const identify = (userId: string, traits?: Record<string, any>) => {
	analytics.identify(userId, traits);
};

export default analytics;
