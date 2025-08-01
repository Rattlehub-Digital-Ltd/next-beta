import { create } from "zustand";
import type { Person } from "@/types/person";

interface PartnerStoreProps {
	partner: Person[] | null;
	setPartner: (partner: Person[] | null) => void;
}

export const usePartnerStore = create<PartnerStoreProps>((set) => ({
	partner: [],
	setPartner: (partner) => set({ partner }),
}));
