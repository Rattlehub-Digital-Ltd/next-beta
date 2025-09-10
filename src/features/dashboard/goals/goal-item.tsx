import type { Goal } from "@/api/services/dashboard/goal/types";
import GoalProgressBar from "@/features/shared/goal-progress-bar";
import SuggestionItem from "@/features/shared/suggestion-item";
import TabsCard from "./tabs-card";

type GoalItemProps = {
	item: Goal;
};

function GoalItem({ item }: GoalItemProps) {
	const { displayName, eduText, name } = item;
	const perc = `${item.percentageCompletion}%`;

	return (
		<div className="w-full h-full bg-[#F8F8F8]/80 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			<div>
				<SuggestionItem
					title={displayName}
					description={eduText}
					showReminder={false}
					color="dark-teal"
				/>
			</div>

			<div>
				<TabsCard goalName={name} referer={name} />
			</div>
			<div>
				<GoalProgressBar
					title={`Goal is ${Math.round(item.percentageCompletion)}% complete`}
					progress={perc}
				/>
			</div>
		</div>
	);
}

export default GoalItem;
