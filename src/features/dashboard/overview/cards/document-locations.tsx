"use client";

import { Icon } from "@iconify/react";
import ShortUniqueId from "short-unique-id";
import { useGetDocumentLocations } from "@/api/services/dashboard/overview/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SuggestionItem from "@/features/shared/suggestion-item";
import DocumentLocationBadge from "../document-location-badge";
import DocumentLocationSuggestions from "./document-location-suggestions";

const uid = new ShortUniqueId();

export default function DocumentLocations() {
	const { data: items, isLoading, isError } = useGetDocumentLocations();

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
					{items && (
						<div className="grid grid-cols-2 gap-2">
							<DocumentLocationBadge label="Safe" count={4} />
							<DocumentLocationBadge label="Lawyer Safe" count={2} />
							<DocumentLocationBadge label="Home Safety Box" count={8} />
							<DocumentLocationBadge label="Office Safe" count={3} />
						</div>
					)}

					<DocumentLocationSuggestions>
						<Button
							className="text-indigo-600 !no-underline text-left font-semibold text-xs gap-2 px-1"
							size="sm"
							variant="link"
						>
							<Icon
								icon="fluent-color:text-bullet-list-square-sparkle-24"
								height={20}
								width={20}
								className="!h-5 !w-5"
							/>
							<span className="grow truncate">
								Where can I store my documents?
							</span>
						</Button>
					</DocumentLocationSuggestions>

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
