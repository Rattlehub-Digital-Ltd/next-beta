"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			const reset = () => {
				this.setState({ hasError: false, error: undefined });
			};

			if (this.props.fallback) {
				const FallbackComponent = this.props.fallback;
				// biome-ignore lint/style/noNonNullAssertion: later
				return <FallbackComponent error={this.state.error!} reset={reset} />;
			}

			return (
				<div className="min-h-screen bg-background flex items-center justify-center p-4">
					<Card className="w-full max-w-md">
						<CardContent className="pt-6">
							<div className="text-center space-y-6">
								<div className="flex justify-center">
									<div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
										<AlertTriangle className="w-8 h-8 text-destructive" />
									</div>
								</div>

								<div className="space-y-2">
									<h1 className="text-2xl font-semibold text-foreground">
										Component Error
									</h1>
									<p className="text-muted-foreground leading-relaxed">
										A component failed to render properly. This error has been
										logged.
									</p>
								</div>

								<div className="flex flex-col sm:flex-row gap-3 pt-4">
									<Button
										onClick={reset}
										className="flex-1 flex items-center justify-center gap-2"
									>
										<RefreshCw className="w-4 h-4" />
										Try Again
									</Button>
									<Button
										variant="outline"
										asChild
										className="flex-1 bg-transparent"
									>
										<Link
											href="/"
											className="flex items-center justify-center gap-2"
										>
											<Home className="w-4 h-4" />
											Go Home
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			);
		}

		return this.props.children;
	}
}
