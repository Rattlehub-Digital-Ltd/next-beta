import type { PropsWithChildren } from "react";
import Pagination from "@/features/onboarding/pagination";

export default function OnboardingLayout({ children }: PropsWithChildren) {
	return (
		<div className="h-full flex flex-col space-y-3">
			<main className="container flex flex-col grow mx-auto">{children}</main>
			<Pagination />
		</div>
	);
}
