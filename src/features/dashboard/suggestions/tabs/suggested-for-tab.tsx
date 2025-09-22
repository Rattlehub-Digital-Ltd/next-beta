"use client";

import { useCallback } from "react";
// import ShortUniqueId from "short-unique-id";
import type {
	Suggested,
	SuggestedFor,
} from "@/api/services/dashboard/suggestion/types";
import RiskCarousel from "@/features/shared/risk-carousel";
import { track } from "@/lib/analytics";
// import UserBadge from "@/features/shared/user-badge";
import type { RiskItemProps } from "@/types/risk-item-props";

type SuggestedForProps = {
	item: Suggested;
	items: SuggestedFor[];
	riskItems?: RiskItemProps[];
};

// const uid = new ShortUniqueId({ length: 10 });

export default function SuggestedForTab({
	item,
	items,
	riskItems,
}: SuggestedForProps) {
	const handleOnRiskItemChange = useCallback(
		(index: number, item: Suggested) => {
			const value = item.riskItems[index];

			if (!value) return;

			track("swiped_carousel", {
				item: item.displayName,
				record_identifier: item.id,
				risk_category: value.category,
				goal_name: value.goalName,
			});
		},
		[],
	);

	const people: string[] = [];
	items.forEach((item) => {
		item.affectedOwners.forEach((owner) => {
			if (!people.includes(owner)) people.push(owner);
		});
	});

	return (
		<div className="p-3 bg-[#FFFFFF]/65 space-y-3 border border-black/5 rounded-3xl backdrop-blur-[25px] shadow-[0px_8px_30px_0px rgba(106, 106, 106, 0.06)]">
			<div className="flex px-2 space-x-4">
				<div className="grow">
					<p className="text-[13px] font-medium">Suggested for</p>
					<p className="text-xs text-[#616161]">{people.length} risk items</p>
				</div>
			</div>
			<RiskCarousel
				items={riskItems}
				onRiskItemChange={(index: number) =>
					handleOnRiskItemChange(index, item)
				}
			/>
			{/* <div className="pt-6 flex flex-wrap gap-2">
				{people.map((person) => (
					<UserBadge key={uid.randomUUID()} name={person} />
				))}
			</div> */}
		</div>
	);
}
