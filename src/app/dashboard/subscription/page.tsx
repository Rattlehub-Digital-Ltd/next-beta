"use client";

import Header from "@/features/shared/header";
import StripePricingTable from "@/features/stripe/stripe-pricing-table";

export default function Page() {
	return (
		<div className="bg-[#16243d] w-full h-full">
			<div className="fixed h-full w-full top-0 left-0 bg-[#16243d]" />
			<div className="relative z-2 space-y-8">
				<Header
					className="!text-white/95 text-center"
					title="Subscription"
					description="Get the full features of Nextdot"
				/>
				<StripePricingTable />
			</div>
		</div>
	);
}
