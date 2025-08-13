"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActivitySummaryStore } from "store/use-activity-summary-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BottomTabBarItemProps = {
	defaultIconSrc: string;
	activeIconSrc: string;
	label: string;
	href: string;
};

const items: BottomTabBarItemProps[] = [
	{
		defaultIconSrc: "fluent:home-empty-24-regular",
		activeIconSrc: "fluent:home-empty-24-filled",
		label: "Home",
		href: "/dashboard",
	},
	{
		defaultIconSrc: "fluent:leaf-two-24-regular",
		activeIconSrc: "fluent:leaf-two-24-filled",
		label: "Suggestions",
		href: "/dashboard/suggestions",
	},
	{
		defaultIconSrc: "fluent:target-arrow-24-regular",
		activeIconSrc: "fluent:target-arrow-24-filled",
		label: "Goals",
		href: "/dashboard/goals",
	},
	{
		defaultIconSrc: "fluent:data-usage-sparkle-24-regular",
		activeIconSrc: "fluent:data-usage-sparkle-24-filled",
		label: "Overview",
		href: "/dashboard/overview",
	},
	{
		defaultIconSrc: "fluent:more-circle-24-regular",
		activeIconSrc: "fluent:more-circle-24-filled",
		label: "More",
		href: "/dashboard/more",
	},
];

function BottomTabBar() {
	const pathname = usePathname();
	const { activity } = useActivitySummaryStore();

	if (pathname === "/" || pathname.toLowerCase() === "/dashboard/onboarding")
		return;

	return (
		<div className="flex items-center justify-around max-w-screen-lg w-full mx-auto bg-white/60 border-t border-black/5 backdrop-blur-[15px]">
			{items.map(({ defaultIconSrc, activeIconSrc, label, href }) => {
				const isActive = pathname === href;

				return (
					<Link
						key={label}
						href={href}
						className={cn(
							"relative flex flex-col items-center justify-center py-4 w-16 h-full text-[#6B6B6B] space-y-1.5",
							{ "text-blue-600": isActive },
						)}
					>
						<div className="h-6 w-6 shrink-0 relative">
							<Icon
								icon={isActive ? activeIconSrc : defaultIconSrc}
								width={24}
								height={24}
							/>

							{activity && (
								<>
									{label.toLowerCase() === "home" && (
										<div className="absolute top-0 right-0 -mr-2.5 -mt-2">
											<Badge
												className="h-4 min-w-4 text-[10px] rounded-full px-1 font-mono tabular-nums"
												variant="destructive"
											>
												{activity.pending}
											</Badge>
										</div>
									)}

									{label.toLowerCase() === "suggestions" && (
										<div className="absolute top-0 right-0 -mr-2.5 -mt-2">
											<Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums text-[10px] bg-green-600">
												{activity.completed}
											</Badge>
										</div>
									)}
								</>
							)}
						</div>

						<p
							className={cn(
								"text-[11px] leading-4 tracking-wide",
								isActive ? "font-bold" : "font-medium",
							)}
						>
							{label}
						</p>

						{isActive && (
							<div
								className="absolute top-0 w-10 h-1 rounded-b-full bg-blue-600 animate-fade-in"
								aria-hidden="true"
							/>
						)}
					</Link>
				);
			})}
		</div>
	);
}

export default BottomTabBar;
