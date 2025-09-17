import customerIO from "@analytics/customerio";
import googleAnalytics from "@analytics/google-analytics";
import Analytics from "analytics";
import { z } from "zod";
import { appConfig } from "@/config/app.config";

// Validation schema for analytics events
const EventSchema = z.object({
	name: z.string(),
	properties: z.record(z.string(), z.unknown()).optional(),
});

type AnalyticsEvent = z.infer<typeof EventSchema>;

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

// Add this helper function above getUTMParams
const removeEmptyValues = (obj: Record<string, string | undefined>) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value != null),
	);
};

export function getUTMParams() {
	if (typeof window === "undefined" || !window.sessionStorage) {
		return {};
	}

	const utmParams = {
		utm_source: sessionStorage.getItem("utm_source") || undefined,
		utm_medium: sessionStorage.getItem("utm_medium") || undefined,
		utm_campaign: sessionStorage.getItem("utm_campaign") || undefined,
		utm_term: sessionStorage.getItem("utm_term") || undefined,
		utm_content: sessionStorage.getItem("utm_content") || undefined,
	};

	return removeEmptyValues(utmParams);
}

export const track = (
	eventName: string,
	payload?: Record<string, string | object | number | boolean>,
) => {
	try {
		const event: AnalyticsEvent = {
			name: eventName,
			properties: payload,
		};
		EventSchema.parse(event);

		if (
			!appConfig.previewMode &&
			process.env.NODE_ENV === "production" &&
			analytics
		) {
			analytics.track(eventName, { ...getUTMParams(), ...(payload ?? {}) });
		}
	} catch (error) {
		console.error("Invalid analytics event:", error);
	}
};

export const identify = (
	userId: string,
	traits?: Record<string, string | object>,
) => {
	if (appConfig.previewMode || process.env.NODE_ENV === "development") return;

	analytics.identify(userId, { ...getUTMParams(), ...(traits ?? {}) });
};

export default analytics;
