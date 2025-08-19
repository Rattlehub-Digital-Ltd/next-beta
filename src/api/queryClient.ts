export const queryKeys = {
	documents: {
		all: ["documents"] as const,
		byId: (id: string) => ["documents", id] as const,
		byCategory: (category: string) =>
			["products", "category", category] as const,
	},
};
