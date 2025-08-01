import { create } from "zustand";

interface PersonDrawerProps {
	title: string;
	setTitle: (title: string) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const usePersonDrawerStore = create<PersonDrawerProps>((set) => ({
	open: false,
	title: "Add person",
	setTitle: (title) => set({ title }),
	onOpenChange: (open) => set({ open }),
}));
