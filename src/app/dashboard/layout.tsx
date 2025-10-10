"use client";

import type { PropsWithChildren } from "react";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";
import useUTMPersistence from "@/hooks/use-utm-persistence";

export default function DashboardLayout({ children }: PropsWithChildren) {
	useUTMPersistence(window.location.search);
	if (!sessionStorage.getItem("origin_href")) {
		sessionStorage.setItem("origin_href", window.location.href);
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
						<BottomTabBar />
					</nav>
				</div>
			</ProtectedRoute>
			<LoadingScreen />
		</>
	);
}
