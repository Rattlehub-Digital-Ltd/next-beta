import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => (
	<div className="w-full h-full bg-[#F8F8F8]/80 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
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
				</div>
			</div>
		</div>
		<div>
			<Skeleton className="h-7 w-full rounded-[10px] bg-black/10" />
		</div>
	</div>
);
