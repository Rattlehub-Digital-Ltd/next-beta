"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useGetSuggestions } from "@/api/services/dashboard/suggestion/queries";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import RiskBar from "../shared/risk-bar";
import SuggestionItem from "../shared/suggestion-item";
import SummaryFooter from "../shared/summary-footer";
import SuggesteItemDrawer from "./suggestions/suggeste-item-drawer";

export default function SummaryCard() {
	const { activity } = useActivitySummaryStore();

	const {
		data: items,
		isLoading,
		isError,
	} = useGetSuggestions({ page: 1, limit: 1 });

	const item = items?.[0];

	return (
		<div className="w-full h-full bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			{activity && (
				<div className="px-2 grid grid-cols-2">
					<div className="flex items-center space-x-2">
						<Image
							src="/shapes/shape-complete.svg"
							alt="Incomplete items"
							height={48}
							width={48}
						/>
						<div>
							<p className="text-base font-bold font-mono leading-5">
								{activity.completed}
							</p>
							<p className="text-[0.65rem] uppercase font-medium font-mono tracking-[0.92px] text-[#616161]">
								Complete
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Image
							src="/shapes/shape-incomplete.svg"
							alt="Incomplete items"
							height={48}
							width={48}
						/>
						<div>
							<p className="text-base font-bold font-mono leading-5">
								{activity.pending}
							</p>
							<p className="text-[0.65rem] uppercase font-medium font-mono tracking-[0.92px] text-[#616161]">
								Issues
							</p>
						</div>
					</div>
				</div>
			)}

			<Separator className="bg-black/5 px-4" />

			{/* Suggested item is not loading and has a value */}
			{item && (
				<div className="space-y-3">
					<div className="flex flex-col space-y-1 items-center">
						<Badge className="uppercase text-[10px] px-2.5 py-1 rounded-full tracking-wider font-bold text-white bg-gradient-to-br from-[#EF060F] to-[#B60CF2]">
							Top suggestion
						</Badge>
						<Link
							href="/suggestions"
							className="p-3 flex items-center space-x-1.5 text-xs font-semibold text-blue-600 no-underline"
						>
							See all suggestions
							<Icon
								icon="fluent:chevron-right-12-filled"
								className="-mb-0.5"
								height={14}
								width={14}
							/>
						</Link>
					</div>

					<div className="px-4">
						<SuggestionItem
							title="Medical Policy Document"
							description={`A legal contract between the insurer and the policyholder, detailing coverage, terms, conditions, premiums, and the responsibilities of both parties`}
							showReminder={true}
						/>
					</div>

					<div className="px-4">
						<SuggesteItemDrawer item={item}>
							<RiskBar />
						</SuggesteItemDrawer>
					</div>
				</div>
			)}

			{/* Suggested item is loading */}
			{isLoading && (
				<div className="space-y-3">
					<div className="flex flex-col space-y-1 items-center">
						<Skeleton className="h-[25px] w-[114px] rounded-full bg-black/10" />
						<div className="p-3">
							<Skeleton className="h-[14px] w-[120px] rounded-sm bg-black/10" />
						</div>
					</div>
					<div className="px-4">
						<div className="flex gap-4">
							<div className="relative h-10 w-10 flex items-center justify-center rounded-full shrink-0">
								<Skeleton className="h-full w-full rounded-full bg-black/10" />
							</div>
							<div className="mt-1">
								<Skeleton className="h-[16px] w-[180px] rounded-full bg-black/10 mb-1.5" />
								<div className="space-y-1">
									<Skeleton className="h-2 w-[140px] rounded-full bg-black/10" />
									<Skeleton className="h-2 w-[110px] rounded-full bg-black/10" />
									<Skeleton className="h-1.5 w-[80px] rounded-full bg-black/10" />
									<Skeleton className="h-1.5 w-[80px] rounded-full bg-black/10" />
								</div>
								<div className="py-3">
									<Skeleton className="h-[12px] w-[60px] rounded-sm bg-black/10" />
								</div>
							</div>
						</div>
					</div>
					<div className="px-4">
						<Skeleton className="h-[32px] w-full rounded-[10px] bg-black/10" />
					</div>
				</div>
			)}

			{/* Suggested item has no value */}
			{isError && <div>No suggested item</div>}

			{item && (
				<>
					<Separator className="bg-black/5 px-4" />
					<SummaryFooter>
						<span className="font-normal">
							Do you have{" "}
							<span className="font-semibold">Medical Policy Document</span> in
							place?
						</span>
					</SummaryFooter>
				</>
			)}
		</div>
	);
}

