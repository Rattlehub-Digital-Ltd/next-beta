"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { useChildrenStore } from "store/use-children-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { usePersonDrawerStore } from "store/use-person-drawer-store";
import MainSheet from "@/features/shared/main-sheet";
import CategoryList from "../shared/category-list";
import PersonCard from "../shared/person-card";
import AddPersonButton from "./add-person-button";
import ListHeader from "./list-header";
import TabHeader from "./tab-header";

type PersonProps = {
	value: string | null;
	onValueChange: (value: string | null) => void;
	onReset: () => void;
};

const uid = new ShortUniqueId();

const Content = ({ value, onValueChange, onReset }: PersonProps) => {
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
					<div className="py-6 flex flex-col w-full items-center">
						<ListHeader title="Children" onReset={onReset} />

						<ul className="w-full flex flex-col space-y-3">
							{children.map((item) => (
								<li key={uid.randomUUID()}>
									<PersonCard
										type="partner"
										title={`Edit ${item.firstName} ${item.lastName}`}
										firstName={item.firstName}
										lastName={item.lastName}
										relationship={item.relationship}
										imgSrc={item.image}
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
				<div className="w-full flex justify-center">
					<AddPersonButton
						type="child"
						disabled={value === null}
						label="Add Child"
					/>
				</div>
			)}
		</div>
	);
};

const Children = () => {
	const { has, setHas, children, setChildren } = useChildrenStore();
	const { setTitle, onOpenChange, setType } = usePersonDrawerStore();
	const { setNextButtonDisabled } = useOnboardingStore();

	useEffect(() => {
		setNextButtonDisabled(
			has === null || (has === "yes" && children?.length === 0),
		);
	}, [has, children?.length, setNextButtonDisabled]);

	return (
		<motion.div
			className="h-full w-full flex flex-col"
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
							if (value?.toLowerCase() === "yes") {
								setTitle("Add Child");
								setType("child");
								onOpenChange(true);
							} else {
								setTitle("Add person");
								setChildren(null);
								setType("unknown");
							}
						}}
					/>
				}
			/>
		</motion.div>
	);
};

export default Children;
