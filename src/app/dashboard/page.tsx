import { Icon } from "@iconify/react";

import * as motion from "motion/react-client";
import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/config/app.config";
import SummaryCard from "@/features/dashboard/summary-card";
import TabsCard from "@/features/dashboard/tabs-card";
import Header from "@/features/shared/header";
import { cardVariants } from "@/motion";

const title = "Welcome back!";
const description =
	"These will affect your estate, please read them carefully and take the necessary action.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		url: `${appConfig.baseURL}/dashboard`,
		siteName: title,
	},
};

function DashboardPage() {
	return (
		<div className="pt-3 space-y-4 pb-16">
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
			<motion.div
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ amount: 0.2 }}
			>
				<motion.div variants={cardVariants}>
					<SummaryCard />
				</motion.div>
			</motion.div>
			<TabsCard />
		</div>
	);
}

export default DashboardPage;
