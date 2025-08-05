"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/styles/icons";

export default function Banner() {
	const pathname = usePathname();

	if (pathname.toLowerCase() === "/dashboard/onboarding") return;

	return (
		<div className="h-10 flex items-center w-full bg-[#6155F5] text-white pl-4 pr-2 space-x-2  rounded-[16px]">
			<SparkleIcon className="h-4 w-4 shrink-0" />
			<p className="font-medium grow truncate text-[12px] tracking-wide">
				Try Premium{" "}
				<span className="text-yellow-300 font-bold">14 days free trial</span>
			</p>
			<Button
				className="text-xs gap-1 font-bold bg-white/95 backdrop-blur-md rounded-[10px] text-[#6155F5] h-6"
				size="sm"
				variant="default"
			>
				Get
			</Button>
		</div>
	);
}
