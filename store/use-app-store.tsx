import {  ProductPlan } from "@/api/services/dashboard/subscription/types";
import { create } from "zustand";

interface AppStoreProps {
	product: ProductPlan | null;
	setProduct: (product: ProductPlan | null) => void;
	isAdmin: boolean;
	setIsAdmin: (isAdmin: boolean) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	initialized: boolean;
	setInitialized: (initialized: boolean) => void;
}

export const useAppStore = create<AppStoreProps>((set) => ({
	product: null,
	setProduct: (product:ProductPlan | null) => set({ product }),
	isAdmin: false,
	setIsAdmin: (isAdmin) => set({ isAdmin }),
	loading: true,
	setLoading: (loading) => set({ loading }),
	initialized: false,
	setInitialized: (initialized) => set({ initialized }),
}));
