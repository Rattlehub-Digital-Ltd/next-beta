"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import ShortUniqueId from "short-unique-id";
import { useGetSuggestions } from "@/api/services/dashboard/suggestion/queries";
import { cardVariants } from "@/motion";
import { LoadingSkeleton } from "./loading-skeleton";
import SuggestedItem from "./suggested-item";

const uid = new ShortUniqueId();

export default function SuggestedItems() {
	const {
		data: items,
		isLoading,
		isError,
	} = useGetSuggestions({ page: 1, limit: 10 });

	return (
		<div className="flex flex-col space-y-4">
			{items?.map((item) => (
				<motion.div
					key={item.id}
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ amount: 0.3 }}
				>
					<motion.div variants={cardVariants}>
						<SuggestedItem item={item} />
					</motion.div>
				</motion.div>
			))}

			{/* Loading complete and data has no value */}
			{items?.length === 0 && (
				<div className="text-[13px] text-muted-foreground flex items-center gap-2 px-3">
					<Icon icon="fluent:info-sparkle-20-filled" className="h-5 w-5" />
					You are all caught up for now
				</div>
			)}

			{isLoading &&
				Array.from({ length: 3 }).map(() => (
					<LoadingSkeleton key={uid.randomUUID()} />
				))}

			{/* Fetching data error */}
			{isError && (
				<p className="text-[13px] pl-4 text-muted-foreground">
					Error fetching suggestions
				</p>
			)}
		</div>
	);
}
