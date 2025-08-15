"use client";

import { Icon } from "@iconify/react";
import ShortUniqueId from "short-unique-id";
import { useChildrenStore } from "store/use-children-store";
import { useDependentStore } from "store/use-dependent-store";
import { usePartnerStore } from "store/use-partner-store";
import PersonCard from "@/features/shared/person-card";
import CardContainer from "./card-container";

const uid = new ShortUniqueId();

export default function Summary() {
	const { partner } = usePartnerStore();
	const { children } = useChildrenStore();
	const { dependents } = useDependentStore();

	const partnerData = partner?.[0];

	return (
		<div className="h-full w-full flex flex-col space-y-6 py-4">
			<header className="space-y-1 px-4">
				<h1 className="text-lg font-bold">Summary</h1>
				<p className="text-sm leading-5 text-[#616161] text-pretty">
					A summary of all the details you have provided. Please carefully
					review for any mistakes or inconsistencies.
				</p>
			</header>
			<div className="grow flex flex-col space-y-6 overflow-hidden w-full">
				{partnerData && (
					<CardContainer
						title="Partner"
						icon={
							<Icon
								icon="fluent:person-heart-24-filled"
								height={20}
								width={20}
							/>
						}
						description="The person who you are married to or with whom you enjoy a long-term
					relationship"
					>
						<div className="flex flex-col space-y-3">
							<PersonCard
								person={partnerData}
								onDelete={() => console.log("Delete partner")}
							/>
						</div>
					</CardContainer>
				)}
				{children && children.length > 0 && (
					<CardContainer
						title="Children"
						icon={
							<Icon
								icon="fluent:animal-paw-print-20-filled"
								height={20}
								width={20}
							/>
						}
						description="Your legally recognized biological or adopted children under your care."
					>
						<div className="flex flex-col space-y-3">
							{children.map((item) => (
								<PersonCard
									key={uid.randomUUID()}
									person={item}
									onDelete={() => console.log("Delete")}
								/>
							))}
						</div>
					</CardContainer>
				)}
				{dependents && dependents.length > 0 && (
					<CardContainer
						title="Dependents"
						icon={
							<Icon
								icon="fluent:people-community-24-filled"
								height={20}
								width={20}
							/>
						}
						description="Individuals who rely on yourself for financial support, excluding your
					spouse and children."
					>
						<div className="flex flex-col space-y-3">
							{dependents.map((item) => (
								<PersonCard
									key={uid.randomUUID()}
									person={item}
									onDelete={() => console.log("Delete")}
								/>
							))}
						</div>
					</CardContainer>
				)}
			</div>
		</div>
	);
}
