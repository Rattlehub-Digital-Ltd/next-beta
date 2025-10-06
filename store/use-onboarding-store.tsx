import { create } from "zustand";

type OnboardingStoreProps = {
	isEmailVerified: boolean;
	setIsEmailVerified: (isEmailVerified: boolean) => void;
	nextButtonDisabled: boolean;
	previoiusButtonDisabled: boolean;
	isOnboarded: boolean | undefined;
	setNextButtonDisabled: (nextButtonDisabled: boolean) => void;
	setPreviousButtonDisabled: (previoiusButtonDisabled: boolean) => void;
	setIsOnboarded: (isOnboarded: boolean | undefined) => void;
	// redirectToDashboard: boolean;
	// setRedirectToDashboard: (redirectToDashboard: boolean) => void;
};

export const useOnboardingStore = create<OnboardingStoreProps>((set) => ({
	isEmailVerified: false,
	setIsEmailVerified: (isEmailVerified) => set({ isEmailVerified }),
	nextButtonDisabled: false,
	isOnboarded: undefined,
	setNextButtonDisabled: (nextButtonDisabled) => set({ nextButtonDisabled }),
	previoiusButtonDisabled: false,
	setPreviousButtonDisabled: (previoiusButtonDisabled) =>
		set({ previoiusButtonDisabled }),
	setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
	// redirectToDashboard: true,
	// setRedirectToDashboard: (redirectToDashboard) =>
	// 	set({ redirectToDashboard }),
}));
