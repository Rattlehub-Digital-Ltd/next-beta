export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	frequency: {
		interval: string;
		repeat: 0;
		summary: string;
	};
	features: string[];
	subscribed: boolean;
	subscriptionId: string;
};
