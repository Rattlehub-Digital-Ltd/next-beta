"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { useChildrenStore } from "store/use-children-store";
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

type ChildrenProps = {
	scrollNext?: () => void;
};

const uid = new ShortUniqueId();

const Content = ({ value, onValueChange }: PersonProps) => {
	const { children, setChildren } = useChildrenStore();

	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="text-center px-4 grow"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<TabHeader
					title="Do you have children"
					description="Your legally recognized biological or adopted children under your care."
					value={value}
					onValueChange={onValueChange}
				/>
				{children && children?.length > 0 && (
					<div className="pb-6 flex flex-col w-full items-center space-y-1.5">
						{/* <ListHeader title="Children" onReset={onReset} /> */}

						<ul className="w-full flex flex-col space-y-3">
							{children.map((item) => (
								<li key={uid.randomUUID()}>
									<PersonCard
										person={item}
										onDelete={(firstName, lastName, relationship) => {
											const copy = [...(children ?? [])];
											const index = copy.findIndex(
												(item) =>
													item.firstName === firstName &&
													item.lastName === lastName &&
													item.relationship === relationship,
											);

											copy.splice(index, 1);
											setChildren(copy);
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
					<AddPersonButton disabled={value === null} label="Add Child" />
				</div>
			)}
		</div>
	);
};

const Children = ({ scrollNext }: ChildrenProps) => {
	const { has, setHas, setChildren, children } = useChildrenStore();
	const { setTitle, onOpenChange, setType } = usePersonDrawerStore();
	const { setNextButtonDisabled } = useOnboardingStore();

	console.log(has, children);

	useEffect(() => {
		if (
			has &&
			children &&
			children?.length > 0 &&
			children.filter(
				(c) => c.firstName === "" || c.lastName === "" || c.relationship === "",
			).length === 0
		) {
			setNextButtonDisabled(false);
		} else if (has === "no") {
			setNextButtonDisabled(false);
		} else {
			setNextButtonDisabled(true);
		}
	}, [children, setNextButtonDisabled, has]);

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
				<CategoryList items={["cost", "protection", "delay"]} />
			</div>
			<MainSheet
				imgSrc="/images/children.png"
				imgAlt="Child with bird Image"
				content={
					<Content
						value={has}
						onReset={() => {
							setHas(null);
							setChildren(null);
						}}
						onValueChange={(value: string | null) => {
							setHas(value);

							if (value !== null) {
								track("submitted_answer", {
									item: "Children",
									has_item_in_place: value === "yes",
									is_adaptive_card: false,
								});
							}

							if (value?.toLowerCase() === "yes") {
								setTitle("Add Child");
								setType("child");
								onOpenChange(true);
							} else {
								setTitle("Add person");
								setChildren(null);
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

export default Children;
