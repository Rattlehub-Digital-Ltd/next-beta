"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionSuccessPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-2xl w-full space-y-8 text-center">
				{/* Success Icon and Animation */}
				<div className="relative">
					<div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
						<CheckCircle className="w-12 h-12 text-primary-foreground" />
					</div>
				</div>

				{/* Main Success Message */}
				<div className="space-y-4">
					<h1 className="text-xl font-bold text-foreground text-balance">
						Congratulations! 🎉
					</h1>
					<h2 className="text-sm font-semibold text-primary text-balance">
						Your subscription is confirmed!
					</h2>
					<p className="text-[13px] text-muted-foreground max-w-lg mx-auto text-pretty">
						Thank you for joining our community! We're excited to have you on
						board and can't wait to help you achieve your goals.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="sm"
						className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
						onClick={() => {
							window.location.href = "/dashboard";
						}}
					>
						Go to dashboard
						<ArrowRight className="ml-2 w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
