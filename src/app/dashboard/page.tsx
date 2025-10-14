"use client";

import * as motion from "motion/react-client";
import { RedirectType, redirect } from "next/navigation";
import { useOnboardingStore } from "store/use-onboarding-store";
import CampaignResponsePopup from "@/features/dashboard/campagaign-response/campaign-response-popup";
import SummaryCard from "@/features/dashboard/summary-card";
import TabsCard from "@/features/dashboard/tabs-card";
import Header from "@/features/shared/header";
import { cardVariants } from "@/motion";

const title = "Welcome back!";
const description =
	"These will affect your estate, please read them carefully and take the necessary action.";

function DashboardPage() {
	const { isEmailVerified, isOnboarded } = useOnboardingStore();

	const originHref = sessionStorage.getItem("origin_href");

	if (!isEmailVerified) redirect("/dashboard/verify", RedirectType.replace);
	else if (!isOnboarded)
		redirect("/dashboard/onboarding", RedirectType.replace);
	else if (originHref) {
		sessionStorage.removeItem("origin_href");
		redirect(originHref, RedirectType.replace);
	}

	return (
		<div className="pt-3 space-y-4 pb-16">
			<Header
				title={title}
				description={description}
				// content={
				// 	<Link
				// 		href="/"
				// 		className="flex items-center space-x-2 text-[#27A7BE] font-medium text-[13px] leading-4 no-underline py-2"
				// 	>
				// 		<Icon
				// 			icon="fluent:gift-20-filled"
				// 			className="shrink-0"
				// 			height={18}
				// 			width={18}
				// 		/>
				// 		<p className="font-semibold">Invite a friend and get 5% off</p>
				// 		<Icon icon="fluent:chevron-right-16-filled" />
				// 	</Link>
				// }
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
			<CampaignResponsePopup utm={window.location.search} />
		</div>
	);
}

export default DashboardPage;
