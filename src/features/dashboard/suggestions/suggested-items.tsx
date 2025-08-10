"use client";

import * as motion from "motion/react-client";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { cardVariants } from "@/motion";
import SuggestedItem from "./suggested-item";

export default function SuggestedItems({ items }: { items: Suggested[] }) {
	return (
		<div className="flex flex-col space-y-4">
			{items.map((item) => (
				<motion.div
					key={item.id}
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ amount: 0.35 }}
				>
					<motion.div variants={cardVariants}>
						<SuggestedItem item={item} />
					</motion.div>
				</motion.div>
			))}

			{/* Loading complete and data has no value */}
			{items.length === 0 && (
				<p className="text-[13px] pl-14 text-muted-foreground">
					You are all caught up for now
				</p>
			)}
		</div>
	);
}
