"use client";

import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import useApi from "@/hooks/use-api";
import type { Goal } from "@/types/goal";
import GoalItem from "./goal-item";

const uid = new ShortUniqueId();

export default function GoalItems() {
	const { getGoals } = useApi();

	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState<Goal[] | undefined>();

	const fetchGoals = useCallback(async () => {
		try {
			setIsLoading(true);

			const goalsResponse = await getGoals({ page: 1, limit: 10 });
			setItems(goalsResponse?.data);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			toast.error("Error fetching goals");
		}
	}, [getGoals]);

	useEffect(() => {
		fetchGoals();
	}, [fetchGoals]);

	return (
		<div>
			{/* Loading incomplete */}
			{isLoading &&
				Array.from({ length: 3 }).map(() => (
					<LoadingSkeleton key={uid.randomUUID()} />
				))}

			{/* Loading complete and data has value */}
			<div className="flex flex-col space-y-4">
				{!isLoading &&
					items &&
					items?.length > 0 &&
					items.map((item) => <GoalItem key={uid.randomUUID()} item={item} />)}
			</div>

			{/* Loading complete and data has no value */}
			{!isLoading && items?.length === 0 && <div>No data</div>}

			{/* Fetching data error */}
			{!isLoading && !items && <div>Error fetching data</div>}
		</div>
	);
}

const LoadingSkeleton = () => (
	<div className="w-full h-full bg-[#F8F8F8]/80 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
		<div>
			<div className="flex gap-4">
				<div className="relative h-10 w-10 flex items-center justify-center rounded-full shrink-0">
					<Skeleton className="h-full w-full rounded-full bg-black/10" />
				</div>
				<div className="mt-1">
					<Skeleton className="h-[16px] w-[180px] rounded-full bg-black/10 mb-1.5" />
					<div className="space-y-1">
						<Skeleton className="h-2 w-[140px] rounded-full bg-black/10" />
						<Skeleton className="h-2 w-[110px] rounded-full bg-black/10" />
						<Skeleton className="h-1.5 w-[80px] rounded-full bg-black/10" />
						<Skeleton className="h-1.5 w-[80px] rounded-full bg-black/10" />
					</div>
				</div>
			</div>
		</div>
		<div>
			<Skeleton className="h-7 w-full rounded-[10px] bg-black/10" />
		</div>
	</div>
);
