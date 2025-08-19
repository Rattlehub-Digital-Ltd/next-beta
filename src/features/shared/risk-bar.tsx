import { Icon } from "@iconify/react";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { Badge } from "@/components/ui/badge";

type RiskBarProps = {
	data: Suggested;
};

export default function RiskBar({ data }: RiskBarProps) {
	let count = data.suggestedFor.length;

	if (Number(count) > 9) count = 9; // Limit to 9 for display

	const first = data.suggestedFor[0];
	const firstOwner = first.affectedOwners[0];

	return (
		<div className="h-10 flex w-full items-center rounded-[12px] space-x-2 border px-2 border-[#EBEDED] bg-[#FDFDFD]/60 backdrop-blur-[20px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]">
			<Icon icon="fluent-color:shield-24" height={24} width={24} />
			<p className="text-[#616161] text-xs leading-4 truncate grow text-left">
				Reduces risk for{" "}
				<span className="font-semibold text-foreground">{firstOwner}</span>
			</p>
			<Badge className="text-foreground bg-[#F3F4F6] font-medium">
				{count > 9 ? "+9 more" : `+${count - 1} more`}
			</Badge>
		</div>
	);
}
