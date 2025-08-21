import { Icon } from "@iconify/react";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { Button } from "@/components/ui/button";
import RiskBar from "@/features/shared/risk-bar";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import SummaryFooter from "@/features/shared/summary-footer";
import SuggesteItemDrawer from "./suggeste-item-drawer";

type SuggestedItemProps = {
	item: Suggested;
};

export default function SuggestedItem({ item }: SuggestedItemProps) {
	const { displayName, eduText, riskItems, id } = item;

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
					<Button className="!p-0 w-full" variant="ghost">
						<RiskBar data={item} />
					</Button>
				</SuggesteItemDrawer>
			</div>
			<div className="px-4">
				<RiskCarousel items={riskItems} />
			</div>
			<div className="px-4">
				<SuggesteItemDrawer item={item}>
					<Button
						className="text-blue-600 !no-underline font-semibold text-[13px] px-1"
						size="sm"
						variant="link"
					>
						<span className="grow truncate">
							Read articles and view people at risk
						</span>
						<Icon
							icon="fluent:chevron-right-24-regular"
							height={14}
							width={14}
						/>
					</Button>
				</SuggesteItemDrawer>
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
