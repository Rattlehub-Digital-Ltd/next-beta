"use client";

import * as motion from "motion/react-client";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "store/use-app-store";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/styles/icons";

export default function Banner() {
	const router = useRouter();
	const pathname = usePathname();
	const { isAdmin } = useAppStore();
	const { product } = useAppStore();

	if (
		pathname.toLowerCase() === "/dashboard/onboarding" ||
		!isAdmin ||
		product?.name?.toLowerCase() !== "free"
	)
		return;

	return (
		<div className="h-10 flex items-center w-full bg-gradient-to-br from-blue-600 to-purple-600 text-white pl-4 pr-2 space-x-2  rounded-[16px]">
			<SparkleIcon className="h-4 w-4 shrink-0" />
			<p className="font-medium grow truncate text-[12px] tracking-wide">
				Your trial ends in{" "}
				<span className="text-yellow-300 font-bold">14 days</span>
			</p>

			<motion.div whileTap={{ scale: 0.9 }}>
				<Button
					className="text-[11px] uppercase tracking-wide gap-1 font-bold bg-white/95 backdrop-blur-md rounded-[10px] text-[#6155F5] h-6"
					size="sm"
					variant="default"
					onClick={() => router.push("/dashboard/subscription")}
				>
					{product?.name?.toLowerCase() === "free" ? "Upgrade" : "Subscribe"}
				</Button>
			</motion.div>
		</div>
	);
}
