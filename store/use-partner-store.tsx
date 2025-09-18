import { create } from "zustand";
import type { Person } from "@/types/person";

interface PartnerStoreProps {
	has: string | null;
	setHas: (has: string | null) => void;
	partner: Person[] | null;
	setPartner: (partner: Person[] | null) => void;
}

export const usePartnerStore = create<PartnerStoreProps>((set) => ({
	has: null,
	setHas: (has) => set({ has }),
	partner: null,
	setPartner: (partner) => set({ partner }),
}));
