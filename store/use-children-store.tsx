import { create } from "zustand";
import type { Person } from "@/types/person";

interface ChildrenStoreProps {
	has: string | null;
	setHas: (has: string | null) => void;
	children: Person[] | null;
	setChildren: (children: Person[] | null) => void;
}

export const useChildrenStore = create<ChildrenStoreProps>((set) => ({
	has: null,
	setHas: (has) => set({ has }),
	children: [],
	setChildren: (children) => set({ children }),
}));
