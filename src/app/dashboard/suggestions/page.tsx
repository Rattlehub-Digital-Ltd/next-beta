import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/config/app.config";
import SuggestedItems from "@/features/dashboard/suggestions/suggested-items";
import Header from "@/features/shared/header";

const title = "Suggestions";
const description = "Organize and store essential family-related documents.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		url: `${appConfig.baseURL}/dashboard/suggestions`,
		siteName: title,
	},
};

export default function SuggestionsPage() {
	return (
		<div className="pt-3 space-y-4 pb-8">
			<Header
				title={title}
				description={description}
				content={
					<Link
						href="/"
						className="flex items-center space-x-2 text-[#27A7BE] font-medium text-[13px] leading-4 no-underline py-2"
					>
						<Icon
							icon="fluent:gift-20-filled"
							className="shrink-0"
							height={18}
							width={18}
						/>
						<p className="font-semibold">Invite a friend and get 5% off</p>
						<Icon icon="fluent:chevron-right-16-filled" />
					</Link>
				}
			/>

			<SuggestedItems />
		</div>
	);
}
