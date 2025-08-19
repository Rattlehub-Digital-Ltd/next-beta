import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

export default function RiskBar() {
	return (
		<div className="h-10 flex w-full items-center rounded-[12px] space-x-2 border px-2 border-[#EBEDED] bg-[#FDFDFD]/60 backdrop-blur-[20px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]">
			<Icon icon="fluent-color:shield-24" height={24} width={24} />
			<p className="text-[#616161] text-xs leading-4 truncate grow">
				Reduces risk for{" "}
				<span className="font-semibold text-foreground">Bank accounts</span>
			</p>
			<Badge className="text-foreground bg-[#F3F4F6] font-medium">
				+8 others
			</Badge>
		</div>
	);
}
