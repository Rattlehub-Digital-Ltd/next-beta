import RiskBar from "@/features/shared/risk-bar";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import SummaryFooter from "@/features/shared/summary-footer";
import type { Suggested } from "@/types/suggested";

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
					color="blue"
				/>
			</div>
			<div className="px-4">
				<RiskBar />
			</div>
			<div className="px-4">
				<RiskCarousel items={riskItems} />
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
