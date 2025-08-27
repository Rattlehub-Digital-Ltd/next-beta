import { create } from "zustand";
import type { EstateChecklistItem } from "@/api/services/dashboard/onboarding/types";

interface DocumentsStoreProps {
	documents: EstateChecklistItem[];
	setDocuments: (documents: EstateChecklistItem[]) => void;
}

export const useDocumentStore = create<DocumentsStoreProps>((set) => ({
	documents: [],
	setDocuments: (documents) => set({ documents }),
}));
