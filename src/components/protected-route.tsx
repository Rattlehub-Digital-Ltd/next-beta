"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect, usePathname } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import { useAppStore } from "store/use-app-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
// import { useOnboardingStore } from "store/use-onboarding-store";
// import { useAppStore } from "store/use-app-store";
// import { appConfig } from "@/config/app.config";
import Loading from "@/features/shared/loading";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const pathname = usePathname();
	const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
	const { data: onboardingStatus, isLoading: isLoadingOnboarding } =
		useGetOnboarding();

	const { isAdmin } = useAppStore();

	useEffect(() => {
		if (isAuthLoading || (isLoadingOnboarding && !onboardingStatus)) return;

		if (!isAuthenticated) redirect("/login");

		if (!onboardingStatus?.isEmailVerified && pathname !== "/dashboard/verify")
			redirect("/dashboard/verify");

		if (
			!onboardingStatus?.isOnboarded &&
			pathname !== "/dashboard/onboarding"
		) {
			redirect("/dashboard/onboarding");
		}

		const originHref = sessionStorage.getItem("origin_href");

		if (originHref && pathname !== originHref) {
			sessionStorage.removeItem("origin_href");
			redirect(originHref);
		}
	}, [
		isAuthenticated,
		onboardingStatus,
		isAuthLoading,
		isLoadingOnboarding,
		pathname,
	]);

	if (!isAdmin && isAuthenticated && !isAuthLoading)
		return (
			<div className="p-4">
				<h1 className="text-base font-semibold">Access Denied</h1>
				<p className="text-sm text-muted-foreground">
					Only rattle hub staff are allowed past this point
				</p>
				<p className="text-[13px] text-muted-foreground mt-2">
					<a
						href="info@rattlehub.com"
						target="_blank"
						rel="noopener noreferrer"
						className=" font-semibold text-blue-600"
					>
						Contact us
					</a>{" "}
					<span>if you believe this is an error.</span>
				</p>
			</div>
		);

	if (isAuthLoading || isLoadingOnboarding) <Loading />;

	return <div className="h-full w-full">{children}</div>;
}
