export const onboardingEndpoints = {
	getOnboardingStatus: () => "/onboarding/status",
	getSettings: () => "/settings",
	toggleSetting: () => "/settings/toggle",
	submitData: () => "/onboarding",
} as const;
