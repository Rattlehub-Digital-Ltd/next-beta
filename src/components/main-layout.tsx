import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";
import Navbar from "@/features/shared/nav-bar/nav-bar";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<Providers
			themeProps={{
				attribute: "class",
				defaultTheme: "light",
				enableColorScheme: true,
				enableSystem: false,
			}}
		>
			<div className="h-full flex flex-col">
				<div className="p-3.5 sticky left-0 top-0 w-full z-20 shrink-0 mx-auto max-w-2xl">
					<nav className="py-3 h-14 backdrop-blur-[15px] bg-white/40 rounded-[23px]">
						<Navbar />
					</nav>
				</div>
				<main className="container max-w-xl grow mx-auto pb-4 px-4 z-10">
					{children}
				</main>
			</div>
		</Providers>
	);
}
