"use client";

import { type PropsWithChildren, useEffect } from "react";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";

export default function DashboardLayout({ children }: PropsWithChildren) {
	console.log("dashboard layout rendered", window.location.href);
	if (!sessionStorage.getItem("origin_href")) {
		sessionStorage.setItem("origin_href", window.location.href);
	}

	useEffect(() => {
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const keys = [
				"utm_source",
				"utm_medium",
				"utm_campaign",
				"utm_term",
				"utm_content",
			];
			keys.forEach((key) => {
				const value = urlParams.get(key);
				if (value) {
					sessionStorage.setItem(key, value);
				}
			});

			console.log("keys", keys);
		} catch (error) {
			console.log(error);
		}
	}, []);

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
