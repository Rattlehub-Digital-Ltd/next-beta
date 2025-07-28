import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";
import Navbar from "@/features/nav-bar/nav-bar";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<Providers>
			<div className="min-h-screen flex flex-col bg-main-secondary-background/97">
				<nav className="w-full h-24 py-6">
					<Navbar />
				</nav>
				<main className="container flex flex-col grow mx-auto px-4 pb-8 pt-4">
					{children}
				</main>
			</div>
		</Providers>
	);
}
