"use client";

import { AlertTriangle, Home, RefreshCw, Server } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CustomErrorPageProps {
	statusCode: number;
	title?: string;
	message?: string;
	showRetry?: boolean;
}

const getErrorDetails = (statusCode: number) => {
	switch (statusCode) {
		case 400:
			return {
				title: "Bad Request",
				message:
					"The request could not be understood by the server. Please check your input and try again.",
				icon: AlertTriangle,
				color: "text-orange-500",
			};
		case 401:
			return {
				title: "Unauthorized",
				message:
					"You need to sign in to access this page. Please log in and try again.",
				icon: AlertTriangle,
				color: "text-yellow-500",
			};
		case 403:
			return {
				title: "Forbidden",
				message:
					"You don't have permission to access this resource. Contact support if you believe this is an error.",
				icon: AlertTriangle,
				color: "text-red-500",
			};
		case 404:
			return {
				title: "Page Not Found",
				message:
					"The page you're looking for doesn't exist. It may have been moved or deleted.",
				icon: AlertTriangle,
				color: "text-blue-500",
			};
		case 429:
			return {
				title: "Too Many Requests",
				message:
					"You've made too many requests. Please wait a moment before trying again.",
				icon: AlertTriangle,
				color: "text-purple-500",
			};
		case 500:
			return {
				title: "Server Error",
				message:
					"An internal server error occurred. Our team has been notified and is working on a fix.",
				icon: Server,
				color: "text-red-500",
			};
		case 502:
			return {
				title: "Bad Gateway",
				message:
					"The server received an invalid response. This is usually temporary, please try again.",
				icon: Server,
				color: "text-red-500",
			};
		case 503:
			return {
				title: "Service Unavailable",
				message:
					"The service is temporarily unavailable. We're working to restore it as quickly as possible.",
				icon: Server,
				color: "text-orange-500",
			};
		default:
			return {
				title: "Something went wrong",
				message:
					"An unexpected error occurred. Please try again or contact support if the problem persists.",
				icon: AlertTriangle,
				color: "text-gray-500",
			};
	}
};

export default function CustomErrorPage({
	statusCode,
	title,
	message,
	showRetry = true,
}: CustomErrorPageProps) {
	const errorDetails = getErrorDetails(statusCode);
	const Icon = errorDetails.icon;

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardContent className="pt-6">
					<div className="text-center space-y-6">
						{/* Error Code and Icon */}
						<div className="space-y-4">
							<div className="flex justify-center">
								<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
									<Icon className={`w-8 h-8 ${errorDetails.color}`} />
								</div>
							</div>
							<h1 className="text-4xl font-bold text-primary">{statusCode}</h1>
						</div>

						{/* Error Message */}
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold text-foreground">
								{title || errorDetails.title}
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{message || errorDetails.message}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 pt-4">
							{showRetry && (
								<Button
									onClick={() => window.location.reload()}
									className="flex-1 flex items-center justify-center gap-2"
								>
									<RefreshCw className="w-4 h-4" />
									Try Again
								</Button>
							)}
							<Button
								variant={showRetry ? "outline" : "default"}
								asChild
								className="flex-1"
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
