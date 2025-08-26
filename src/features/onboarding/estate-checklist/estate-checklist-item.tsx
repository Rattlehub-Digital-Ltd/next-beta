import { Icon } from "@iconify/react";
import type { EstateChecklistItem as itemType } from "@/api/services/dashboard/onboarding/types";

type EstateChecklistItemProps = {
	item: itemType;
};

export default function EstateChecklistItem({
	item,
}: EstateChecklistItemProps) {
	return (
		<div className="flex items-center grow w-full justify-between font-medium text-left">
			<div className="flex grow items-center gap-1.5 text-[#6b6b6b]">
				<Icon icon="fluent-color:shield-24" className="h-5 w-5" />
				<span className="text-[13px] text-neutral-700 grow truncate">
					{item.displayName}
				</span>
			</div>
			{item.isApplicable !== null && (
				<div className="font-normal text-xs flex items-center gap-2 text-neutral-600 capitalize">
					{item.isApplicable === "no" && (
						<Icon icon="fluent-color:dismiss-circle-20" className="h-6 w-6" />
					)}
					{item.isApplicable === "yes" && (
						<Icon icon="fluent-color:checkmark-circle-20" className="h-6 w-6" />
					)}
					{item.isApplicable}
				</div>
			)}
		</div>
	);
}
