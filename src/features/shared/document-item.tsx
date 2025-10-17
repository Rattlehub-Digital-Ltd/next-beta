import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { Document } from "@/types/document";
import DocumentLocationBadge from "../dashboard/overview/document-location-badge";

type DocumentItemProps = {
	item: Document;
	className: string;
	color: string;
	count?: number;
	location?: string;
};

export default function DocumentItem({
	className,
	color = "#00C7BE",
	item,
	count,
	location,
}: DocumentItemProps) {
	const { displayName, affectedOwner, isApplicable } = item;

	return (
		<div
			className={cn(
				"text-[#374151] rounded-[14px] w-full flex flex-col space-y-1 p-3 bg-white/50 border border-[#EBEDED] backdrop-blur-[25px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]",
				{ "bg-[#ECFDF5]/75 ring-2 ring-[#00C7BE]/80": isApplicable },
				className,
			)}
		>
			<div className="flex items-center space-x-1">
				{/* <Icon
					icon="fluent:shield-checkmark-24-filled"
					height={18}
					width={18}
					className="shrink-0"
				/> */}
				<p className="grow truncate text-xs text-left">{affectedOwner}</p>
				<div>
					{!isApplicable && (
						<Icon
							icon="fluent:chevron-right-16-filled"
							height={14}
							width={14}
							className="shrink-0"
						/>
					)}

					{isApplicable && (
						<div style={{ color }}>
							<Icon
								icon="fluent:checkmark-circle-24-filled"
								height={16}
								width={16}
								className="shrink-0"
							/>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col w-full space-y-1.5 mt-2 text-left">
				<p className="text-xs font-semibold truncate text-left">
					{displayName}
				</p>
				{location && <DocumentLocationBadge label={location} count={count} />}
			</div>
		</div>
	);
}