// const item = {
// 	ranking: 4.5188,
// 	suggestedFor: [
// 		{
// 			name: "Child",
// 			displayName: "Children",
// 			eduText: null,
// 			affectedOwners: ["John Wick"],
// 		},
// 		{
// 			name: "Dependent",
// 			displayName: "Dependent",
// 			eduText: null,
// 			affectedOwners: ["Black Widow"],
// 		},
// 		{
// 			name: "Partner",
// 			displayName: "Spouse / Partner",
// 			eduText: null,
// 			affectedOwners: ["Halle Berry"],
// 		},
// 		{
// 			name: "Child",
// 			displayName: "Children",
// 			eduText: null,
// 			affectedOwners: ["Your child"],
// 		},
// 		{
// 			name: "Dependent",
// 			displayName: "Dependent",
// 			eduText: null,
// 			affectedOwners: ["Your dependent"],
// 		},
// 		{
// 			name: "Partner",
// 			displayName: "Spouse / Partner",
// 			eduText: null,
// 			affectedOwners: ["Halle Berry"],
// 		},
// 		{
// 			name: "Child",
// 			displayName: "Children",
// 			eduText: null,
// 			affectedOwners: ["Your child"],
// 		},
// 		{
// 			name: "Dependent",
// 			displayName: "Dependent",
// 			eduText: null,
// 			affectedOwners: ["Your dependent"],
// 		},
// 		{
// 			name: "Partner",
// 			displayName: "Spouse / Partner",
// 			eduText: null,
// 			affectedOwners: ["Halle Berry"],
// 		},
// 		{
// 			name: "Child",
// 			displayName: "Children",
// 			eduText: null,
// 			affectedOwners: ["Your child"],
// 		},
// 		{
// 			name: "Dependent",
// 			displayName: "Dependent",
// 			eduText: null,
// 			affectedOwners: ["Your dependent"],
// 		},
// 		{
// 			name: "Partner",
// 			displayName: "Spouse / Partner",
// 			eduText: null,
// 			affectedOwners: ["Halle Berry"],
// 		},
// 	],
// 	serviceProviders: [
// 		{
// 			name: "NextDot Advisory",
// 			summary:
// 				"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
// 			isPreferred: true,
// 		},
// 		{
// 			name: "Other Advisory",
// 			summary:
// 				"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
// 			isPreferred: false,
// 		},
// 	],
// 	suggestedReadings: [
// 		{
// 			name: "Read about this at NextDot.Ai",
// 			link: "https://nextdot.ai",
// 		},
// 	],
// 	id: "d49870a7-4398-4b1f-9ded-5417cc1903a8|66b82b46-f685-46d6-afd3-9c493c820fe0|2231704490061893844|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
// 	name: "LifePolicy",
// 	displayName: "Life Policy",
// 	eduText:
// 		"If you have a family, life insurance is essential because it helps protect your loved ones financially",
// 	isApplicable: null,
// 	riskItems: [
// 		{
// 			category: "Protection",
// 			goalName: "Life Insurance Claim",
// 			eduText:
// 				"Without life insurance, your loved ones may face financial hardship, leaving them exposed to debts, living expenses, or educational costs without a safety net.",
// 		},
// 		{
// 			category: "Delay",
// 			goalName: "Life Insurance Claim",
// 			eduText:
// 				"If no policy exists or is inaccessible, beneficiaries may face long delays in securing funds, creating stress during an already difficult time.",
// 		},
// 		{
// 			category: "Cost",
// 			goalName: "Life Insurance Claim",
// 			eduText:
// 				"Your family may need to rely on savings, sell assets, or take on debt to cover immediate financial needs, potentially losing wealth unnecessarily.",
// 		},
// 		{
// 			category: "Protection",
// 			goalName: "Estate Plan",
// 			eduText:
// 				"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
// 		},
// 		{
// 			category: "Delay",
// 			goalName: "Estate Plan",
// 			eduText:
// 				"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
// 		},
// 		{
// 			category: "Cost",
// 			goalName: "Estate Plan",
// 			eduText:
// 				"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
// 		},
// 		{
// 			category: "Protection",
// 			goalName: "Legacy",
// 			eduText:
// 				"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
// 		},
// 		{
// 			category: "Delay",
// 			goalName: "Legacy",
// 			eduText:
// 				"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
// 		},
// 		{
// 			category: "Cost",
// 			goalName: "Legacy",
// 			eduText:
// 				"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
// 		},
// 	],
// };
