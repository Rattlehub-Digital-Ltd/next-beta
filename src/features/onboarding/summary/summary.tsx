"use client";

import { Icon } from "@iconify/react";
import ShortUniqueId from "short-unique-id";
import { useChildrenStore } from "store/use-children-store";
import { useDependentStore } from "store/use-dependent-store";
import { useDocumentStore } from "store/use-document-store";
import { usePartnerStore } from "store/use-partner-store";
import PersonCard from "@/features/shared/person-card";
import EstateChecklistItem from "../estate-checklist/estate-checklist-item";
import CardContainer from "./card-container";

const uid = new ShortUniqueId();

export default function Summary() {
	const { partner } = usePartnerStore();
	const { children } = useChildrenStore();
	const { dependents } = useDependentStore();
	const { documents } = useDocumentStore();

	const partnerData = partner?.[0];

	return (
		<div className="h-full w-full flex flex-col space-y-6 py-4">
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
				{documents && documents.length > 0 && (
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
							{documents.map((item) => (
								<EstateChecklistItem key={uid.randomUUID()} item={item} />
							))}
						</div>
					</CardContainer>
				)}
			</div>
		</div>
	);
}
