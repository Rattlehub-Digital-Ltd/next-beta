export const onboardingEndpoints = {
	getOnboardingData: () => "/onboarding?PageNumber=1&PageSize=3",
	getOnboardingStatus: () => "/onboarding/status",
	getSettings: () => "/settings",
	toggleSetting: () => "/settings/toggle",
	submitData: () => "/onboarding",
} as const;
