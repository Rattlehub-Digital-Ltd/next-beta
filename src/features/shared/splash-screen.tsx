"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
// import { RedirectType, redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAppStore } from "store/use-app-store";
// import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import { Spinner } from "@/components/ui/spinner";

export default function SplashScreen() {
	const { user } = useAuth0();

	// const { setIsOnboarded, setIsEmailVerified } = useOnboardingStore();
	// const { setActivity } = useActivitySummaryStore();
	const { setInitialized, setIsAdmin } = useAppStore();

	const [isInitializing, setIsInitializing] = useState(true);

	// const {
	// 	data: activity,
	// 	isError: isActivityError,
	// 	isLoading: isLoadingActivity,
	// } = useGetActivitySummary();

	const {
		// data: onboardingStatus,
		isError: isOnboardingError,
		isLoading: isLoadingOnboarding,
	} = useGetOnboarding();

	// const { data: products, isLoading: isLoadingProducts } = useGetProducts();

	const initialize = useCallback(async () => {
		if (isLoadingOnboarding) return;

		// if (!isAuthenticated) {
		// 	redirect("/login", RedirectType.replace);
		// }

		if (user) {
			const role = user?.["https://app.nextdot.ai/roles"]?.[0] as string;
			if (role && role.toLowerCase() === "rattlehub-staff") {
				setIsAdmin(true);
			}
		}

		// if (products) {
		// 	const plan = products.find((product) => product.subscribed);
		// 	setProduct(plan ?? null);
		// }

		// if (activity) {
		// 	setActivity(activity);
		// }

		// if (onboardingStatus) {
		// 	setIsOnboarded(onboardingStatus.isOnboarded);
		// 	setIsEmailVerified(onboardingStatus.isEmailVerified);
		// }

		setInitialized(true);
		setIsInitializing(false);

		// if (onboardingStatus) {
		// 	setInitialized(true);
		// 	setIsInitializing(false);

		// 	if (!onboardingStatus.isEmailVerified)
		// 		redirect("/dashboard/verify", RedirectType.replace);

		// 	const originHref = sessionStorage.getItem("origin_href");

		// 	if (originHref) {
		// 		sessionStorage.removeItem("origin_href");
		// 		redirect(originHref, RedirectType.replace);
		// 	} else if (!isSuccessDialogOpen) {
		// 		redirect(
		// 			onboardingStatus.isOnboarded ? "/dashboard" : "/dashboard/onboarding",
		// 		);
		// 	}
		// }
	}, [
		// isSuccessDialogOpen,
		// activity,
		// onboardingStatus,
		setIsAdmin,
		user,
		// setActivity,
		// setIsOnboarded,
		setInitialized,
		// getIdTokenClaims,
		// setIsAdmin,
		// setProduct,
		// setIsEmailVerified,
		// isLoadingActivity,
		isLoadingOnboarding,
		// isAuthLoading,
		// isAuthenticated,
	]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	if (!isInitializing) return;
	// if (!isAuthenticated) redirect("/login");

	if (!isInitializing) {
		if (isOnboardingError)
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
