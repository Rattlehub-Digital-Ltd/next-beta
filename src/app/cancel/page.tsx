import Link from "next/link";
import { OptimizedImage } from "@/features/shared/optimized-image";

export default function SubscriptionCancelPage() {
	return (
		<div className="flex flex-col items-center justify-center h-full pt-8 space-y-2 px-6">
			<OptimizedImage
				src="/images/Silk road-rafiki.svg"
				alt=""
				height={256}
				width={256}
			/>
			<h1 className="text-lg font-semibold text-pretty text-center">
				You have decided to cancel the subscription plan.
			</h1>
			<Link
				href="/dashboard"
				className="text-[13px] text-pretty text-blue-600 font-semibold underline underline-offset-2"
			>
				Return to Dashboard
			</Link>
		</div>
	);
}
