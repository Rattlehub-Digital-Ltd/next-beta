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

export type OnboardingDataPayload = {
	partner: {
		name: string;
		surname: string;
	} | null;
	children: {
		relationship: string;
		name: string;
		surname: string;
	}[];
	dependents: {
		relationship: string;
		name: string;
		surname: string;
	}[];
	settings: {
		id: string;
		isApplicable: boolean | null;
	}[];
};
