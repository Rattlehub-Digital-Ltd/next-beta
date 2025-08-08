"use client";

import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { Skeleton } from "@/components/ui/skeleton";
import SuggestionItem from "@/features/shared/suggestion-item";
import UserBadge from "@/features/shared/user-badge";
import useApi from "@/hooks/use-api";
import type { FamilyType } from "@/types/overview";

const uid = new ShortUniqueId();

export default function Family() {
	const { getOverviewFamily } = useApi();

	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState<FamilyType[] | undefined>();

	const fetchData = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await getOverviewFamily();
			setItems(response?.data);
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	}, [getOverviewFamily]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div>
			{/* Loading incomplete */}
			{isLoading && <LoadingSkeleton />}

			{!isLoading && (
				<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
					<SuggestionItem
						title="Family"
						description={`5 family members`}
						showReminder={false}
						color="indigo"
					/>

					{/* Loading complete and data has value */}
					{items && items?.length > 0 && (
						<div className="flex flex-wrap gap-2">
							<UserBadge name="Halle Berry" />
							<UserBadge name="John Wick" />
							<UserBadge name="Black Widow" />
							<UserBadge name="Child 1" />
							<UserBadge name="Child 2" />
						</div>
					)}

					{/* Loading complete and data has no value */}
					{items?.length === 0 && (
						<p className="text-[13px] pl-14 text-muted-foreground">
							You are all caught up for now
						</p>
					)}

					{/* Fetching data error */}
					{!items && (
						<p className="text-[13px] pl-14 text-muted-foreground">
							Error fetching data
						</p>
					)}
				</div>
			)}
		</div>
	);
}

const LoadingSkeleton = () => (
	<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
		<div className="space-y-8">
			<div className="flex gap-4">
				<div className="relative h-10 w-10 flex items-center justify-center rounded-full shrink-0">
					<Skeleton className="h-full w-full rounded-full bg-black/10" />
				</div>
				<div className="mt-1">
					<Skeleton className="h-[16px] w-[180px] rounded-full bg-black/10 mb-1.5" />
					<Skeleton className="h-2 w-[140px] rounded-full bg-black/10" />
				</div>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{Array.from({ length: 6 }).map(() => (
					<Skeleton
						key={uid.randomUUID()}
						className="h-5 w-full rounded-full bg-black/10"
					/>
				))}
			</div>
		</div>
	</div>
);
