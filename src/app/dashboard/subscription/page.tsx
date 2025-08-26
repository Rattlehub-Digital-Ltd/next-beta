"use client";

import { useGetProducts } from "@/api/services/dashboard/subscription/queries";
import Product from "@/features/dashboard/subscription/product";
// import type { Metadata } from "next";
// import { appConfig } from "@/config/app.config";
import Header from "@/features/shared/header";

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
	const { data } = useGetProducts();

	return (
		<div className="bg-[#16243d] w-full h-full pb-12">
			<div className="fixed h-full w-full top-0 left-0 bg-[#16243d]" />
			<div className="relative z-2 space-y-8">
				<Header
					className="!text-white/95 text-center"
					title={title}
					description={description}
				/>
				{data && (
					<ul className="space-y-4">
						{data.map((item) => (
							<li key={item.id}>
								<Product plan={item} isRecommended={true} currency="CA$" />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
