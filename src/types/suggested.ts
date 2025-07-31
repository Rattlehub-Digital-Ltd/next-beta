import type { RiskItemProps } from "./risk-item-props";

type SuggestedFor = {
	name: string;
	displayName: string;
	eduText: string | null;
	affectedOwners: string[];
};

type ServiceProvider = {
	name: string;
	summary: string;
	isPreferred: boolean;
};

type SuggestedReading = {
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
