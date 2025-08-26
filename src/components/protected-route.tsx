"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import { appConfig } from "@/config/app.config";
import { useAnalytics } from "@/hooks/use-analytics";

const key = "https://app.nextdot.ai/userid";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated, user } = useAuth0();
	const { identify } = useAnalytics();

	useEffect(() => {
		if (
			appConfig.previewMode ||
			process.env.NODE_ENV === "development" ||
			!user
		)
			return;

		if (typeof window !== "undefined" && sessionStorage?.getItem(key)) {
			return;
		}

		const userId = user[key];
		if (userId) {
			identify(userId);
			sessionStorage.setItem(key, userId);
		}
	}, [user, identify]);

	if (!isAuthenticated) redirect("/login");

	return <div className="h-full w-full">{children}</div>;
}
