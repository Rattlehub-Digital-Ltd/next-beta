"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { RedirectType, redirect } from "next/navigation";
import useUTMPersistence from "@/hooks/use-utm-persistence";

export default function Home() {
	useUTMPersistence(window.location.search);
	const { isAuthenticated, isLoading } = useAuth0();

	if (!isAuthenticated && !isLoading) {
		redirect("/login", RedirectType.replace);
	} else {
		redirect("/dashboard", RedirectType.replace);
	}
}
