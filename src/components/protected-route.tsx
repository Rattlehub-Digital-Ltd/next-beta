"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import {
	type PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useAppStore } from "store/use-app-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import Loading from "@/features/shared/loading";
import useApi from "@/hooks/use-api";
import type { OnboardingStatus } from "@/types/onboarding";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated } = useAuth0();
	const { getOnboardingStatus, getActivitySummary } = useApi();

	const { setIsOnboarded, isOnboarded } = useOnboardingStore();
	const { activity, setActivity } = useActivitySummaryStore();

	const { setInitialized, initialized } = useAppStore();

	const [isLoading, setIsLoading] = useState(false);

	const onboardingChecked = useRef(
		isOnboarded !== null && isOnboarded !== undefined,
	);
	const activityChecked = useRef(activity !== null && activity !== undefined);

	const checkInitialization = useCallback(async () => {
		if (!isAuthenticated) redirect("/login");
		if (initialized) return;

		try {
			setIsLoading(true);

			let onboardingStatusResp: OnboardingStatus | undefined;
			let isOnboardedValue = false;

			if (!onboardingChecked.current) {
				onboardingStatusResp = await getOnboardingStatus();
				if (onboardingStatusResp?.data) {
					isOnboardedValue = onboardingStatusResp.data.isOnboarded;
					setIsOnboarded(isOnboardedValue);
				}
			}

			if (!activityChecked.current) {
				const activitySummaryResp = await getActivitySummary();

				if (activitySummaryResp?.data) {
					setActivity(activitySummaryResp.data);
					setInitialized(true);
				}
			}

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setInitialized(false);
			toast.error("Error: Private Route, Something went wrong");
		}
	}, [
		initialized,
		setActivity,
		setIsOnboarded,
		getActivitySummary,
		getOnboardingStatus,
		isAuthenticated,
		setInitialized,
	]);

	useEffect(() => {
		checkInitialization();
	}, [checkInitialization]);

	if (isLoading) return <Loading />;

	if (!isAuthenticated) redirect("/login");

	if (!isLoading && !initialized)
		return <div className="p-4">Private route: Access Forbidden!</div>;

	return <div className="h-full w-full">{children}</div>;
}
