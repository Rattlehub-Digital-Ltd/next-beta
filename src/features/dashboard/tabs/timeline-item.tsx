import CategoryList from "@/features/shared/category-list";
import UserBadge from "@/features/shared/user-badge";
import { Icon } from "@iconify/react";

type TimelineItemProps = {
	ownerName: string;
};

function TimelineItem({ ownerName }: TimelineItemProps) {
	return (
		<div className=" flex relative -mt-0.5 overflow-hidden">
			<div className="h-full w-8 flex flex-col items-center  z-2">
				<div className="h-8 w-8 text-[#13A10E] bg-white rounded-full">
					<Icon
						icon="fluent:checkmark-circle-32-filled"
						height={32}
						width={32}
					/>
				</div>
				<div className="bg-[#13A10E] w-0.5 h-full absolute top-6 left-4" />
			</div>

			<div className="px-4 grow flex flex-col space-y-2 pb-6 ">
				<div className="flex space-x-2 h-8 items-center text-[#616161]">
					<Icon
						icon="fluent:calendar-checkmark-sparkle-24-filled"
						height={18}
						width={18}
					/>
					<p className="text-[13px] leading-4 font-medium grow truncate">
						2 days ago
					</p>
				</div>
				<CategoryList items={["cost", "protection"]} />
				<div className="flex flex-col justify-center space-y-1 py-3 px-4 rounded-[10px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 relative shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
					<UserBadge name={ownerName} />
					<p className="text-sm font-semibold">Bank Accounts</p>
					<p className="text-xs text-[#616161]">Added bank accounts</p>

					<div className="absolute top-2 left-1.5 h-full w-0.5 bg-indigo-500 rounded-full max-h-[80%]" />
				</div>
			</div>
		</div>
	);
}

export default TimelineItem;
