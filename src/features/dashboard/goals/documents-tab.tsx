"use client";

import * as motion from "motion/react-client";
import { useGetGoalDocuments } from "@/api/services/dashboard/queries";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";
import DocumentItem from "@/features/shared/document-item";

export default function DocumentsTab({ goalName }: { goalName: string }) {
	const { data, isLoading, isError } = useGetGoalDocuments(goalName);

	return (
		<div className="grid grid-cols-2 gap-2 p-2 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/25">
			{data &&
				data?.length > 0 &&
				data.map((item) => (
					<AdaptiveCardButton
						key={item.id}
						recordId={item.id}
						referer=""
						refresh={console.log}
					>
						<motion.div
							className="w-full"
							whileTap={{ scale: !item.isApplicable ? 0.95 : 1 }}
						>
							<DocumentItem
								className={
									item.isApplicable ? "bg-[#ECFDF5] ring-[#00C7BE]/80" : ""
								}
								color={item.isApplicable ? "#00C7BE" : ""}
								item={item}
							/>
						</motion.div>
					</AdaptiveCardButton>
				))}

			{isLoading && (
				<div className="col-span-full text-xs text-muted-foreground px-2">
					Loading...
				</div>
			)}

			{data?.length === 0 && (
				<p className="text-[13px] px-2 text-muted-foreground col-span-full">
					You are all caught up for now
				</p>
			)}

			{isError && (
				<p className="text-[13px] px-2 text-muted-foreground col-span-full">
					Error fetching goals
				</p>
			)}
		</div>
	);
}
