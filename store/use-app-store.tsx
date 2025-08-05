import { create } from "zustand";

interface AppStoreProps {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	initialized: boolean;
	setInitialized: (initialized: boolean) => void;
}

export const useAppStore = create<AppStoreProps>((set) => ({
	loading: true,
	setLoading: (loading) => set({ loading }),
	initialized: false,
	setInitialized: (initialized) => set({ initialized }),
}));
