import type { RiskItemProps } from "@/types/risk-item-props";

export type OnboardingStatus = { data: { isOnboarded: boolean } };

export type IsOnboardedStatus = {
	isOnboarded: boolean;
};

export type EstateChecklistItem = {
	eduText?: string | null;
	id: string;
	name?: string;
	displayName?: string;
	isApplicable: string | null;
	riskItems?: RiskItemProps[];
};
