"use client";

import { type PropsWithChildren, useRef } from "react";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";
import useUTMPersistence from "@/hooks/use-utm-persistence";
// import { useOnboardingStore } from "store/use-onboarding-store";
// import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: PropsWithChildren) {
	// const { isEmailVerified, isOnboarded } = useOnboardingStore();
	useUTMPersistence(window.location.search);
	const noRedirect = useRef(true);

	const originHref = sessionStorage.getItem("origin_href");

	if (!originHref && noRedirect.current === true && originHref !== "/") {
		// const originHref = sessionStorage.getItem("origin_href");
		sessionStorage.setItem("origin_href", window.location.href);
		// sessionStorage.removeItem("origin_href");
		// if (originHref) redirect(originHref);
	} else if (originHref) {
		sessionStorage.removeItem("origin_href");
	}

	// useEffect(() => {
	// 	const originHref = sessionStorage.getItem("origin_href");
	// 	console.log("DashboardLayout useEffect triggered", originHref);

	// 	if (!isEmailVerified) redirect("/dashboard/verify");
	// 	if (!isOnboarded) redirect("/dashboard/onboarding");
	// 	else if (originHref && originHref !== null) {
	// 		console.log("Redirecting to originHref:", originHref);
	// 		// sessionStorage.removeItem("origin_href");
	// 		// redirect(originHref);
	// 	}
	// }, [isEmailVerified, isOnboarded]);

	return (
		<>
			<ProtectedRoute>
				<div className="flex flex-col space-y-4 pb-8">
					<div className="shrink-0">
						<Banner />
					</div>
					<main className="grow">{children}</main>
					<nav className="fixed bottom-0 left-0 w-full z-30">
						<BottomTabBar
							onChange={() => {
								noRedirect.current = false;
							}}
						/>
					</nav>
				</div>
			</ProtectedRoute>
			<LoadingScreen />
		</>
	);
}
