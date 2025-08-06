import { create } from "zustand";

type OnboardingStoreProps = {
	nextButtonDisabled: boolean;
	isOnboarded: boolean | undefined;
	setNextButtonDisabled: (nextButtonDisabled: boolean) => void;
	setIsOnboarded: (isOnboarded: boolean | undefined) => void;
};

export const useOnboardingStore = create<OnboardingStoreProps>((set) => ({
	nextButtonDisabled: false,
	isOnboarded: undefined,
	setNextButtonDisabled: (nextButtonDisabled) => set({ nextButtonDisabled }),
	setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
}));
