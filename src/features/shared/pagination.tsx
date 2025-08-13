import { Icon } from "@iconify/react";
import type { Variants } from "motion";
import * as motion from "motion/react-client";
import ShortUniqueId from "short-unique-id";
import { useOnboardingStore } from "store/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPrevious: () => void;
	onNext: () => void;
}

const uid = new ShortUniqueId();

export const itemVariant: Variants = {
	active: {
		width: 16,
	},
	inactive: {
		width: 6,

		transition: {
			type: "inertia",
			ease: "linear",
			// duration: 0.3,
		},
	},
};

function Pagination({
	currentPage,
	totalPages,

	onPrevious,
	onNext,
}: PaginationProps) {
	const { nextButtonDisabled } = useOnboardingStore();

	return (
		<motion.div
			className="bg-[#FDFDFD]/50 border w-full border-[#EBEDED] rounded-full h-11 backdrop-blur-[15px] shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)] flex justify-between px-1.5 items-center"
			initial={{ opacity: 0, translateY: 20, scaleX: 0.9 }}
			animate={{ opacity: 1, translateY: 0, scaleX: 1 }}
			transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
		>
			<motion.div
				whileTap={{ scale: 0.9 }}
				initial={{ opacity: 0, translateX: 20 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.35 }}
			>
				<Button
					className="rounded-full bg-[#EBEBEB] text-[#424242] h-8 w-8 !px-0 !py-0"
					variant="ghost"
					onClick={onPrevious}
				>
					<Icon icon="fluent:arrow-left-24-regular" className="!w-4 !h-4" />
				</Button>
			</motion.div>
			<div className="flex items-center gap-1.5">
				{Array.from({ length: totalPages }, (_, i) => {
					const isActive = i + 1 === currentPage;
					return (
						<motion.div
							key={uid.randomUUID()}
							layout
							initial="inactive"
							animate={isActive ? "active" : "inactive"}
							variants={itemVariant}
							className={cn("bg-[#3C3C43]/30 h-1.5 w-1.5 rounded-full", {
								" bg-blue-600": isActive,
							})}
						/>
					);
				})}
			</div>
			<motion.div
				whileTap={{ scale: 0.9 }}
				initial={{ opacity: 0, translateX: -20 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.35 }}
			>
				<Button
					className="rounded-full bg-blue-600 text-white disabled:bg-[#EBEBEB] disabled:text-[#424242] h-8 w-8 !px-0 !py-0"
					disabled={nextButtonDisabled}
					variant="ghost"
					onClick={onNext}
				>
					<Icon icon="fluent:arrow-right-24-regular" className="!w-4 !h-4" />
				</Button>
			</motion.div>
		</motion.div>
	);
}

export default Pagination;
