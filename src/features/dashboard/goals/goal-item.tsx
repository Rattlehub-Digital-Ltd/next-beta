"use client";

import type { Goal } from "@/api/services/dashboard/goal/types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import GoalProgressBar from "@/features/shared/goal-progress-bar";
import SuggestionItem from "@/features/shared/suggestion-item";
import { track } from "@/lib/analytics";
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

			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger
						className="text-[13.6px] text-blue-600 font-semibold pl-2"
						onClick={() =>
							track("viewed_goal", {
								item: item.displayName,
								percentage_completion: item.percentageCompletion,
								goal_name: item.name,
								goal_ranking: item.ranking,
							})
						}
					>
						See more details
					</AccordionTrigger>
					<AccordionContent>
						<TabsCard goalName={name} referer={name} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
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
