export interface PaginationParams {
	page: number;
	limit: number;
}

export type Timeline = {
	displayName: string;
	ownerDisplayName: string;
	completed: boolean;
	applicable: boolean;
	modifiedDate: string;
	categories: string[];
	description: string;
};

export type TimelineData = {
	items: Timeline[];
	totalPages: number;
	totalItems: number;
	pageNumber: number;
	pageSize: number;
};
