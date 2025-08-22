export const subscriptionEndpoints = {
	getProducts: () => `/products`,
	subscribeToProduct: (productId: string) => `products/${productId}/subscribe`,
} as const;
