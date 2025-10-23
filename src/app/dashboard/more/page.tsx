import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import OnboardingData from "@/features/dashboard/more/onboardingData";
import ResetButton from "@/features/dashboard/more/reset-button";
import ProfileHeader from "@/features/onboarding/summary/profile-header";
import Header from "@/features/shared/header";
import analytics from "@/lib/analytics";

// const container = {
// 	hidden: { opacity: 0 },
// 	show: {
// 		opacity: 1,
// 		transition: {
// 			staggerChildren: 0.3, // Adjust the delay as needed
// 			delayChildren: 0.1,
// 		},
// 	},
// };

// const item = {
// 	hidden: { opacity: 0, y: 20, scale: 0.8 },
// 	show: { opacity: 1, y: 0, scale: 1 },
// };

const title = "Updates and features";
const description = "Keep up to date with the latest features and updates.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		url: `${appConfig.baseURL}/dashboard/more`,
		siteName: title,
	},
};

export default function MorePage() {
	analytics.page({ title: "More Page" });

	return (
		<div className="space-y-8 pb-20">
			<Header title={title} description={description} />
			<div className="space-y-6">
				<ProfileHeader />

				{/* <div className="py-2 flex flex-col gap-4">
					<h1 className="text-[10px] uppercase mb-3 ml-1 font-medium">
						people
					</h1>

					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
						className="flex items-center h-16 gap-2 py-2"
					>
						<motion.div variants={item}>
							<AddPeople
								label="Partner"
								icon="fluent:person-heart-32-filled"
								type="partner"
								iconClass="bg-[#197278] ring-[#197278]/15"
							/>
						</motion.div>
						<motion.div variants={item}>
							<AddPeople
								label="Child"
								icon="fluent:person-star-32-filled"
								type="child"
								iconClass="bg-[#FECB01] ring-[#FECB01]/15"
							/>
						</motion.div>
						<motion.div variants={item}>
							<AddPeople
								label="Dependent"
								icon="fluent:people-community-48-filled"
								type="dependent"
								iconClass="bg-[#5856D6] ring-[#5856D6]/15"
							/>
						</motion.div>
					</motion.div>
				</div> */}
			</div>
			<div>
				<OnboardingData />
			</div>
			{/* <div>
				<Changelog />
			</div> */}
			<div className="px-4 space-y-4 pt-8">
				<ResetButton />
				<p className="text-[11px] font-medium text-neutral-500">
					{appConfig.name} © {new Date().getFullYear()}{" "}
					{` v${appConfig.version}`}
				</p>
			</div>
		</div>
	);
}
