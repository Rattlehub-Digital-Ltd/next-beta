export type Goal = {
	name: string;
	displayName: string;
	eduText: string;
	ranking: number;
	percentageCompletion: number;
};

export type GoalsResponse = {
	data: Goal[];
};
