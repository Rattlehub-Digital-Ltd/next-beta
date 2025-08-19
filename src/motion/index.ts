import type { Variants } from "motion";

export const cardVariants: Variants = {
	offscreen: {
		y: 0.85,
		scale: 0.9,
		opacity: 0.6,
	},
	onscreen: {
		y: 0,
		scale: 1,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.8,
		},
	},
};
