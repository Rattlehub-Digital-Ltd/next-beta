"use client";

import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { Skeleton } from "@/components/ui/skeleton";
import SuggestionItem from "@/features/shared/suggestion-item";
import useApi from "@/hooks/use-api";
import type { DocumentLocation } from "@/types/overview";
import DocumentLocationBadge from "../document-location-badge";

const uid = new ShortUniqueId();

export default function DocumentLocations() {
	const { getOverviewDocumentLocations } = useApi();

	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState<DocumentLocation[] | undefined>();

	const fetchData = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await getOverviewDocumentLocations();
			setItems(response?.data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	}, [getOverviewDocumentLocations]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div>
			{/* Loading incomplete */}
			{isLoading && <LoadingSkeleton />}

			{/* Loading complete and data has value */}
			{!isLoading && (
				<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
					<SuggestionItem
						title="Document Locations"
						description={`Where your documents are stored`}
						showReminder={false}
						color="brown"
					/>

					{/* Loading complete and data has value */}
					{items && items?.length > 0 && (
						<div className="grid grid-cols-2 gap-2">
							<DocumentLocationBadge label="Safe" count={4} />
							<DocumentLocationBadge label="Lawyer Safe" count={2} />
							<DocumentLocationBadge label="Home Safety Box" count={8} />
							<DocumentLocationBadge label="Office Safe" count={3} />
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
			<div className="grid grid-cols-2 gap-2">
				{Array.from({ length: 4 }).map(() => (
					<Skeleton
						key={uid.randomUUID()}
						className="h-6 w-full rounded-md bg-black/10"
					/>
				))}
			</div>
		</div>
	</div>
);
