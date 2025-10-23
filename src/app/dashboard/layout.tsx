"use client";

import { type PropsWithChildren, useRef } from "react";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";

export default function DashboardLayout({ children }: PropsWithChildren) {
	const noRedirect = useRef(true);

	// const originHref = sessionStorage.getItem("origin_href");

	// if (!originHref && originHref !== "/") {
	// 	sessionStorage.setItem("origin_href", window.location.href);
	// } else if (originHref) {
	// 	sessionStorage.removeItem("origin_href");
	// }

	return (
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
				<LoadingScreen />
			</div>
		</ProtectedRoute>
	);
}
