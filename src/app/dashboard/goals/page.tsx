"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import ShortUniqueId from "short-unique-id";
import { useGetGoals } from "@/api/services/dashboard/goal/queries";
import { Skeleton } from "@/components/ui/skeleton";
import GoalItems from "@/features/dashboard/goals/goal-items";
import Header from "@/features/shared/header";

const uid = new ShortUniqueId();

export default function GoalsPage() {
	const {
		data: goals,
		isLoading,
		isError,
	} = useGetGoals({ page: 1, limit: 10 });

	return (
		<div className="pt-3 space-y-4 pb-8">
			<Header
				title="Goals"
				description="Keep essential documents ready when life changes come your way."
				content={
					<Link
						href="/"
						className="flex items-center space-x-2 text-[#27A7BE] font-medium text-[13px] leading-4 no-underline py-2"
					>
						<Icon
							icon="fluent:gift-20-filled"
							className="shrink-0"
							height={18}
							width={18}
						/>
						<p>Invite a friend and get 5% off</p>
						<Icon icon="fluent:chevron-right-16-filled" />
					</Link>
				}
			/>
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

			{goals && <GoalItems goals={goals} />}
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
