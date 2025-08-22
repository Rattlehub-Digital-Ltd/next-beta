"use client";

import * as motion from "motion/react-client";
import ShortUniqueId from "short-unique-id";
import { useGetGoals } from "@/api/services/dashboard/goal/queries";
import { cardVariants } from "@/motion";
import GoalItem from "./goal-item";
import { LoadingSkeleton } from "./loading-skeleton";

const uid = new ShortUniqueId();

export default function GoalItems() {
	const {
		data: goals,
		isLoading,
		isError,
	} = useGetGoals({ page: 1, limit: 10 });

	return (
		<div className="w-full">
			{goals && (
				<motion.div className="flex flex-col space-y-4">
					{goals.map((item) => (
						<motion.div
							key={uid.randomUUID()}
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ amount: 0.2 }}
						>
							<motion.div variants={cardVariants}>
								<GoalItem item={item} />
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			)}

			{goals?.length === 0 && (
				<p className="text-[13px] pl-14 text-muted-foreground col-span-full">
					You are all caught up for now
				</p>
			)}

			{/* Loading incomplete */}
			{isLoading && (
				<div className="space-y-4">
					{Array.from({ length: 3 }).map(() => (
						<LoadingSkeleton key={uid.randomUUID()} />
					))}
				</div>
			)}

			{/* Fetching data error */}
			{isError && (
				<p className="text-[13px] pl-4 text-muted-foreground">
					Error fetching goals
				</p>
			)}
		</div>
	);
}
