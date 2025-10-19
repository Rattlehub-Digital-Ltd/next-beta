"use client";

import { Icon } from "@iconify/react";
// import Link from "next/link";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { useGetSuggestions } from "@/api/services/dashboard/suggestion/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "../shared/optimized-image";
import RiskBar from "../shared/risk-bar";
import SuggestionItem from "../shared/suggestion-item";
import SummaryFooter from "../shared/summary-footer";
import SuggesteItemDrawer from "./suggestions/suggeste-item-drawer";

export default function SummaryCard() {
	const { activity } = useActivitySummaryStore();

	const {
		data: items,
		isLoading,
		isError,
		refetch,
	} = useGetSuggestions({ page: 1, limit: 5 });

	const item = items?.find((suggestion) => suggestion.isApplicable === null);

	return (
		<div className="w-full h-full bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			{activity && (
				<div className="px-2 grid grid-cols-2">
					<div className="flex items-center space-x-2">
						<OptimizedImage
							src="/shapes/shape-complete.svg"
							alt="Incomplete items"
							height={48}
							width={48}
						/>
						<div>
							<p className="text-base font-bold font-mono leading-5">
								{activity.completed}
							</p>
							<p className="text-[0.65rem] uppercase font-medium font-mono tracking-[0.92px] text-[#616161]">
								Complete
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<OptimizedImage
							src="/shapes/shape-incomplete.svg"
							alt="Incomplete items"
							height={48}
							width={48}
						/>
						<div>
							<p className="text-base font-bold font-mono leading-5">
								{activity.pending}
							</p>
							<p className="text-[0.65rem] uppercase font-medium font-mono tracking-[0.92px] text-[#616161]">
								Issues
							</p>
						</div>
					</div>
				</div>
			)}

			{(item || isLoading) && <Separator className="bg-black/5 px-4" />}

			{/* Suggested item is not loading and has a value */}
			{item && (
				<div className="space-y-3">
					<div className="flex flex-col space-y-1 items-center">
						<Badge className="uppercase text-[10px] px-2.5 py-1 rounded-full tracking-wider font-bold text-white bg-gradient-to-br from-[#EF060F] to-[#B60CF2]">
							Top suggestion
						</Badge>
						{/* <Link
							href="/dashboard/suggestions"
							className="p-3 flex items-center space-x-1.5 text-xs font-semibold text-blue-600 no-underline"
						>
							See all suggestions
							<Icon
								icon="fluent:chevron-right-12-filled"
								className="-mb-0.5"
								height={14}
								width={14}
							/>
						</Link> */}
					</div>

					<div className="px-4 w-full">
						<SuggestionItem
							title={item.displayName}
							description={item.eduText}
							showReminder={false}
						/>
					</div>

					<div className="px-4 w-full">
						<SuggesteItemDrawer item={item}>
							<Button
								className="!p-0 w-full !px-0 !has-[>svg]:px-0"
								variant="ghost"
							>
								<RiskBar data={item} />
							</Button>
						</SuggesteItemDrawer>
					</div>
				</div>
			)}

			{/* Suggested item is loading */}
			{isLoading && (
				<div className="space-y-3">
					<div className="flex flex-col space-y-1 items-center">
						<Skeleton className="h-[25px] w-[114px] rounded-full bg-black/10" />
						<div className="p-3">
							<Skeleton className="h-[14px] w-[120px] rounded-sm bg-black/10" />
						</div>
					</div>
					<div className="px-4">
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
								<div className="py-3">
									<Skeleton className="h-[12px] w-[60px] rounded-sm bg-black/10" />
								</div>
							</div>
						</div>
					</div>
					<div className="px-4">
						<Skeleton className="h-[32px] w-full rounded-[10px] bg-black/10" />
					</div>
				</div>
			)}

			{/* Suggested item has no value */}
			{isError && (
				<div className="px-4 text-xs text-muted-foreground flex items-center gap-2">
					<Icon icon="fluent:warning-20-filled" className="h-5 w-5" />
					Something went wrong!
				</div>
			)}

			{!isLoading && !isError && !item && (
				<div className="px-4 text-xs text-muted-foreground flex items-center gap-2">
					<Icon icon="fluent:info-sparkle-20-filled" className="h-5 w-5" />
					No suggested item, you all caught up
				</div>
			)}

			{item && (
				<>
					<Separator className="bg-black/5 px-4" />
					<SummaryFooter
						item={item}
						id={item.id}
						isApplicable={item.isApplicable}
						refetch={refetch}
					>
						<span className="font-normal">
							Do you have a{" "}
							<span className="font-semibold">{item.displayName}</span> in
							place?
						</span>
					</SummaryFooter>
				</>
			)}
		</div>
	);
}
