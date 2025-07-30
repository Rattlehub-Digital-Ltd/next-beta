import type { PropsWithChildren } from "react";
import Banner from "@/features/dashboard/banner";
import BottomTabBar from "@/features/shared/bottom-tab-bar";

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<div className="h-full w-full flex flex-col space-y-3">
			<Banner />
			<main className="container grow mx-auto pb-16 w-full">{children}</main>
			<nav className="fixed bottom-0 left-0 w-full">
				<BottomTabBar />
			</nav>
		</div>
	);
}
