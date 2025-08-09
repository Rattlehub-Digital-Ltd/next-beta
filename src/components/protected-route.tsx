"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import {
	type PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useAppStore } from "store/use-app-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import Loading from "@/features/shared/loading";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated } = useAuth0();

	const { isOnboarded } = useOnboardingStore();
	const { activity } = useActivitySummaryStore();
	const { initialized } = useAppStore();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const checkInitialization = useCallback(async () => {
		if (!isAuthenticated) redirect("/login");
		if (initialized) return;

		setIsLoading(true);

		if (isOnboarded && activity) setError(true);

		setIsLoading(false);
	}, [initialized, isAuthenticated, isOnboarded, activity]);

	useEffect(() => {
		checkInitialization();
	}, [checkInitialization]);

	if (isLoading) return <Loading />;

	if (!isAuthenticated) redirect("/login");

	if (error) return <div className="p-4">Unauthorized: Access Forbidden!</div>;

	return <div className="h-full w-full">{children}</div>;
}
