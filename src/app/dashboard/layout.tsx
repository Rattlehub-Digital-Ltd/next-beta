"use client";

import { redirect, usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useOnboardingStore } from "store/use-onboarding-store";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";
import useUTMPersistence from "@/hooks/use-utm-persistence";

export default function DashboardLayout({ children }: PropsWithChildren) {
	const pathname = usePathname();
	useUTMPersistence(window.location.search);
	const { isEmailVerified, isOnboarded } = useOnboardingStore();
	// const noRedirect = useRef(true);

	// if (!sessionStorage.getItem("origin_href") && noRedirect.current === true) {
	// 	sessionStorage.setItem("origin_href", window.location.href);
	// }

	// const originHref = sessionStorage.getItem("origin_href");

	if (!isEmailVerified) redirect("/dashboard/verify");
	else if (!isOnboarded) redirect("/dashboard/onboarding");
	else if (pathname !== "/dashboard") {
		sessionStorage.removeItem("origin_href");
		redirect(pathname);
	}

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
						// onChange={() => {
						// 	noRedirect.current = false;
						// }}
						/>
					</nav>
				</div>
			</ProtectedRoute>
			<LoadingScreen />
		</>
	);
}
