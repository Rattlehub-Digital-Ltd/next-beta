"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { useOnboardingStore } from "store/onboarding-store";
import { usePartnerStore } from "store/partner-store";
import { usePersonDrawerStore } from "store/person-drawer-store";
import { Button } from "@/components/ui/button";
import MainSheet from "@/features/shared/main-sheet";
// import type { Person } from "@/types/person";
import CategoryList from "../shared/category-list";
import PersonCard from "../shared/person-card";
// import AddPersonButton from "./add-person-button";
import Options from "./options";

type PersonProps = {
	value: string | null;
	onValueChange: (value: string | null) => void;
	onReset: () => void;
};

const uid = new ShortUniqueId();

const Content = ({ value, onValueChange, onReset }: PersonProps) => {
	const { partner, setPartner } = usePartnerStore();
	const { onOpenChange, setTitle, setType } = usePersonDrawerStore();

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
				{partner && partner?.length > 0 && (
					<div className="py-6 flex flex-col w-full items-center">
						<div className="flex items-center space-x-2 w-full pl-3 py-2">
							<p className="text-sm font-semibold grow text-left">List</p>
							<Button
								className="!no-underline text-red-500"
								type="button"
								size="sm"
								variant="link"
								onClick={onReset}
							>
								<Icon icon="fluent:arrow-reset-20-filled" />
								<span className="text-[12.6px]">Reset</span>
							</Button>
						</div>

						<ul className="w-full flex flex-col space-y-3">
							{partner.map((item) => (
								<li key={uid.randomUUID()}>
									<PersonCard
										type="partner"
										title={`Edit ${item.firstName} ${item.lastName}`}
										firstName={item.firstName}
										lastName={item.lastName}
										relationship={item.relationship}
										imgSrc={item.image}
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
			{value === "yes" && (
				<div className="w-full flex justify-center">
					<motion.div
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, translateY: -60 }}
						animate={{ opacity: 1, translateY: 0 }}
						transition={{ duration: 0.35 }}
					>
						<Button
							className="text-[#0372E3] rounded-full gap-1.5 w-full py-2 pl-2 pr-3 bg-[#0372E3]/8 disabled:opacity-50"
							variant="default"
							type="button"
							size="lg"
							disabled={value === null}
							onClick={() => {
								setTitle("Add Partner");
								setType("partner");
								onOpenChange(true);
							}}
						>
							<Icon
								icon="fluent:add-circle-20-regular"
								style={{ stroke: "#0372E3" }}
							/>
							<span className="text-center text-[13px] font-semibold leading-4 truncate">
								Add Partner
							</span>
						</Button>
					</motion.div>
					{/* <AddPersonButton
						type="partner"
						disabled={
							value === null || (value === "yes" && items?.length === 0)
						}
						label="Add Partner"
					/> */}
				</div>
			)}
		</div>
	);
};

const Partner = () => {
	const { partner, setPartner } = usePartnerStore();
	const { setTitle, onOpenChange, setType } = usePersonDrawerStore();
	const { setNextButtonDisabled } = useOnboardingStore();

	const [has, setHas] = useState<string | null>(null);

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
						onReset={() => {
							setHas(null);
							setPartner(null);
						}}
						onValueChange={(value: string | null) => {
							setHas(value);
							if (value?.toLowerCase() === "yes") {
								setTitle("Add Partner");
								setType("partner");
								onOpenChange(true);
							} else {
								setTitle("Add person");
								setPartner(null);
								setType("unknown");
							}
						}}
					/>
				}
			/>
		</motion.div>
	);
};

export default Partner;
