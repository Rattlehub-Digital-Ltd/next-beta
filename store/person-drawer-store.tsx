import { create } from "zustand";
import type { PersonType } from "@/types/person";

interface PersonDrawerProps {
	type: PersonType;
	setType: (type: PersonType) => void;
	title: string;
	setTitle: (title: string) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const usePersonDrawerStore = create<PersonDrawerProps>((set) => ({
	type: "unknown",
	setType: (type) => set({ type }),
	open: false,
	title: "Add person",
	setTitle: (title) => set({ title }),
	onOpenChange: (open) => set({ open }),
}));
