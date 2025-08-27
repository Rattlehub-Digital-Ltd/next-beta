"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useAppStore } from "store/use-app-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import { useGetActivitySummary } from "@/api/services/dashboard/queries";
import { Spinner } from "@/components/ui/spinner";

export default function SplashScreen() {
	const { isAuthenticated, getIdTokenClaims } = useAuth0();

	const { setIsOnboarded } = useOnboardingStore();
	const { setActivity } = useActivitySummaryStore();
	const { setInitialized } = useAppStore();

	const [isInitializing, setIsInitializing] = useState(true);

	const { data: activity, isError: isActivityError } = useGetActivitySummary();

	const { data: onboardingStatus, isError: isOnboardingError } =
		useGetOnboarding();

	const initialize = useCallback(async () => {
		const idTokenClaims = await getIdTokenClaims();
		console.log({ idTokenClaims });

		if (activity) {
			setActivity(activity);
		}
		if (onboardingStatus) setIsOnboarded(onboardingStatus.isOnboarded);

		if (activity && onboardingStatus) {
			setInitialized(true);
			setIsInitializing(false);

			redirect(
				onboardingStatus.isOnboarded ? "/dashboard" : "/dashboard/onboarding",
			);
		}
	}, [
		activity,
		onboardingStatus,
		setActivity,
		setIsOnboarded,
		setInitialized,
		getIdTokenClaims,
	]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	if (!isAuthenticated) redirect("/login");

	if (!isInitializing) return;

	if (!isInitializing) {
		if (isActivityError || isOnboardingError)
			return <div className="p-4">Error initializing app</div>;
	}

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
