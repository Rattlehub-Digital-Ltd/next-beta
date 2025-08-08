"use client";

import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { Skeleton } from "@/components/ui/skeleton";
import DocumentItem from "@/features/shared/document-item";
import useApi from "@/hooks/use-api";
import type { LifeFileDocument } from "@/types/overview";
import Header from "../header";

const uid = new ShortUniqueId();

export default function LifeFileDocuments() {
	const { getOverviewLifeFileDocuments } = useApi();

	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState<LifeFileDocument[] | undefined>();

	const fetchData = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await getOverviewLifeFileDocuments();
			setItems(response?.data);
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	}, [getOverviewLifeFileDocuments]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

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
					{items && items?.length > 0 && (
						<div className="grid grid-cols-2 gap-4">
							{items.map((item) => (
								<DocumentItem
									key={item.id}
									className={
										item.isApplicable ? "bg-[#007AFF]/5 ring-[#007AFF]/80" : ""
									}
									color={item.isApplicable ? "#007AFF" : ""}
									item={item}
								/>
							))}
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
