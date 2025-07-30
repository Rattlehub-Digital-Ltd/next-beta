"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

	return (
		<div className="flex items-center justify-around py-4 max-w-screen-lg w-full px-4 mx-auto bg-white/60 border-t border-black/5 backdrop-blur-[15px]">
			{items.map(({ defaultIconSrc, activeIconSrc, label, href }) => {
				const isActive = pathname === href;

				return (
					<Link
						key={label}
						href={href}
						className={cn(
							"relative flex flex-col items-center justify-center w-16 h-full text-[#6B6B6B] space-y-1.5",
							{ "text-blue-600": isActive },
						)}
					>
						<Icon
							icon={isActive ? activeIconSrc : defaultIconSrc}
							width={24}
							height={24}
						/>

						<p
							className={cn(
								"text-[11px] leading-4 tracking-wide",
								isActive ? "font-bold" : "font-medium",
							)}
						>
							{label}
						</p>
					</Link>
				);
			})}
		</div>
	);
}

export default BottomTabBar;
