import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPrevious: () => void;
	onNext: () => void;
}

function Pagination({
	currentPage,
	totalPages,
	onPrevious,
	onNext,
}: PaginationProps) {
	console.log(
		"Pagination component rendered",
		currentPage,
		totalPages,
		onPrevious,
		onNext,
	);
	return (
		<motion.div
			className="bg-[#FDFDFD]/67 border w-full border-[#EBEDED] rounded-full h-11 backdrop-blur-xl shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] flex justify-between px-1.5 items-center"
			initial={{ opacity: 0, translateY: 20, scaleX: 0.9 }}
			animate={{ opacity: 1, translateY: 0, scaleX: 1 }}
			transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
		>
			<motion.div
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, translateX: 20 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.35 }}
			>
				<Button
					className="rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white h-8 w-8 !px-0 !py-0"
					variant="ghost"
				>
					<Icon icon="fluent:arrow-left-24-regular" className="!w-4 !h-4" />
				</Button>
			</motion.div>
			<div className="flex items-center gap-1.5">
				<div className="bg-[#3C3C43] h-1.5 w-4 rounded-full" />
				<div className="bg-[#3C3C43]/30 h-1.5 w-1.5 rounded-full" />
				<div className="bg-[#3C3C43]/30 h-1.5 w-1.5 rounded-full" />
				<div className="bg-[#3C3C43]/30 h-1.5 w-1.5 rounded-full" />
				<div className="bg-[#3C3C43]/30 h-1.5 w-1.5 rounded-full" />
			</div>
			<motion.div
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, translateX: -20 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.35 }}
			>
				<Button
					className="rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white h-8 w-8 !px-0 !py-0"
					variant="ghost"
				>
					<Icon icon="fluent:arrow-right-24-regular" className="!w-4 !h-4" />
				</Button>
			</motion.div>
		</motion.div>
	);
}

export default Pagination;
