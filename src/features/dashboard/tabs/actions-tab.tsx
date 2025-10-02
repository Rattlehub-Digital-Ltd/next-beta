"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { useCallback } from "react";
import ShortUniqueId from "short-unique-id";
import { useInfiniteGetDocuments } from "@/api/services/dashboard/queries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import { track } from "@/lib/analytics";
import { cardVariants } from "@/motion";
import type { ActionItem } from "@/types/action-item";
import CardFooter from "./card-footer";

const uid = new ShortUniqueId({ length: 10 });

export default function ActionsTab() {
	const {
		data,
		isLoading,
		refetch,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteGetDocuments();

	const currentPage = data?.pages[data?.pages.length - 1];
	const totalPages = currentPage?.totalPages || 0;
	const totalItems = currentPage?.totalItems || 0;
	const pageNumber = currentPage?.pageNumber || 0;

	const currentItemsCount = data
		? data.pages.reduce((acc, page) => acc + page.items.length, 0)
		: 0;

	// Determine if "Load More" button should be shown
	// Show if there are more pages to load and not all items are loaded

	const showLoadMore =
		totalPages > 1 && pageNumber < totalPages && currentItemsCount < totalItems;

	const handleOnRiskItemChange = useCallback(
		(index: number, item: ActionItem) => {
			const value = item.riskItems[index];

			if (!value) return;

			track("swiped_carousel", {
				item: item.displayName,
				record_identifier: item.id,
				risk_category: value.category,
				goal_name: value.goalName,
			});
		},
		[],
	);

	return (
		<div className="space-y-4">
			{/* Loading incomplete */}
			{isLoading &&
				Array.from({ length: 3 }).map(() => (
					<LoadingSkeleton key={uid.randomUUID()} />
				))}

			{/* Loading complete and data has value */}
			{data && (
				<ul className="space-y-4">
					{data?.pages.map((page) => {
						return page.items.map((item) => {
							const { id, displayName, eduText, riskItems } = item;

							return (
								<motion.li
									key={id}
									initial="offscreen"
									whileInView="onscreen"
									viewport={{ amount: 0.2 }}
								>
									<motion.div
										id={id}
										variants={cardVariants}
										className="flex flex-col space-y-3 py-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]"
									>
										<div className="px-4">
											<SuggestionItem
												title={displayName}
												description={eduText}
												showReminder={false}
												color="teal"
												owner={item.ownerDisplayName}
											/>
										</div>

										<div className="px-4">
											<RiskCarousel
												items={riskItems}
												onRiskItemChange={(index: number) =>
													handleOnRiskItemChange(index, item)
												}
											/>
										</div>

										<Separator className="bg-black/5 px-4" />
										<CardFooter item={item} recordId={id} refresh={refetch}>
											<span className="font-normal">
												Do you have a{" "}
												<span className="font-semibold">
													{item.displayName}
												</span>{" "}
												in place?
											</span>
										</CardFooter>
									</motion.div>
								</motion.li>
							);
						});
					})}
				</ul>
			)}

			{showLoadMore && (
				<motion.div className="px-2" whileTap={{ scale: 0.95 }}>
					<Button
						className="w-full bg-white/75 backdrop-blur-2xl text-foreground hover:bg-white/85 hover:text-foreground rounded-[12px] text-[13px] font-medium font-mono"
						disabled={!hasNextPage || isFetching}
						onClick={() => {
							fetchNextPage();
							track("load_more_actions", {
								page_params: JSON.stringify(data?.pageParams || ""),
							});
						}}
					>
						<Icon
							icon="fluent:arrow-counterclockwise-dashes-24-filled"
							className={isFetching ? "animate-spin" : ""}
						/>
						{isFetchingNextPage
							? "Loading more..."
							: hasNextPage
								? "Load More"
								: "Nothing more to load"}
					</Button>
				</motion.div>
			)}

			{/* Loading complete and data has no value */}
			{!hasNextPage && (
				<p className="text-[13px] pl-14 text-muted-foreground">
					You are all caught up for now
				</p>
			)}

			{/* Fetching data error */}
			{error && (
				<p className="text-[13px] pl-14 text-muted-foreground">
					Error fetching data
				</p>
			)}
		</div>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className="flex flex-col space-y-3 p-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
			{/* Header */}
			<div className="flex gap-4">
				<div className="relative h-10 w-10 flex items-center justify-center rounded-full shrink-0">
					<Skeleton className="h-full w-full rounded-full bg-black/10" />
				</div>
				<div className="mt-1">
					<Skeleton className="h-5 w-48 rounded-full bg-black/10 mb-1.5" />
					<div className="space-y-1">
						<Skeleton className="h-2 w-full rounded-full bg-black/10" />
						<Skeleton className="h-2 w-full rounded-full bg-black/10" />
						<Skeleton className="h-2 w-3/4 rounded-full bg-black/10" />
					</div>
					<div className="py-3">
						<Skeleton className="h-3 w-[60px] rounded-sm bg-black/10" />
					</div>
				</div>
			</div>

			{/* Risk items */}
			<div className="space-y-3 p-3 rounded-[12px] border border-[#EBEDED] backdrop-blur-[25px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]">
				<Skeleton className="h-3 w-24 rounded-full bg-black/10" />
				<Skeleton className="h-2 w-10 rounded-full bg-black/10" />
				<div className="space-y-1">
					<Skeleton className="h-2 w-[80%] rounded-full bg-black/10" />
					<Skeleton className="h-2 w-[65%] rounded-full bg-black/10" />
					<Skeleton className="h-2 w-[50%] rounded-full bg-black/10" />
					<Skeleton className="h-2 w-16 rounded-full bg-black/10" />
				</div>
			</div>

			{/* Navigation area */}
			<div className="relative overflow-hidden">
				<div className="bg-[#FDFDFD]/50 border w-full border-[#EBEDED] rounded-full h-11 backdrop-blur-[15px] shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)] flex justify-between px-1.5 items-center">
					<Skeleton
						className="w-8 h-8 rounded-full bg-black/10"
						style={{ animationDelay: "1.1s" }}
					/>

					{/* Progress dots */}
					<div className="flex gap-2">
						{Array.from({ length: 8 }).map((_, i) => (
							<Skeleton
								key={uid.randomUUID()}
								className="w-2 h-2 rounded-full bg-black/10"
								style={{ animationDelay: `${1.2 + i * 0.1}s` }}
							/>
						))}
					</div>

					<Skeleton
						className="w-8 h-8 rounded-full bg-black/10"
						style={{ animationDelay: "2s" }}
					/>
				</div>
			</div>
		</div>
	);
};
