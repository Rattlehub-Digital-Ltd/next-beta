export type ActivitySummary = {
	completed: number;
	pending: number;
	suggested: number;
	lastActivityDate: string;
};

export type ActivitySummaryResponse = {
	data: ActivitySummary;
};
