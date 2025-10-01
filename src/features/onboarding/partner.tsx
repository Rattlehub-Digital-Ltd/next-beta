"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { useOnboardingStore } from "store/use-onboarding-store";
// import { useOnboardingStore } from "store/use-onboarding-store";
import { usePartnerStore } from "store/use-partner-store";
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
	setNextButtonDisabled: (value: boolean) => void;
};

type PartnerProps = {
	scrollNext?: () => void;
};

const uid = new ShortUniqueId();

const Content = ({ value, onValueChange }: PersonProps) => {
	const { partner, setPartner } = usePartnerStore();

	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="text-center px-4 grow"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<TabHeader
					title="Do you have a partner"
					description="The person who you are married to or with whom you enjoy a long-term
					relationship"
					value={value}
					onValueChange={onValueChange}
				/>
				{partner && partner?.length > 0 && (
					<div className="pb-6 flex flex-col w-full items-center space-y-1.5">
						{/* <ListHeader title="Partner" onReset={onReset} /> */}

						<ul className="w-full flex flex-col space-y-3">
							{partner.map((item) => (
								<li key={uid.randomUUID()}>
									<PersonCard
										person={item}
										onDelete={(firstName, lastName, relationship) => {
											const copy = [...(partner ?? [])];
											const index = copy.findIndex(
												(item) =>
													item.firstName === firstName &&
													item.lastName === lastName &&
													item.relationship === relationship,
											);

											copy.splice(index, 1);
											setPartner(copy);
										}}
									/>
								</li>
							))}
						</ul>
					</div>
				)}
			</motion.div>
			{value === "yes" && (!partner || partner?.length === 0) && (
				<div className="w-full flex justify-center pt-8">
					<AddPersonButton disabled={value === null} label="Add Partner" />
				</div>
			)}
		</div>
	);
};

const Partner = ({ scrollNext }: PartnerProps) => {
	const { setNextButtonDisabled } = useOnboardingStore();
	const { has, setHas, setPartner, partner } = usePartnerStore();
	const { setTitle, onOpenChange, setType } = usePersonDrawerStore();

	useEffect(() => {
		if (
			has &&
			partner &&
			partner.length > 0 &&
			partner[0] &&
			partner[0].firstName !== "" &&
			partner[0].lastName !== ""
		) {
			setNextButtonDisabled(false);
		} else if (has === "no") {
			setNextButtonDisabled(false);
		} else {
			setNextButtonDisabled(true);
		}
	}, [partner, setNextButtonDisabled, has]);

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
				imgSrc="/images/partner.png"
				imgAlt="Image of couple walking"
				content={
					<Content
						value={has}
						onReset={() => {
							setHas(null);
							setPartner(null);
						}}
						setNextButtonDisabled={setNextButtonDisabled}
						onValueChange={(value: string | null) => {
							setHas(value);

							if (value !== null) {
								track("submitted_answer", {
									item: "Partner",
									has_item_in_place: value === "yes",
									is_adaptive_card: false,
								});
							}

							if (value?.toLowerCase() === "yes") {
								setTitle("Add Partner");
								setType("partner");
								onOpenChange(true);
							} else {
								setTitle("Add person");
								setPartner(null);
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

export default Partner;
