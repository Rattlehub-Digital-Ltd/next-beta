import { Icon } from "@iconify/react";
import CategoryList from "@/features/shared/category-list";
import UserBadge from "@/features/shared/user-badge";
import { cn } from "@/lib/utils";
import type { Timeline } from "@/types/timeline";
import { format } from "date-fns";

type TimelineItemProps = {
	item: Timeline;
	lastItem?: boolean;
};

function TimelineItem({ item, lastItem = false }: TimelineItemProps) {
	const {
		description,
		displayName,
		ownerDisplayName,
		categories,
		modifiedDate,
	} = item;

	return (
		<div className=" flex relative -mt-0.5 overflow-hidden">
			<div className="h-full w-8 flex flex-col items-center  z-2">
				<div className="h-8 w-8 text-[#13A10E] bg-white rounded-full relative z-2">
					<Icon
						icon="fluent:checkmark-circle-32-filled"
						height={32}
						width={32}
					/>
				</div>
				<div
					className={cn("bg-[#13A10E] w-0.5 h-full absolute top-6 left-4", {
						"bg-[#d1d1d1] h-[70%]": lastItem,
					})}
				/>
			</div>

			<div className="px-4 grow flex flex-col space-y-2 pb-6 ">
				<div className="flex space-x-2 h-8 items-center text-[#424242]">
					<Icon
						icon="fluent:calendar-checkmark-sparkle-24-filled"
						height={18}
						width={18}
					/>
					<p className="text-[13px] leading-4 font-medium grow truncate">
						{format(new Date(modifiedDate), "PPPP")}
					</p>
				</div>
				<CategoryList items={categories.map((c) => c.toLowerCase())} />
				<div className="flex flex-col justify-center space-y-1 py-3 px-6 rounded-[10px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 relative shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
					<UserBadge name={ownerDisplayName} />
					<p className="text-sm font-semibold">{displayName}</p>
					<p className="text-xs text-[#616161]">{description}</p>

					<div className="absolute top-2 left-1.5 h-full w-0.5 bg-indigo-500 rounded-full max-h-[80%]" />
				</div>
			</div>
		</div>
	);
}

export default TimelineItem;
