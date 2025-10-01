"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { useDependentStore } from "store/use-dependent-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { usePersonDrawerStore } from "store/use-person-drawer-store";
import MainSheet from "@/features/shared/main-sheet";
import { track } from "@/lib/analytics";
import CategoryList from "../shared/category-list";
import PersonCard from "../shared/person-card";
import AddPersonButton from "./add-person-button";
// import ListHeader from "./list-header";
import TabHeader from "./tab-header";

type PersonProps = {
	value: string | null;
	onValueChange: (value: string | null) => void;
	onReset: () => void;
};

type DependentsProps = {
	scrollNext?: () => void;
};

const uid = new ShortUniqueId();

const Content = ({ value, onValueChange }: PersonProps) => {
	const { dependents, setDependents } = useDependentStore();

	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="text-center px-4 grow"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<TabHeader
					title="Do you have dependents"
					description="Individuals who rely on yourself for financial support, excluding your
					spouse and children."
					value={value}
					onValueChange={onValueChange}
				/>
				{dependents && dependents?.length > 0 && (
					<div className="pb-6 flex flex-col w-full items-center space-y-1.5">
						{/* <ListHeader title="Dependents" onReset={onReset} /> */}

						<ul className="w-full flex flex-col space-y-3">
							{dependents.map((item) => (
								<li key={uid.randomUUID()}>
									<PersonCard
										person={item}
										onDelete={(firstName, lastName, relationship) => {
											const copy = [...(dependents ?? [])];
											const index = copy.findIndex(
												(item) =>
													item.firstName === firstName &&
													item.lastName === lastName &&
													item.relationship === relationship,
											);

											copy.splice(index, 1);
											setDependents(copy);
										}}
									/>
								</li>
							))}
						</ul>
					</div>
				)}
			</motion.div>
			{value === "yes" && (
				<div className="w-full flex justify-center pt-8">
					<AddPersonButton disabled={value === null} label="Add Dependent" />
				</div>
			)}
		</div>
	);
};

const Dependents = ({ scrollNext }: DependentsProps) => {
	const { has, setHas, setDependents, dependents } = useDependentStore();
	const { setTitle, onOpenChange, setType } = usePersonDrawerStore();
	const { setNextButtonDisabled } = useOnboardingStore();

	useEffect(() => {
		if (
			has === "yes" &&
			dependents &&
			dependents.length > 0 &&
			dependents.filter(
				(c) => c.firstName === "" || c.lastName === "" || c.relationship === "",
			).length === 0
		) {
			setNextButtonDisabled(false);
		} else if (has === "no") {
			setNextButtonDisabled(false);
		} else {
			setNextButtonDisabled(true);
		}
	}, [setNextButtonDisabled, has, dependents]);

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
			<div className="mb-3 px-3">
				<CategoryList items={["protection", "delay", "cost"]} />
			</div>
			<MainSheet
				imgSrc="/images/dependents.png"
				imgAlt="Child with bird Image"
				content={
					<Content
						value={has}
						onReset={() => {
							setHas(null);
							setDependents(null);
						}}
						onValueChange={(value: string | null) => {
							setHas(value);

							if (value !== null) {
								track("submitted_answer", {
									item: "Dependents",
									has_item_in_place: value === "yes",
									is_adaptive_card: false,
								});
							}

							if (value?.toLowerCase() === "yes") {
								setTitle("Add Dependent");
								setType("dependent");
								onOpenChange(true);
							} else {
								setTitle("Add person");
								setDependents(null);
								setType("unknown");
								scrollNext?.();
							}
						}}
					/>
				}
			/>
		</motion.div>
	);
};

export default Dependents;
