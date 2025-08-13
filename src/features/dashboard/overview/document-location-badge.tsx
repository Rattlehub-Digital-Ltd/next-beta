import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";

type DocumentLocationBadgeProps = {
	label: string;
	count: number;
};

export default function DocumentLocationBadge({
	label,
	count,
}: DocumentLocationBadgeProps) {
	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			className="text-[#374151] rounded-[8px] h-8 flex items-center space-x-1 px-1.5 bg-[#FDFDFD]/60 border border-[#EBEDED] backdrop-blur-[25px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]"
		>
			<Icon
				icon="fluent:lock-shield-24-regular"
				height={18}
				width={18}
				className="shrink-0"
			/>
			<p className="text-xs font-medium grow truncate">{label}</p>
			<div className="flex items-center h-4.5">
				<div className="bg-[#F0F0F0] px-1.5 font-mono font-semibold text-[11px] py-px rounded-[6px]">
					{count}
				</div>
			</div>
			<Icon
				icon="fluent:chevron-right-16-filled"
				height={14}
				width={14}
				className="shrink-0"
			/>
		</motion.div>
	);
}
