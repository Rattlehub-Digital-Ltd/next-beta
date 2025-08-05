import type { PropsWithChildren } from "react";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<>
			<ProtectedRoute>
				<div className="h-full w-full flex flex-col space-y-3">
					<Banner />
					<main className="container grow mx-auto pb-2 w-full">{children}</main>
					<nav className="fixed bottom-0 left-0 w-full z-30">
						<BottomTabBar />
					</nav>
				</div>
			</ProtectedRoute>
			<LoadingScreen />
		</>
	);
}
