import { Icon } from "@iconify/react";
import Link from "next/link";
import ShortUniqueId from "short-unique-id";
import GoalItem from "@/features/dashboard/goals/goal-item";
import Header from "@/features/shared/header";

const uid = new ShortUniqueId({ length: 10 });

export default function GoalsPage() {
	return (
		<div>
			<Header
				title="Goals"
				description="Keep essential documents ready when life changes come your way."
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
			<div className="flex flex-col space-y-4">
				{data.map((item) => (
					<GoalItem key={uid.randomUUID()} item={item} />
				))}
			</div>
		</div>
	);
}

const data = [
	{
		name: "Estate Plan",
		displayName: "Estate Plan",
		eduText:
			"Keep track of all the required documents for this life event, for you and your family",
		ranking: 150.5274,
		percentageCompletion: 9.0,
	},
	{
		name: "Family",
		displayName: "Family",
		eduText:
			"Keep track of all the required documents for this life event, for you and your family",
		ranking: 70.30770000000001,
		percentageCompletion: 30.0,
	},
	{
		name: "Life Insurance Claim",
		displayName: "Life Insurance Claim",
		eduText:
			"Keep track of all the required documents for this life event, for you and your family",
		ranking: 33.6783,
		percentageCompletion: 0.0,
	},
	{
		name: "Estate Liquidity",
		displayName: "Estate Liquidity",
		eduText:
			"Keep track of all the required documents for this life event, for you and your family",
		ranking: 28.8609,
		percentageCompletion: 0.0,
	},
];
