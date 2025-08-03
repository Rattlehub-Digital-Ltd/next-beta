import type { RiskItemProps } from "./risk-item-props";

export type SuggestedFor = {
	name: string;
	displayName: string;
	eduText: string | null;
	affectedOwners: string[];
};

export type ServiceProvider = {
	name: string;
	summary: string;
	isPreferred: boolean;
};

export type SuggestedReading = {
	name: string;
	link: string;
};

export type Suggested = {
	ranking: number;
	suggestedFor: SuggestedFor[];
	serviceProviders: ServiceProvider[];
	suggestedReadings: SuggestedReading[];
	id: string;
	name: string;
	displayName: string;
	eduText: string;
	isApplicable: null;
	riskItems: RiskItemProps[];
};
