import ShortUniqueId from "short-unique-id";
import type { Goal } from "@/api/services/dashboard/goal/types";
import GoalItem from "./goal-item";

const uid = new ShortUniqueId();

export default function GoalItems({ goals }: { goals: Goal[] }) {
	console.log(goals);
	return (
		<div>
			<div className="flex flex-col space-y-4">
				{goals.map((item) => (
					<GoalItem key={uid.randomUUID()} item={item} />
				))}
			</div>

			{goals.length === 0 && (
				<p className="text-[13px] pl-14 text-muted-foreground">
					You are all caught up for now
				</p>
			)}
		</div>
	);
}
