"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useAppStore } from "store/use-app-store";
// import { useAppStore } from "store/use-app-store";
// import { appConfig } from "@/config/app.config";
import Loading from "@/features/shared/loading";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();

	const { isAdmin } = useAppStore();

	if (!isAdmin)
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

	if (isAuthLoading) <Loading />;

	if (!isAuthenticated) redirect("/login");

	return <div className="h-full w-full">{children}</div>;
}
