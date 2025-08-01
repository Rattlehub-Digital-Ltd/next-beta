import { create } from "zustand";

type OnboardingStoreProps = {
	nextButtonDisabled: boolean;
	isOnboarded: boolean | null;
	setNextButtonDisabled: (nextButtonDisabled: boolean) => void;
	setIsOnboarded: (isOnboarded: boolean) => void;
};

export const useOnboardingStore = create<OnboardingStoreProps>((set) => ({
	nextButtonDisabled: false,
	isOnboarded: null,
	setNextButtonDisabled: (nextButtonDisabled) => set({ nextButtonDisabled }),
	setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
}));
