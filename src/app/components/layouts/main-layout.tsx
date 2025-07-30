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
			<div className="h-full flex flex-col overflow-y-auto theme">
				<div className="p-4">
					<nav className="sticky left-0 top-0 w-full py-3 z-20 backdrop-blur-[15px] bg-white/65 rounded-[23px]">
						<Navbar />
					</nav>
				</div>
				<main className="container relative flex flex-col grow mx-auto px-4 pb-4 pt-4 z-10">
					{children}
				</main>
			</div>
		</Providers>
	);
}
