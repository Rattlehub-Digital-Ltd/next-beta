import { Icon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"flex items-center gap-[3px] rounded-full py-[3px] pl-1 pr-2 text-[10px] leading-4 tracking-[0.1px] uppercase font-bold",
	{
		variants: {
			variant: {
				cost: "bg-category-badge-cost-background text-category-badge-cost-foreground",
				delay:
					"bg-category-badge-delay-background text-category-badge-delay-foreground",
				protection:
					"bg-category-badge-protection-background text-category-badge-protection-foreground",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
	},
);

function CategoryBadge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const iconClass = "h-4 w-4 shrink-0";
	let icon: React.ReactNode = null;
	let title: string = "";

	switch (variant) {
		case "cost":
			icon = (
				<Icon icon="fluent:person-money-20-filled" className={iconClass} />
			);
			title = "Cost";
			break;
		case "delay":
			icon = (
				<Icon icon="fluent:person-clock-20-filled" className={iconClass} />
			);
			title = "Delay";
			break;
		case "protection":
			icon = (
				<Icon icon="fluent:person-shield-20-filled" className={iconClass} />
			);
			title = "Protection";
			break;
		default:
			break;
	}

	return (
		<div
			data-slot="category badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		>
			<div>{icon}</div>
			<span>{title}</span>
		</div>
	);
}

export { CategoryBadge, badgeVariants };
