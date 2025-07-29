"use client";

import { useAuth0 } from "@auth0/auth0-react";
import * as motion from "motion/react-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FluentArrowCircleRight24Filled, SparkleIcon } from "@/styles/icons";

const LoginButton = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const {
		isLoading,
		loginWithRedirect,
		// user,
		isAuthenticated,
		getAccessTokenSilently,
	} = useAuth0();

	const [processing, setProcessing] = useState(false);

	const redirectUrl =
		searchParams.get("iss") ?? searchParams.get("redirectUrl") ?? "/snapshot";

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
				// toast("An error occurred during sign-in.");
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
						// await loadData();
						router.replace(redirectUrl);
					}
				})
				.catch((error) => console.log("Error getting access token:", error))
				.finally(() => setProcessing(false));
		}
	}, [getAccessTokenSilently, isAuthenticated, isLoading, redirectUrl, router]);

	// const loadData = useCallback(async () => {
	// 	if (user && isAuthenticated) {
	// 		const res = await getOnboardingStatus();
	// 		const onboarded = !!res?.isOnboarded;

	// 		if (onboarded) {
	// 			try {
	// 				const res = await fetchActivity();
	// 				if (res) {
	// 					const obj = res as ActivityProps;
	// 					if (obj) {
	// 						setActionsCount(obj.pending);
	// 						setSuggestionsCount(obj.suggested);
	// 					}
	// 				}
	// 			} catch (e) {
	// 				console.debug(e);
	// 			}
	// 		}

	// 		setIsOnboarded(onboarded);
	// 	}
	// }, [
	// 	fetchActivity,
	// 	getOnboardingStatus,
	// 	isAuthenticated,
	// 	setActionsCount,
	// 	setIsOnboarded,
	// 	setSuggestionsCount,
	// 	user,
	// ]);

	useEffect(() => {
		autoSignIn();
	}, [autoSignIn]);

	return (
		<motion.div
			className="w-full"
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, translateY: -60 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ duration: 0.35 }}
		>
			<Button
				className="font-semibold rounded-2xl h-11 w-full !pr-3 shadow-md shadow-blue-500/40 bg-blue-600 disabled:bg-blue-400"
				variant="default"
				type="button"
				size="lg"
				onClick={authenticate}
			>
				<SparkleIcon className="!h-4.5 !w-4.5 text-white mr-2" />
				<span className="grow text-center text-sm truncate">
					{isLoading || processing ? "Please wait..." : "Continue with Nextdot"}
				</span>
				<FluentArrowCircleRight24Filled className="!h-6 !w-6 text-white" />
			</Button>
		</motion.div>
	);
};

export default LoginButton;
