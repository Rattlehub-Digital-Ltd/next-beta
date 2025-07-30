import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RiskBar from "../shared/risk-bar";
import SuggestionItem from "../shared/suggestion-item";

function SummaryCard() {
	return (
		<div className="w-full h-full bg-[#F8F8F8]/95 py-4 stroke-1 stroke-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			<div className="px-2 grid grid-cols-2">
				<div className="flex items-center space-x-2">
					<Image
						src="/shapes/shape-complete.svg"
						alt="Incomplete items"
						height={48}
						width={48}
					/>
					<div>
						<p className="text-base font-bold font-mono leading-5">10</p>
						<p className="text-[0.65rem] uppercase font-medium font-mono tracking-[0.92px] text-[#616161]">
							Complete
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Image
						src="/shapes/shape-incomplete.svg"
						alt="Incomplete items"
						height={48}
						width={48}
					/>
					<div>
						<p className="text-base font-bold font-mono leading-5">72</p>
						<p className="text-[0.65rem] uppercase font-medium font-mono tracking-[0.92px] text-[#616161]">
							Issues
						</p>
					</div>
				</div>
			</div>
			<Separator className="bg-black/5 px-4" />
			<div className="space-y-3">
				<div className="flex flex-col space-y-1 items-center">
					<Badge className="uppercase text-[10px] px-2.5 py-1 rounded-full tracking-wider font-bold text-white bg-gradient-to-br from-[#EF060F] to-[#B60CF2]">
						Top suggestion
					</Badge>
					<Link
						href="/suggestions"
						className="p-3 flex items-center space-x-1.5 text-xs font-semibold text-blue-600 no-underline"
					>
						See all suggestions
						<Icon
							icon="fluent:chevron-right-12-filled"
							className="-mb-0.5"
							height={14}
							width={14}
						/>
					</Link>
				</div>
				<div className="px-4">
					<SuggestionItem
						title="Medical Policy Document"
						description={`A legal contract between the insurer and the policyholder, detailing coverage, terms, conditions, premiums, and the responsibilities of both parties`}
						showReminder={true}
					/>
				</div>
				<div className="px-4">
					<RiskBar />
				</div>
			</div>
			<Separator className="bg-black/5 px-4" />
			<div className="px-4 space-y-6">
				<p className="text-xs font-medium">
					Do you have a <strong>Medical Policy Document</strong> in place?
				</p>
				<div className="grid grid-cols-2 gap-2">
					<motion.div className="w-full" whileTap={{ scale: 0.9 }}>
						<Button className="w-full rounded-2xl bg-blue-600 hover:bg-blue-600 active:bg-blue-700 px-6">
							Yes, I do
						</Button>
					</motion.div>
					<motion.div className="w-full" whileTap={{ scale: 0.9 }}>
						<Button className="px-6 rounded-2xl w-full" variant="outline">
							No
						</Button>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default SummaryCard;
