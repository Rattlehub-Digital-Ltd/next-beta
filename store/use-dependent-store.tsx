import { create } from "zustand";
import type { Person } from "@/types/person";

interface DependentStoreProps {
	has: string | null;
	setHas: (has: string | null) => void;
	dependents: Person[] | null;
	setDependents: (dependents: Person[] | null) => void;
}

export const useDependentStore = create<DependentStoreProps>((set) => ({
	has: null,
	setHas: (has) => set({ has }),
	dependents: [],
	setDependents: (dependents) => set({ dependents }),
}));
