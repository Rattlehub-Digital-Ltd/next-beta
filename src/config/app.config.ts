const isPreviewMode = true;
const API_BASE_PATH = isPreviewMode ? "api" : "nextdot-snapshot/api";

export const appConfig = {
	name: "NEXT BETA",
	description: "The beta chapter",
	version: "0.0.1",
	previewMode: isPreviewMode,
	avatarPlaceholder: "https://www.tapback.co/api/avatar/user95?color=3",
	apiBasePath: API_BASE_PATH,
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: isPreviewMode
				? "https://dev.nextdot.app"
				: "https://nextdot.app",

	links: {
		privacyPolicy: "https://rattlehub.com/privacy-policy/",
		dataPolicy: "https://rattlehub.com/data-policy/",
		termsOfUse: "https://rattlehub.com/terms-of-use/",
	},
	analytics: {
		googleAnalytics: {
			trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID || "",
		},
		customerIO: {
			siteId: process.env.NEXT_PUBLIC_CUSTOMERIO_SITE_ID || "",
			apiKey: process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY as string,
		},
	},
};
