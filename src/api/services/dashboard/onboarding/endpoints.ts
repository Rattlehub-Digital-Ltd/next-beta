export const onboardingEndpoints = {
	getOnboardingStatus: () => "/onboarding/status",
	getSettings: () => "/settings",
	toggleSetting: () => "/settings/toggle",
} as const;
