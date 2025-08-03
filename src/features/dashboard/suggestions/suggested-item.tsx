import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import RiskBar from "@/features/shared/risk-bar";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import SummaryFooter from "@/features/shared/summary-footer";
import type { Suggested } from "@/types/suggested";
import SuggesteItemDrawer from "./suggeste-item-drawer";

type SuggestedItemProps = {
	item: Suggested;
};

export default function SuggestedItem({ item }: SuggestedItemProps) {
	const { displayName, eduText, riskItems } = item;

	return (
		<div className="w-full h-full bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
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
					<RiskBar />
				</SuggesteItemDrawer>
			</div>
			<div className="px-4">
				<RiskCarousel items={riskItems} />
			</div>
			<div className="px-4">
				<SuggesteItemDrawer item={item}>
					<Button
						className="text-blue-600 !no-underline font-semibold"
						size="sm"
						variant="link"
					>
						<span className="grow truncate">
							Read articles and view people at risk
						</span>
						<Icon
							icon="fluent:chevron-right-24-regular"
							height={16}
							width={16}
						/>
					</Button>
				</SuggesteItemDrawer>
			</div>
			<SummaryFooter>
				<span className="font-normal">
					Do you have <span className="font-semibold">{displayName}</span> in
					place?
				</span>
			</SummaryFooter>
		</div>
	);
}
