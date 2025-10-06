"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { useOnboardingStore } from "store/use-onboarding-store";
import MainSheet from "../shared/main-sheet";
import RiskItem from "../shared/risk-item";

const uid = new ShortUniqueId();

const Content = () => {
	return (
		<div className="h-full flex flex-col w-full pb-2">
			<motion.div
				className="text-center px-4 grow space-y-4"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<div className="space-y-2 text-left">
					<h1 className="text-sm font-medium text-pretty flex-grow">
						About Categories
					</h1>
					<p className="text-[0.8rem] leading-5 tracking-wide text-gray-500 text-pretty">
						Understanding these categories, you can efficiently manage your
						documents and information, providing peace of mind for you and your
						loved ones.
					</p>
				</div>
				<ul className="space-y-6">
					{items.map(({ category, goalName, eduText }) => (
						<li key={uid.randomUUID()}>
							<RiskItem
								category={category}
								goalName={goalName}
								eduText={eduText}
							/>
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	);
};

function Intro() {
	const { setNextButtonDisabled } = useOnboardingStore();

	useEffect(() => {
		setNextButtonDisabled(false);
	}, [setNextButtonDisabled]);

	return (
		<motion.div
			className="w-full flex flex-col"
			initial={{ opacity: 0, scale: 0.7, translateY: 20 }}
			animate={{ opacity: 1, scale: 1, translateY: 0 }}
			transition={{
				duration: 0.3,
				scale: {
					type: "spring",
					ease: "easeInOut",
					visualDuration: 0.26,
					bounce: 0.25,
				},
			}}
		>
			<MainSheet imgSrc="" imgAlt="" content={<Content />} />
		</motion.div>
	);
}

export default Intro;

const items: {
	category: string;
	eduText: string;
	goalName: string;
}[] = [
	{
		category: "protection",
		eduText: `These are the most important documents and information that safeguard your family's future and clearly outline your personal wishes. Proper management is crucial to ensure everything is in order when needed.`,
		goalName: "",
	},
	{
		category: "Delay",
		eduText: `Missing or improperly stored documents in this category can lead to significant delays. Ensuring these are correctly managed will save time and prevent unnecessary stress during critical moments.`,
		goalName: "",
	},
	{
		category: "Cost",
		eduText: `Incorrectly recorded or missing information here can lead to increased costs for your family. Proper documentation is essential to avoid financial strain and ensure smooth processing of necessary tasks.`,
		goalName: "",
	},
];
