import * as motion from "motion/react-client";
import ShortUniqueId from "short-unique-id";

import type { Goal } from "@/api/services/dashboard/goal/types";
import { cardVariants } from "@/motion";
import GoalItem from "./goal-item";

const uid = new ShortUniqueId();

export default function GoalItems({ goals }: { goals: Goal[] }) {
	return (
		<div>
			<motion.div className="flex flex-col space-y-4">
				{goals.map((item) => (
					<motion.div
						key={uid.randomUUID()}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ amount: 0.35 }}
					>
						<motion.div variants={cardVariants}>
							<GoalItem item={item} />
						</motion.div>
					</motion.div>
				))}
			</motion.div>

			{goals.length === 0 && (
				<p className="text-[13px] pl-14 text-muted-foreground">
					You are all caught up for now
				</p>
			)}
		</div>
	);
}
