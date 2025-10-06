"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground">
				<div className="min-h-screen flex items-center justify-center p-4">
					<Card className="w-full max-w-md">
						<CardContent className="pt-6">
							<div className="text-center space-y-6">
								{/* Error Icon */}
								<div className="flex justify-center">
									<div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
										<AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
									</div>
								</div>

								{/* Error Message */}
								<div className="space-y-2">
									<h1 className="text-2xl font-semibold">Application Error</h1>
									<div className="text-gray-600 dark:text-gray-400 leading-relaxed">
										{error && (
											<span className="text-red-500 font-medium">
												{error.cause ? (
													<span>{`Cause: ${error.cause}`}</span>
												) : undefined}
												{error.digest && (
													<span>{`Digest: ${error.digest}`}</span>
												)}
												{error.name && <span>{`Message: ${error.name}`}</span>}
												{error && <span>{`Stack: ${error.stack}`}</span>}
											</span>
										)}
										{!error &&
											"A critical error occurred that prevented the application from loading. Please refresh the page or contact support if the problem persists."}
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row gap-3 pt-4">
									<Button
										onClick={reset}
										className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white"
									>
										<RefreshCw className="w-4 h-4" />
										Reload Page
									</Button>
									<Button
										variant="outline"
										asChild
										className="flex-1 border-gray-300 dark:border-gray-600 bg-transparent"
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
			</body>
		</html>
	);
}
