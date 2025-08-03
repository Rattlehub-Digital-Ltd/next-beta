import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"flex items-center no-wrap rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				success: "bg-green-500 text-white hover:bg-green-600",
				warning: "bg-yellow-500 text-white hover:bg-yellow-600",
				info: "bg-blue-500 text-white hover:bg-blue-600",
				purple: "bg-purple-500 text-white hover:bg-purple-600",
				gradient: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
			},
			size: {
				default: "text-xs",
				sm: "text-[0.6rem]",
				lg: "text-sm px-3 py-0.5",
			},
			animation: {
				none: "",
				pulse: "animate-pulse",
				bounce: "animate-bounce",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			animation: "none",
		},
	},
);

export interface ComingSoonBadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export function ComingSoonBadge({
	className,
	variant,
	size,
	animation,
	...props
}: ComingSoonBadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant, size, animation }), className)}
			{...props}
		>
			Coming Soon
		</div>
	);
}
