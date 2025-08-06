"use client";

import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { Skeleton } from "@/components/ui/skeleton";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import useApi from "@/hooks/use-api";
import type { ActionItem } from "@/types/action-item";

const uid = new ShortUniqueId({ length: 10 });

export default function ActionsTab() {
	const { getDocuments } = useApi();

	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState<ActionItem[] | undefined>();

	const fetchData = useCallback(async () => {
		setLoading(true);

		const documentsResponse = await getDocuments({ page: 1, limit: 10 });
		setItems(documentsResponse?.data?.items);

		setLoading(false);
	}, [getDocuments]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="space-y-4">
			{/* Loading incomplete */}
			{loading &&
				Array.from({ length: 3 }).map(() => (
					<LoadingSkeleton key={uid.randomUUID()} />
				))}

			{/* Loading complete and data has value */}
			{!loading && items && (
				<ul className="space-y-4">
					{items.map(({ id, displayName, eduText, riskItems }) => (
						<li key={id}>
							<div className="flex flex-col space-y-3 p-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
								<SuggestionItem
									title={displayName}
									description={eduText}
									showReminder={false}
									color="teal"
								/>

								<RiskCarousel items={riskItems} />
							</div>
						</li>
					))}
				</ul>
			)}

			{/* Loading complete and data has no value */}
			{!loading && items?.length === 0 && <div>No data</div>}

			{/* Fetching data error */}
			{!loading && !items && <div>Error fetching data</div>}
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
