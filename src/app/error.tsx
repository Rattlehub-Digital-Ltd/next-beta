"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardContent className="pt-6">
					<div className="text-center space-y-6">
						{/* Error Icon */}
						<div className="flex justify-center">
							<div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
								<AlertTriangle className="w-8 h-8 text-destructive" />
							</div>
						</div>

						{/* Error Message */}
						<div className="space-y-2">
							<h1 className="text-2xl font-semibold text-foreground">
								Something went wrong
							</h1>
							<p className="text-muted-foreground leading-relaxed">
								We encountered an unexpected error. This has been logged and our
								team will look into it. Please try again.
							</p>
						</div>

						{/* Error Details (Development) */}
						{process.env.NODE_ENV === "development" && (
							<div className="text-left bg-muted p-3 rounded-md">
								<p className="text-xs font-mono text-muted-foreground break-all">
									{error.message}
								</p>
								{error.digest && (
									<p className="text-xs font-mono text-muted-foreground mt-1">
										Error ID: {error.digest}
									</p>
								)}
							</div>
						)}

						{/* Action Buttons */}
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
