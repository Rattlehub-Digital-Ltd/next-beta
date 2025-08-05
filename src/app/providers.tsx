"use client";

import dynamic from "next/dynamic";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

const AuthProvider = dynamic(() => import("@/lib/auth-provider"), {
	ssr: false,
});

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<AuthProvider>
			<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
		</AuthProvider>
	);
}
