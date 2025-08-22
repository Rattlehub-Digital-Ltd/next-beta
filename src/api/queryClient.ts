export const queryKeys = {
	documents: {
		all: ["documents"] as const,
		byId: (id: string) => ["documents", id] as const,
		byCategory: (category: string) =>
			["documents", "category", category] as const,
	},
	suggestions: {
		all: ["suggestions"] as const,
		byId: (id: string) => ["suggestions", id] as const,
	},
	products: {
		all: ["products"] as const,
		byId: (id: string) => ["products", id] as const,
	},
};
