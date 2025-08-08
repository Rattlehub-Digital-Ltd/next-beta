"use client";

import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import SuggestedItem from "./suggested-item";

export default function SuggestedItems({ items }: { items: Suggested[] }) {
	return (
		<div className="flex flex-col space-y-4">
			{items.map((item) => (
				<SuggestedItem key={item.id} item={item} />
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
