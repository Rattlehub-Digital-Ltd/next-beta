"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useAppStore } from "store/use-app-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import { useGetActivitySummary } from "@/api/services/dashboard/queries";
import { useGetProducts } from "@/api/services/dashboard/subscription/queries";
import { Spinner } from "@/components/ui/spinner";
import { OptimizedImage } from "./optimized-image";

export default function SplashScreen() {
	const {
		getIdTokenClaims,
		isAuthenticated,
		isLoading: isAuthLoading,
	} = useAuth0();

	const {
		setIsOnboarded,
		setIsEmailVerified,
		isEmailVerified,
		isOnboarded,
		isSuccessDialogOpen,
	} = useOnboardingStore();
	const { setActivity } = useActivitySummaryStore();
	const { setInitialized, setIsAdmin, setProduct, initialized } = useAppStore();

	const [isInitializing, setIsInitializing] = useState(true);

	const {
		data: activity,
		isError: isActivityError,
		isLoading: isLoadingActivity,
	} = useGetActivitySummary();

	const {
		data: onboardingStatus,
		isError: isOnboardingError,
		isLoading: isLoadingOnboarding,
	} = useGetOnboarding();

	const { data: products, isLoading: isLoadingProducts } = useGetProducts();

	const initialize = useCallback(async () => {
		if (
			isLoadingActivity ||
			isLoadingOnboarding ||
			isLoadingProducts ||
			isAuthLoading
		)
			return;

		if (!isAuthenticated) {
			redirect("/login");
		}

		const idTokenClaims = await getIdTokenClaims();
		if (idTokenClaims) {
			const role = idTokenClaims?.[
				"https://app.nextdot.ai/roles"
			]?.[0] as string;
			if (role && role.toLowerCase() === "rattlehub-staff") {
				setIsAdmin(true);
			}
		}

		if (products) {
			const plan = products.find((product) => product.subscribed);
			setProduct(plan ?? null);
		}

		if (activity) {
			setActivity(activity);
		}

		if (onboardingStatus) {
			setInitialized(true);
			setIsInitializing(false);

			let verified = onboardingStatus.isEmailVerified;
			if (!verified && isEmailVerified) {
				verified = true;
			}

			let onboarded = onboardingStatus.isOnboarded;
			if (!onboarded && isOnboarded) {
				onboarded = true;
			}

			if (!initialized) {
				setIsOnboarded(onboardingStatus.isOnboarded);
				setIsEmailVerified(onboardingStatus.isEmailVerified);
			}

			const originHref = sessionStorage.getItem("origin_href");

			console.log({ verified }, { onboarded });

			if (!verified) redirect("/dashboard/verify");

			if (originHref && originHref !== window.location.href) {
				redirect(originHref);
			} else if (!isSuccessDialogOpen) {
				redirect(onboarded ? "/dashboard" : "/dashboard/onboarding");
			}
		}
	}, [
		isSuccessDialogOpen,
		initialized,
		isEmailVerified,
		isOnboarded,
		activity,
		onboardingStatus,
		setActivity,
		setIsOnboarded,
		setInitialized,
		getIdTokenClaims,
		setIsAdmin,
		products,
		setProduct,
		setIsEmailVerified,
		isLoadingActivity,
		isLoadingOnboarding,
		isLoadingProducts,
		isAuthLoading,
		isAuthenticated,
	]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	if (!isInitializing) return;
	// if (!isAuthenticated) redirect("/login");

	if (!isInitializing) {
		if (isActivityError || isOnboardingError)
			return <div className="p-4">Error initializing app</div>;
	}

	return (
		<div className="flex flex-col fixed z-200 top-0 left-0 right-0 bottom-0 h-full w-full items-center justify-center bg-[#111827]">
			<div className="relative flex items-center justify-center h-24 w-24">
				<OptimizedImage
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
