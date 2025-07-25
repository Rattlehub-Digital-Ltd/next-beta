"use client";

import React from "react";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	public state: ErrorBoundaryState = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		if (process.env.NODE_ENV !== "production") {
			// eslint-disable-next-line no-console
			console.error("Uncaught error:", error, errorInfo);
		}
		// TODO: send to monitoring service (e.g., Sentry, Datadog)
	}

	public render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
