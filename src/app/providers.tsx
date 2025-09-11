"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { AnalyticsProvider } from "@/lib/analytics-provider";

const AuthProvider = dynamic(() => import("@/lib/auth-provider"), {
	ssr: false,
});

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30 * 1000, // Consider data fresh for 30 seconds
			retry: 1, // Retry failed requests once
			refetchOnWindowFocus: false, // Disable automatic refetch on window focus
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
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<AuthProvider>
				<AnalyticsProvider>
					<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
				</AnalyticsProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
