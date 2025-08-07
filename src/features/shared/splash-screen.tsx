"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useAppStore } from "store/use-app-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { Spinner } from "@/components/ui/spinner";
import useApi from "@/hooks/use-api";

export default function SplashScreen() {
	const { isAuthenticated } = useAuth0();
	const { getOnboardingStatus, getActivitySummary } = useApi();

	const { setIsOnboarded } = useOnboardingStore();
	const { setActivity } = useActivitySummaryStore();
	const { loading, setLoading, initialized, setInitialized } = useAppStore();

	const initialize = useCallback(async () => {
		setLoading(true);

		if (isAuthenticated) {
			try {
				const onboardingStatusResp = await getOnboardingStatus();
				const isOnboarded = onboardingStatusResp?.data?.isOnboarded;
				setIsOnboarded(isOnboarded);

				const activitySummaryResp = await getActivitySummary();
				setActivity(activitySummaryResp?.data);

				setInitialized(true);

				// redirect(isOnboarded ? "/dashboard" : "/dashboard/onboarding");

				setLoading(false);
			} catch (error) {
				setInitialized(false);
				console.log(error);
				setLoading(false);
				toast.error("Error initializing, Something went wrong");
			}
		} else {
			setInitialized(false);
			setLoading(false);
			console.log(initialized);
			redirect(window.location.origin ? "/" : "/login");
		}
	}, [
		initialized,
		isAuthenticated,
		setActivity,
		getOnboardingStatus,
		getActivitySummary,
		setInitialized,
		setIsOnboarded,
		setLoading,
	]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	if (!loading && initialized) return;

	if (!loading && !initialized)
		return <div className="p-4">Error initializing app</div>;

	return (
		<div className="flex flex-col fixed z-200 top-0 left-0 right-0 bottom-0 h-full w-full items-center justify-center bg-[#111827]">
			<div className="relative flex items-center justify-center h-24 w-24">
				<Image
					src="/wordmark-dark.svg"
					height={36}
					width={36}
					loading="eager"
					alt="Logo"
				/>
				<Spinner className="absolute" variant="dark" size="3xl" />
			</div>
		</div>
	);
}
