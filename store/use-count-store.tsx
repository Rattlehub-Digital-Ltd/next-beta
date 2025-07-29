import { create } from "zustand";

interface CountProps {
	actionsCount: number | null;
	suggestionsCount: number | null;
	setActionsCount: (value: number) => void;
	setSuggestionsCount: (value: number) => void;
}

export const useCountStore = create<CountProps>((set) => ({
	actionsCount: null,
	suggestionsCount: null,
	setSuggestionsCount: (value) => set({ suggestionsCount: value }),
	setActionsCount: (value) => set({ actionsCount: value }),
}));
