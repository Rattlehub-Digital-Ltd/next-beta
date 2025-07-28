import type { PropsWithChildren } from "react";
import Navbar from "@/features/nav-bar/nav-bar";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen flex flex-col bg-main-secondary-background">
			<nav className="w-full h-12 py-12">
				<Navbar />
			</nav>
			<main className="container flex flex-col grow mx-auto px-4 pb-8 pt-4">
				{children}
			</main>
		</div>
	);
}
