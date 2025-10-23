import Image from "next/image";
import Link from "next/link";
import analytics from "@/lib/analytics";

export default function SubscriptionCancelPage() {
	analytics.page();
	return (
		<div className="flex flex-col items-center justify-center h-full pt-8 space-y-2 px-6">
			<Image
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
