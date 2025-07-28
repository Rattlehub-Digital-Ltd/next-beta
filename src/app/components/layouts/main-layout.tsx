import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";
import Navbar from "@/features/nav-bar/nav-bar";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<Providers>
			<div className="min-h-screen flex flex-col">
				<div className="absolute h-full w-full top-0 left-0 bg-main-background/90">
					<div className="h-full w-full bg-main-secondary-background/95 backdrop-blur-2xl" />
				</div>
				<nav className="sticky  top-0 w-full h-24 py-6">
					<Navbar />
				</nav>
				<main className="container flex flex-col grow mx-auto px-4 pb-8 pt-4 z-10">
					{children}
				</main>
			</div>
		</Providers>
	);
}
