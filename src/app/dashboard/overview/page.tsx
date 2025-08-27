import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/config/app.config";
import DocumentLocations from "@/features/dashboard/overview/cards/document-locations";
import EstatePlan from "@/features/dashboard/overview/cards/estate-plan";
import Family from "@/features/dashboard/overview/cards/family";
import LifeFileDocuments from "@/features/dashboard/overview/cards/life-file-documents";
import Header from "@/features/shared/header";
import { cardVariants } from "@/motion";

const title = "Overview";
const description =
	"The Overview section provides a quick view of progress, showing completed items, and highlighting risks like missing items or incomplete sections.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		url: `${appConfig.baseURL}/dashboard/overview`,
		siteName: title,
	},
};

export default function OverviewPage() {
	return (
		<div className="pt-3 space-y-4 pb-12">
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
						<p>Invite a friend and get 5% off</p>
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
					<Family />
				</motion.div>
			</motion.div>
			<motion.div
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ amount: 0.2 }}
			>
				<motion.div variants={cardVariants}>
					<DocumentLocations />
				</motion.div>
			</motion.div>
			<motion.div
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ amount: 0.2 }}
			>
				<motion.div variants={cardVariants}>
					<EstatePlan />
				</motion.div>
			</motion.div>
			<motion.div
				initial="offscreen"
				whileInView="onscreen"
				viewport={{ amount: 0.2 }}
			>
				<motion.div variants={cardVariants}>
					<LifeFileDocuments />
				</motion.div>
			</motion.div>
		</div>
	);
}
