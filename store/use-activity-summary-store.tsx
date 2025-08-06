import { create } from "zustand";
import type { ActivitySummary } from "@/types/activity-summary";

interface ActivitySummaryStoreProps {
	activity: ActivitySummary | undefined;
	setActivity: (activity: ActivitySummary | undefined) => void;
}

export const useActivitySummaryStore = create<ActivitySummaryStoreProps>(
	(set) => ({
		activity: undefined,
		setActivity: (activity) => set({ activity }),
	}),
);
