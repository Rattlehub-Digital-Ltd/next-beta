import { create } from "zustand";
import type { ActivitySummary } from "@/types/activity-summary";

interface ActivitySummaryStoreProps {
	activity: ActivitySummary | null;
	setActivity: (activity: ActivitySummary | null) => void;
}

export const useActivitySummaryStore = create<ActivitySummaryStoreProps>(
	(set) => ({
		activity: null,
		setActivity: (activity) => set({ activity }),
	}),
);
