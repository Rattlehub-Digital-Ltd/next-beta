import RiskBar from "@/features/shared/risk-bar";
import SuggestionItem from "@/features/shared/suggestion-item";
import type { Goal } from "@/types/goal";
import TabsCard from "./tabs-card";

type GoalItemProps = {
	item: Goal;
};

function GoalItem({ item }: GoalItemProps) {
	const { displayName, eduText } = item;

	return (
		<div className="w-full h-full bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			<div className="px-4">
				<SuggestionItem
					title={displayName}
					description={eduText}
					showReminder={false}
					color="dark-teal"
				/>
			</div>
			<div className="px-4">
				<RiskBar />
			</div>
			<div className="px-4">
				<TabsCard />
			</div>
		</div>
	);
}

export default GoalItem;
