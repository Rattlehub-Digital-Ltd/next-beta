import { Icon } from "@iconify/react";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { Button } from "@/components/ui/button";
import RiskBar from "@/features/shared/risk-bar";
import SuggestionItem from "@/features/shared/suggestion-item";
import SummaryFooter from "@/features/shared/summary-footer";
import { track } from "@/lib/analytics";
import SuggesteItemDrawer from "./suggeste-item-drawer";

type SuggestedItemProps = {
	item: Suggested;
};

export default function SuggestedItem({ item }: SuggestedItemProps) {
	const { displayName, eduText, id } = item;

	const people: string[] = [];
	item.suggestedFor.forEach((item) => {
		item.affectedOwners.forEach((owner) => {
			if (!people.includes(owner)) people.push(owner);
		});
	});

	return (
		<div className="w-full h-full bg-[#F8F8F8]/80 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			<div className="px-4">
				<SuggestionItem
					title={displayName}
					description={eduText}
					showReminder={true}
					color="yellow"
				/>
			</div>
			<div className="px-4">
				<SuggesteItemDrawer item={item}>
					<Button
						className="!p-0 w-full"
						variant="ghost"
						onClick={() => {
							track("opens_affected_owners", {
								item: displayName,
								is_adaptive_card: false,
							});
						}}
					>
						<RiskBar data={item} />
					</Button>
				</SuggesteItemDrawer>
			</div>
			<div className="p-4">
				<div className="bg-white/25 rounded-2xl border border-black/5 px-6 py-4 backdrop-blur-2xl space-y-3">
					<div className="space-y-2">
						{/* <RiskCarousel items={riskItems} /> */}
						<p className="text-[13px]">Changes to reduce risk for:</p>
						<ul className="list-disc list-inside marker:text-[#616161] text-[13px] text-[#616161] pr-2 space-y-2 pl-4">
							{people.map((person) => (
								<li key={person} className="truncate">
									{person}
								</li>
							))}
						</ul>
					</div>
					<div className="px-0">
						<SuggesteItemDrawer item={item}>
							<Button
								className="text-blue-600 !no-underline font-semibold gap-1 text-[13.6px] px-2"
								size="sm"
								variant="link"
							>
								<span className="grow truncate">Tap for more</span>
								<Icon
									icon="fluent:chevron-right-24-regular"
									height={12}
									width={12}
								/>
							</Button>
						</SuggesteItemDrawer>
					</div>
				</div>
			</div>
			<SummaryFooter id={id}>
				<span className="font-normal">
					Do you have a <span className="font-semibold">{displayName}</span> in
					place?
				</span>
			</SummaryFooter>
		</div>
	);
}
