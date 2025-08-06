import type { RiskItemProps } from "./risk-item-props";

export type ActionItem = {
	id: string;
	name: string;
	displayName: string;
	module: string;
	ownerDisplayName: string;
	section: string;
	ranking: number;
	eduText: string;
	isComplete: boolean;
	riskItems: RiskItemProps[];
};

export type ActionsResponse = {
	items: ActionItem[];
	totalPages: number;
	totalItems: number;
	pageNumber: number;
	pageSize: number;
};

export type DocumentsResponse = {
	data: ActionsResponse;
};
