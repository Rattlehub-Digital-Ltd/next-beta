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

export interface Frequency {
	interval: "month" | "year" | "week" | "day";
	repeat: number;
	summary: string;
}

export interface ProductPlan {
	id: string;
	name: string;
	description: string;
	price: number;
	frequency: Frequency;
	features: string[];
	subscribed: boolean;
	subscriptionId: string | null;
}
