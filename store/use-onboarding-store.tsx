import { create } from "zustand";

interface ChannelStore {
	isOnboarded: boolean | null;
	setIsOnboarded: (isOnboarded: boolean) => void;
}

export const useOnboardingStore = create<ChannelStore>((set) => ({
	isOnboarded: null,
	setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
}));
