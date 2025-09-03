import { ArrowRight, CheckCircle, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SubscriptionSuccessPage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="max-w-2xl w-full space-y-8 text-center">
				{/* Success Icon and Animation */}
				<div className="relative">
					<div className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center">
						<CheckCircle className="w-12 h-12 text-primary-foreground" />
					</div>
					{/* Confetti-like decoration */}
					<div className="absolute -top-4 -left-4 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
					<div className="absolute -top-2 -right-6 w-2 h-2 bg-secondary rounded-full animate-pulse delay-150"></div>
					<div className="absolute -bottom-2 -left-8 w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
					<div className="absolute -bottom-4 -right-4 w-3 h-3 bg-accent rounded-full animate-pulse delay-75"></div>
				</div>

				{/* Main Success Message */}
				<div className="space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
						Congratulations! 🎉
					</h1>
					<h2 className="text-2xl md:text-3xl font-semibold text-primary text-balance">
						Your subscription is confirmed!
					</h2>
					<p className="text-lg text-muted-foreground max-w-lg mx-auto text-pretty">
						Thank you for joining our community! We're excited to have you on
						board and can't wait to help you achieve your goals.
					</p>
				</div>

				{/* Next Steps Section */}
				<Card className="bg-card border-border">
					<CardContent className="p-8">
						<h3 className="text-xl font-semibold text-foreground mb-6">
							What happens next?
						</h3>
						<div className="grid gap-6 md:grid-cols-3">
							<div className="flex flex-col items-center text-center space-y-3">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
									<Mail className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-medium text-foreground">
										Check Your Email
									</h4>
									<p className="text-sm text-muted-foreground text-pretty">
										We've sent you a confirmation email with all the details
									</p>
								</div>
							</div>

							<div className="flex flex-col items-center text-center space-y-3">
								<div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
									<ArrowRight className="w-6 h-6 text-accent" />
								</div>
								<div>
									<h4 className="font-medium text-foreground">
										Explore Features
									</h4>
									<p className="text-sm text-muted-foreground text-pretty">
										Discover all the amazing features available in your plan
									</p>
								</div>
							</div>

							<div className="flex flex-col items-center text-center space-y-3">
								<div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
									<Users className="w-6 h-6 text-secondary" />
								</div>
								<div>
									<h4 className="font-medium text-foreground">
										Join Community
									</h4>
									<p className="text-sm text-muted-foreground text-pretty">
										Connect with other members for tips and support
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Call-to-Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="lg"
						className="bg-primary hover:bg-primary/90 text-primary-foreground"
					>
						Explore Your Account
						<ArrowRight className="ml-2 w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
					>
						Visit Our Community
						<Users className="ml-2 w-4 h-4" />
					</Button>
				</div>

				{/* Support Message */}
				<div className="pt-8 border-t border-border">
					<p className="text-sm text-muted-foreground">
						Need help getting started?{" "}
						<a href="/" className="text-primary hover:underline font-medium">
							Contact our support team
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
