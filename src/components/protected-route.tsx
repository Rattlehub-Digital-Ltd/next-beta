"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useAppStore } from "store/use-app-store";
import { appConfig } from "@/config/app.config";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated } = useAuth0();

	const { isAdmin } = useAppStore();

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
