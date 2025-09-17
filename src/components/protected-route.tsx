"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import { useAppStore } from "store/use-app-store";
import { appConfig } from "@/config/app.config";
import { useAnalytics } from "@/hooks/use-analytics";

const key = "https://app.nextdot.ai/userid";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated, user } = useAuth0();

	const { isAdmin } = useAppStore();
	const { identify } = useAnalytics();

	useEffect(() => {
		if (process.env.NODE_ENV === "development" || !user) return;

		if (typeof window !== "undefined" && sessionStorage?.getItem(key)) {
			return;
		}

		const userId = user[key];
		if (userId) {
			identify(userId);
			sessionStorage.setItem(key, userId);
		}
	}, [user, identify]);

	if (appConfig.previewMode && !isAdmin)
		return (
			<div className="p-4">
				<h1 className="text-sm font-semibold">Access Denied</h1>
				<p className="text-xs text-muted-foreground">
					You do not have access to this page.
				</p>
			</div>
		);

	if (!isAuthenticated) redirect("/login");

	return <div className="h-full w-full">{children}</div>;
}
