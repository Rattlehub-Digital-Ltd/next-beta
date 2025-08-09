"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated } = useAuth0();

	if (!isAuthenticated) redirect("/login");

	return <div className="h-full w-full">{children}</div>;
}
