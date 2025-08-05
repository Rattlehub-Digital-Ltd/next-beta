import { appConfig } from "@/config/app.config";

const BASE_PATH = appConfig.previewMode ? "/api" : "/nextdot-snapshot/api";

export const requests = {
	activity: `${BASE_PATH}/documents/activity-summary`,
	onBoarding: {
		status: `${BASE_PATH}/onboarding/status`,
	},
};
