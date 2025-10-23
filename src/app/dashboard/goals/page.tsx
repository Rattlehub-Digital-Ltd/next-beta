"use client";

import GoalItems from "@/features/dashboard/goals/goal-items";
import Header from "@/features/shared/header";
import UsePageviewTracking from "@/hooks/use-pageview-tracking";

const title = "Goals";
const description =
	"Keep essential documents ready when life changes come your way.";

// export const metadata: Metadata = {
// 	title,
// 	description,
// 	openGraph: {
// 		title,
// 		description,
// 		url: `${appConfig.baseURL}/dashboard/goals`,
// 		siteName: title,
// 	},
// };

export default function GoalsPage() {
	UsePageviewTracking();

	return (
		<div className="pt-3 space-y-4 pb-12">
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

			<GoalItems />
		</div>
	);
}
