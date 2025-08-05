import type { PropsWithChildren } from "react";
import ProtectedRoute from "@/components/protected-route";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab/bottom-tab-bar";
import LoadingScreen from "@/features/shared/splash-screen";

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<>
			<ProtectedRoute>
				<div className="h-full flex flex-col space-y-4 pb-8">
					<div className="shrink-0">
						<Banner />
					</div>
					<main className="grow overflow-hidden">{children}</main>
					<nav className="fixed bottom-0 left-0 w-full z-30">
						<BottomTabBar />
					</nav>
				</div>
			</ProtectedRoute>
			<LoadingScreen />
		</>
	);
}
