"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

const AuthProvider = dynamic(() => import("@/lib/auth-provider"), {
	ssr: false,
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1, // Retry failed requests once
			refetchOnWindowFocus: false, // Disable automatic refetch on window focus
			staleTime: 30000, // Consider data fresh for 30 seconds
		},
	},
});

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<AuthProvider>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
