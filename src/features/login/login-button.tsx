"use client";

import { useAuth0 } from "@auth0/auth0-react";
import * as motion from "motion/react-client";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { toast } from "sonner";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useAppStore } from "store/use-app-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import { useGetActivitySummary } from "@/api/services/dashboard/queries";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Loading from "@/features/shared/loading";
// import useApi from "@/hooks/use-api";
import { FluentArrowCircleRight24Filled, SparkleIcon } from "@/styles/icons";

const LoginButton = () => {
	const searchParams = useSearchParams();

	// const { getOnboardingStatus, getActivitySummary } = useApi();
	const { data: activitySummary } = useGetActivitySummary();
	const { data: onboardingStatus } = useGetOnboarding();

	const { setIsOnboarded } = useOnboardingStore();
	const { setActivity } = useActivitySummaryStore();
	const { initialized, setInitialized } = useAppStore();

	const {
		isLoading,
		loginWithRedirect,
		user,
		isAuthenticated,
		getAccessTokenSilently,
	} = useAuth0();

	const [processing, setProcessing] = useState(false);

	const redirectUrl =
		searchParams.get("iss") ?? searchParams.get("redirectUrl") ?? "/dashboard";

	const loadData = useCallback(async () => {
		if (user && isAuthenticated) {
			if (initialized) return;

			setProcessing(true);

			if (isAuthenticated) {
				if (!initialized) {
					const onboardingStatusResp = onboardingStatus; //await getOnboardingStatus();

					if (onboardingStatusResp) {
						const isOnboarded = onboardingStatusResp.isOnboarded;
						setIsOnboarded(isOnboarded);

						const activitySummaryResp = activitySummary; //await getActivitySummary();
						if (activitySummaryResp) {
							setActivity(activitySummaryResp);
							setInitialized(true);
						}

						if (isOnboarded)
							redirect(window.location.origin !== "/" ? "/" : "/dashboard");
						else redirect("/dashboard/onboarding");
					} else {
						setInitialized(false);
					}
				}

				setProcessing(false);
				redirect(window.location.origin);
			} else {
				setInitialized(false);
				setProcessing(false);
			}
		}
	}, [
		setActivity,
		// getActivitySummary,
		// getOnboardingStatus,
		activitySummary,
		onboardingStatus,
		initialized,
		isAuthenticated,
		setInitialized,
		setIsOnboarded,
		user,
	]);

	const authenticate = useCallback(async () => {
		if (!isAuthenticated && !isLoading) {
			setProcessing(true);

			try {
				await loginWithRedirect({
					authorizationParams: {
						audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
					},
					appState: {
						returnTo: redirectUrl,
					},
				})
					.then(console.log)
					.finally(() => {
						setProcessing(false);
					});
			} catch (error) {
				console.error("Authentication error:", error);
				toast("An error occurred during sign-in.");
				setProcessing(false);
			}
		}
	}, [isAuthenticated, isLoading, loginWithRedirect, redirectUrl]);

	const autoSignIn = useCallback(async () => {
		if (isAuthenticated && !isLoading) {
			setProcessing(true);

			await getAccessTokenSilently({
				authorizationParams: {
					audience: process.env.NEXT_PUBLIC_AUDIENCE as string,
				},
			})
				.then(async (token) => {
					if (token && token !== "") {
						await loadData();

						redirect(redirectUrl, RedirectType.replace);
					}
				})
				.catch((error) => console.log("Error getting access token:", error))
				.finally(() => {
					setProcessing(false);
				});
		}
	}, [
		getAccessTokenSilently,
		isAuthenticated,
		isLoading,
		redirectUrl,
		loadData,
	]);

	useEffect(() => {
		autoSignIn();
	}, [autoSignIn]);

	if (isLoading || processing) return <Loading />;

	if (isAuthenticated) {
		redirect(redirectUrl, RedirectType.replace);
		return null;
	}

	return (
		<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
			<Button
				className="font-semibold rounded-2xl h-11 w-full !pr-3 shadow-md shadow-blue-500/40 disabled:opacity-85 bg-blue-600 disabled:bg-blue-500"
				variant="default"
				disabled={processing}
				type="button"
				size="lg"
				onClick={authenticate}
			>
				<SparkleIcon className="!h-4.5 !w-4.5 text-white mr-2" />
				<span className="grow text-center text-sm truncate">
					{processing ? "Please wait..." : "Continue with Nextdot"}
				</span>
				{!processing && (
					<FluentArrowCircleRight24Filled className="!h-6 !w-6 text-white" />
				)}
				{processing && <Spinner size="lg" variant="dark" />}
			</Button>
		</motion.div>
	);
};

export default LoginButton;
