import { useContext } from "react";
import { AnalyticsContext } from "@/lib/analytics-provider";

export const useAnalytics = () => {
	return useContext(AnalyticsContext);
};
