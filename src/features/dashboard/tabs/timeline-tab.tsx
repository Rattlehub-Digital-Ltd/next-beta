import ShortUniqueId from "short-unique-id";
import { useGetTimeline } from "@/api/services/dashboard/queries";
import { Skeleton } from "@/components/ui/skeleton";
import TimelineItem from "./timeline-item";

const uid = new ShortUniqueId({ length: 10 });

export default function TimelineTab({ referer }: { referer: string }) {
	const { data, isLoading, isError } = useGetTimeline(referer, {
		page: 1,
		limit: 15,
	});

	const items = data?.items;

	return (
		<div className="flex flex-col pt-8 px-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/15">
			{isLoading &&
				Array.from({ length: 5 }).map(() => (
					<LoadingSkeleton key={uid.randomUUID()} />
				))}

			{/** biome-ignore lint/complexity/useOptionalChain: later */}
			{items &&
				items.map((item, index, arr) => (
					<TimelineItem
						key={uid.randomUUID()}
						item={item}
						lastItem={index === arr.length - 1}
					/>
				))}

			{items?.length === 0 && (
				<p className="text-[13px] pb-8 text-muted-foreground">
					You are all caught up for now
				</p>
			)}

			{/* Fetching data error */}
			{isError && (
				<p className="text-[13px] pb-8 text-muted-foreground">
					Error fetching data
				</p>
			)}
		</div>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className=" flex relative -mt-0.5 overflow-hidden">
			<div className="h-full w-8 flex flex-col items-center">
				<div className="relative h-8 w-8 flex items-center justify-center rounded-full shrink-0">
					<Skeleton className="h-full w-full rounded-full bg-[#e6e6e6]" />
				</div>
				<div className="bg-[#e6e6e6] w-0.5 h-full absolute top-6 left-4" />
			</div>

			<div className="px-4 grow flex flex-col space-y-2 pb-6 ">
				<Skeleton className="h-2.5 w-16 rounded-full bg-black/10" />
				<div className="flex items-center gap-2">
					{Array.from({ length: 3 }).map(() => (
						<Skeleton
							key={uid.randomUUID()}
							className="h-4 w-16 rounded-md bg-black/10"
						/>
					))}
				</div>
				<div className="flex flex-col justify-center space-y-1 py-3 px-6 rounded-[10px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 relative shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
					<Skeleton className="h-4 w-12 rounded-md bg-black/10" />
					<Skeleton className="h-3 w-[70%] rounded-full bg-black/10" />
					<Skeleton className="h-2 w-[50%] rounded-md bg-black/10" />
					<Skeleton className="h-2 w-[30%] rounded-md bg-black/10" />

					<div className="absolute top-2 left-1.5 h-full w-0.5 bg-black/10 rounded-full max-h-[80%]" />
				</div>
			</div>
		</div>
	);
};
