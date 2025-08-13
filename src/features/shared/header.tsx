"use client";

import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

type HeaderProps = {
	title: string;
	description: string;
	className?: string;
	content?: React.ReactNode;
};

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3, // Adjust the delay as needed
			delayChildren: 0.05,
		},
	},
};

const item = {
	hidden: { opacity: 0, x: 6 },
	show: { opacity: 1, x: 0 },
};

function Header({ title, description, className, content }: HeaderProps) {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			transition={{
				type: "spring",
				ease: "easeInOut",
				bounce: 0.5,
				duration: 0.3,
			}}
			className={cn("space-y-1 px-3", className)}
		>
			<motion.h1 variants={item} className="text-xl font-extrabold">
				{title}
			</motion.h1>
			<motion.p
				variants={item}
				className="text-sm text-pretty leading-5 text-[#616161]"
			>
				{description}
			</motion.p>
			<motion.div variants={item}>{content}</motion.div>
		</motion.div>
	);
}

export default Header;
