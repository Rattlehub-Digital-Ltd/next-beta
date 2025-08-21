"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import ShortUniqueId from "short-unique-id";
import { useGetSuggestions } from "@/api/services/dashboard/suggestion/queries";
import { Skeleton } from "@/components/ui/skeleton";
import SuggestedItems from "@/features/dashboard/suggestions/suggested-items";
import Header from "@/features/shared/header";

const uid = new ShortUniqueId();

const title = "Suggestions";
const description = "Organize and store essential family-related documents.";

export default function SuggestionsPage() {
	const {
		data: items,
		isLoading,
		isError,
	} = useGetSuggestions({ page: 1, limit: 10 });

	return (
		<div className="pt-3 space-y-4 pb-8">
			<Header
				title={title}
				description={description}
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

			{isLoading &&
				Array.from({ length: 3 }).map(() => (
					<LoadingSkeleton key={uid.randomUUID()} />
				))}

			{/* Fetching data error */}
			{isError && (
				<p className="text-[13px] pl-4 text-muted-foreground">
					Error fetching suggestions
				</p>
			)}

			{items && <SuggestedItems items={items} />}
		</div>
	);
}

const LoadingSkeleton = () => (
	<div className="w-full h-full bg-[#F8F8F8]/80 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
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
					<div className="py-3">
						<Skeleton className="h-[12px] w-[60px] rounded-sm bg-black/10" />
					</div>
				</div>
			</div>
		</div>
		<div>
			<Skeleton className="h-7 w-full rounded-[10px] bg-black/10" />
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
					{Array.from({ length: 4 }).map((_, i) => (
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
