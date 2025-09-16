import { create } from "zustand";

type OnboardingStoreProps = {
	isEmailVerified: boolean;
	setIsEmailVerified: (isEmailVerified: boolean) => void;
	nextButtonDisabled: boolean;
	isOnboarded: boolean | undefined;
	setNextButtonDisabled: (nextButtonDisabled: boolean) => void;
	setIsOnboarded: (isOnboarded: boolean | undefined) => void;
};

export const useOnboardingStore = create<OnboardingStoreProps>((set) => ({
	isEmailVerified: false,
	setIsEmailVerified: (isEmailVerified) => set({ isEmailVerified }),
	nextButtonDisabled: false,
	isOnboarded: undefined,
	setNextButtonDisabled: (nextButtonDisabled) => set({ nextButtonDisabled }),
	setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
}));
