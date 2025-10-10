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

		// const deviceInfo = navigator ? navigator.userAgent : "unknown";

		if (analytics) {
			analytics.track(eventName, {
				...getUTMParams(),
				...(payload ?? {}),
				// user_agent: deviceInfo,
			});
		}
	} catch (error) {
		console.error("Invalid analytics event:", error);
	}
};

// export const track = (
// 	eventName: string,
// 	payload?: Record<string, string | object | number | boolean>,
// ) => {
// 	if (
// 		typeof window === "undefined" ||
// 		!window.location ||
// 		process.env.NODE_ENV === "development"
// 	)
// 		return;

// 	try {
// 		if (window.gtag) {
// 			// Google Analytics
// 			const gtag_enriched_context = {
// 				...payload,
// 				...getUTMParams(),
// 			};

// 			window.gtag("event", eventName, gtag_enriched_context);
// 		}

// 		if (window._cio && typeof window._cio.track === "function") {
// 			// Customer.io
// 			const cio_enriched_context = {
// 				...payload,
// 				page: window.location.href,
// 				referrer: typeof document !== "undefined" ? document.referrer : "",
// 				user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
// 				timestamp: new Date().toISOString(),
// 				...getUTMParams(),
// 			};
// 			window._cio.track(eventName, cio_enriched_context);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const identify = (
	userId: string,
	traits?: Record<string, string | object>,
) => {
	try {
		analytics.identify(userId, { ...(traits ?? {}) });
	} catch (error) {
		console.log("Analytics identify error:", error);
	}
};

export default analytics;
