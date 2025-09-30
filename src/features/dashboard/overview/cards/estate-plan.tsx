"use client";

import ShortUniqueId from "short-unique-id";
import { useGetEstatePlan } from "@/api/services/dashboard/overview/queries";
import { Skeleton } from "@/components/ui/skeleton";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";
import DocumentItem from "@/features/shared/document-item";
// import GoalProgressBar from "@/features/shared/goal-progress-bar";
// import { cn } from "@/lib/utils";
import Header from "../header";

// import EstatePlanAdvert from "./estate-plan-advert";

const uid = new ShortUniqueId();

export default function EstatePlan() {
	const { data: items, isLoading, isError, refetch } = useGetEstatePlan();

	return (
		<div>
			{/* Loading incomplete */}
			{isLoading && <LoadingSkeleton />}

			{/* Loading complete and data has value */}
			{!isLoading && (
				<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
					<Header
						title="Estate Plan"
						description="Keep track of all the required documents for this life event, for you and your family."
						color="teal"
					/>

					{/* <EstatePlanAdvert /> */}

					{/* Loading complete and data has value */}
					{items && items.length > 0 && (
						<>
							{/* <GoalProgressBar
								title="Estate plan is 45% complete"
								progress={cn(`w-[45%]`)}
							/> */}

							<div className="grid grid-cols-2 gap-3">
								{items.map((item) => (
									<AdaptiveCardButton
										currentDocument={item}
										key={item.id}
										recordId={item.id}
										referer="estate-plan"
										refresh={refetch}
									>
										<DocumentItem
											key={item.id}
											className={
												item.isApplicable
													? "bg-[#ECFDF5] ring-[#00C7BE]/80"
													: ""
											}
											color={item.isApplicable ? "#00C7BE" : ""}
											item={item}
										/>
									</AdaptiveCardButton>
								))}
							</div>
						</>
					)}

					{/* Loading complete and data has no value */}
					{items?.length === 0 && (
						<p className="text-[13px] text-muted-foreground">
							You are all caught up for now
						</p>
					)}

					{/* Fetching data error */}
					{isError && (
						<p className="text-[13px] text-muted-foreground">
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
			<div className="flex flex-col gap-4">
				<div className="relative h-10 w-10 flex items-center justify-center rounded-full shrink-0">
					<Skeleton className="h-full w-full rounded-full bg-black/10" />
				</div>
				<div className="mt-1">
					<Skeleton className="h-[16px] w-[180px] rounded-full bg-black/10 mb-1.5" />
					<div className="space-y-1">
						<Skeleton className="h-2 w-[70%] rounded-full bg-black/10" />
						<Skeleton className="h-2 w-[50%] rounded-full bg-black/10" />
					</div>
				</div>
			</div>
			<div>
				<Skeleton className="h-7 w-full rounded-[10px] bg-black/10" />
			</div>
			<div className="grid grid-cols-2 gap-2">
				{Array.from({ length: 4 }).map(() => (
					<Skeleton
						key={uid.randomUUID()}
						className="h-16 w-full rounded-[16px] bg-black/10"
					/>
				))}
			</div>
		</div>
	</div>
);
