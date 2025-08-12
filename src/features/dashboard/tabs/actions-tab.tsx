"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";
import { useInfiniteGetDocuments } from "@/api/services/dashboard/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import { cardVariants } from "@/motion";
import { SparkleIcon } from "@/styles/icons";
import type { ActionItem } from "@/types/action-item";

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
	} = useInfiniteGetDocuments({
		page: 1,
		limit: 5,
	});

	const [currentItem, setCurrentItem] = useState<ActionItem | undefined>();

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
									viewport={{ amount: 0.6 }}
								>
									<motion.div
										id={id}
										variants={cardVariants}
										className="flex flex-col space-y-3 p-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]"
									>
										<SuggestionItem
											title={displayName}
											description={eduText}
											showReminder={false}
											color="teal"
											updateCurrentItem={(show: boolean) =>
												setCurrentItem(show ? item : undefined)
											}
										/>

										<RiskCarousel items={riskItems} />
									</motion.div>
								</motion.li>
							);
						});
					})}
				</ul>
			)}

			{hasNextPage && (
				<motion.div className="px-2" whileTap={{ scale: 0.95 }}>
					<Button
						className="w-full bg-white/45 backdrop-blur-2xl text-foreground hover:bg-white/75 hover:text-foreground rounded-[12px] text-[13px] font-medium font-mono"
						disabled={!hasNextPage || isFetching}
						onClick={() => fetchNextPage()}
					>
						<Icon icon="fluent:arrow-counterclockwise-dashes-24-filled" />
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

			{/* Adaptive card button */}
			{currentItem && (
				<div className="mt-6 fixed bottom-24 left-0 w-full z-20 px-6">
					<AdaptiveCardButton
						recordId={currentItem.id}
						referer="actions"
						refresh={refetch}
					>
						<motion.div whileTap={{ scale: 0.95 }}>
							<Button
								color="primary"
								size="lg"
								className="shadow-md bg-blue-700/80 backdrop-blur-[25px] active:bg-blue-700 rounded-2xl shadow-blue-500/40 h-11 text-[13px] w-full"
								variant="default"
							>
								<SparkleIcon className="w-5 h-5 text-white shrink-0" />
								<span className="line-clamp-1 truncate">
									{currentItem.displayName}
								</span>
							</Button>
						</motion.div>
					</AdaptiveCardButton>
				</div>
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
