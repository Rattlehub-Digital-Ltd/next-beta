"use client";

import * as motion from "motion/react-client";
import ShortUniqueId from "short-unique-id";
import { useGetLifeFileDocuments } from "@/api/services/dashboard/overview/queries";
import { Skeleton } from "@/components/ui/skeleton";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";
import DocumentItem from "@/features/shared/document-item";
import Header from "../header";

const uid = new ShortUniqueId();

export default function LifeFileDocuments() {
	const { data: items, isLoading, isError } = useGetLifeFileDocuments();

	return (
		<div>
			{/* Loading incomplete */}
			{isLoading && <LoadingSkeleton />}

			{!isLoading && (
				<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
					<Header
						title="Life File Documents"
						description="All your important family documents"
						color="blue"
					/>

					{/* Loading complete and data has value */}
					{items && (
						<div className="grid grid-cols-2 gap-2">
							{items.map((item) => (
								<AdaptiveCardButton
									key={item.id}
									recordId={item.id}
									referer=""
									refresh={console.log}
								>
									<motion.div key={item.id} whileTap={{ scale: 0.95 }}>
										<DocumentItem
											className={
												item.isApplicable
													? "bg-[#007AFF]/5 ring-[#007AFF]/80"
													: ""
											}
											color={item.isApplicable ? "#007AFF" : ""}
											item={item}
										/>
									</motion.div>
								</AdaptiveCardButton>
							))}
						</div>
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
