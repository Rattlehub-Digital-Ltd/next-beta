import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";
import Navbar from "@/features/nav-bar/nav-bar";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
			<div className="h-full flex flex-col overflow-y-auto">
				<nav className="top-0 w-full h-24 py-6">
					<Navbar />
				</nav>
				<main className="container flex flex-col grow mx-auto px-4 pb-8 pt-4 z-10">
					{children}
				</main>
			</div>
		</Providers>
	);
}
