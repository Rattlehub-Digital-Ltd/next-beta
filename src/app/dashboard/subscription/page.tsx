"use client";

import Products from "@/features/dashboard/subscription/products";
import Header from "@/features/shared/header";
import UsePageviewTracking from "@/hooks/use-pageview-tracking";

const title = "Subscription";
const description = "Get the full features of Nextdot";

// export const metadata: Metadata = {
// 	title,
// 	description,
// 	openGraph: {
// 		title,
// 		description,
// 		url: `${appConfig.baseURL}/dashboard/subscription`,
// 		siteName: title,
// 	},
// };

export default function Page() {
	UsePageviewTracking();

	return (
		<div className="bg-[#16243d] w-full h-full pb-12">
			<div className="fixed h-full w-full top-0 left-0 bg-[#16243d]" />
			<div className="relative z-2 space-y-8">
				<Header
					className="!text-white/95 text-center"
					title={title}
					description={description}
				/>
				<Products />
			</div>
		</div>
	);
}
