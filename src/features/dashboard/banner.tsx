import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/styles/icons";

export default function Banner() {
	return (
		<div className="h-10 flex items-center w-full bg-[#6155F5] text-white pl-4 pr-2 space-x-2  rounded-[16px]">
			<SparkleIcon className="h-4 w-4 shrink-0" />
			<p className="font-medium grow truncate text-[13.6px] tracking-wide">
				Profile <span className="text-yellow-300 font-bold">60%</span> complete
			</p>
			<Button
				className="text-[13px] gap-1 font-semibold bg-white/90 backdrop-blur-md rounded-[10px] text-[#6155F5] h-6"
				size="sm"
				variant="default"
			>
				Personalize
				<Icon
					icon="fluent:chevron-right-16-filled"
					height={14}
					width={14}
					className="-mr-1"
				/>
			</Button>
		</div>
	);
}
