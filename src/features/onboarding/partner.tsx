"use client";

import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "store/onboarding-store";
import { usePersonDrawerStore } from "store/person-drawer-store";
import { Button } from "@/components/ui/button";
import MainSheet from "@/features/shared/main-sheet";
import type { Person } from "@/types/person";
import CategoryList from "../shared/category-list";
import PersonCard from "../shared/person-card";
import AddPersonButton from "./add-person-button";
import Options from "./options";

type PersonProps = {
	value: string | null;
	items: Person[] | null;
	onValueChange: (value: string | null) => void;
	onReset: () => void;
};

const Content = ({ value, items, onValueChange }: PersonProps) => {
	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="text-center px-4 grow"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<h2 className="text-base font-medium">Do you have a partner</h2>
				<p className="text-muted-foreground text-sm text-pretty">
					The person who you are married to or with whom you enjoy a long-term
					relationship
				</p>
				{value === "no" || value === null ? (
					<div className="py-6">
						<Options value={value} onValueChange={onValueChange} />
					</div>
				) : null}
				<div className="py-6 flex flex-col w-full items-center">
					<div className="flex items-center space-x-2 w-full pl-3 py-2">
						<p className="text-sm font-semibold grow text-left">List</p>
						<Button
							className="!no-underline text-red-500"
							type="button"
							size="sm"
							variant="link"
						>
							Reset
						</Button>
					</div>
					<PersonCard
						title="Edit Halle Berry (Wife)"
						firstName="Halle"
						lastName="Berry"
						relationship="Wife"
						imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
						onDelete={() => console.log("Delete partner")}
					/>
				</div>
			</motion.div>
			{value === "yes" && (
				<div className="w-full flex justify-center">
					<AddPersonButton
						disabled={
							value === null || (value === "yes" && items?.length === 0)
						}
						label="Add Partner"
					/>
				</div>
			)}
		</div>
	);
};

const Partner = () => {
	const { setTitle, onOpenChange } = usePersonDrawerStore();
	const { setNextButtonDisabled } = useOnboardingStore();

	const [has, setHas] = useState<string | null>(null);
	const [partner, setPartner] = useState<Person[] | null>(null);

	useEffect(() => {
		setNextButtonDisabled(
			has === null || (has === "yes" && partner?.length === 0),
		);
	}, [has, partner?.length, setNextButtonDisabled]);

	return (
		<motion.div
			className="h-full w-full flex flex-col grow"
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
				imgSrc="/images/partner.png"
				imgAlt="Image of couple walking"
				content={
					<Content
						value={has}
						items={partner}
						onReset={() => {
							setHas(null);
							setPartner(null);
						}}
						onValueChange={(value: string | null) => {
							setHas(value);
							if (value === "yes") {
								setTitle("Add Partner");
								onOpenChange(true);
							} else {
								setPartner(null);
							}
						}}
					/>
				}
			/>
		</motion.div>
	);
};

export default Partner;
