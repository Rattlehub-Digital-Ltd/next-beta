import { create } from "zustand";

interface AppStoreProps {
	isAdmin: boolean;
	setIsAdmin: (isAdmin: boolean) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	initialized: boolean;
	setInitialized: (initialized: boolean) => void;
}

export const useAppStore = create<AppStoreProps>((set) => ({
	isAdmin: false,
	setIsAdmin: (isAdmin) => set({ isAdmin }),
	loading: true,
	setLoading: (loading) => set({ loading }),
	initialized: false,
	setInitialized: (initialized) => set({ initialized }),
}));
