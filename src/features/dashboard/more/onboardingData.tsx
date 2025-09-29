"use client";

import { Icon } from "@iconify/react";
import ShortUniqueId from "short-unique-id";
import {
	useGetOnboardingData,
	useGetSettings,
} from "@/api/services/dashboard/onboarding/queries";
import EstateChecklistItem from "@/features/onboarding/estate-checklist/estate-checklist-item";
import CardContainer from "@/features/onboarding/summary/card-container";
import PersonCard from "@/features/shared/person-card";

const uid = new ShortUniqueId();

function OnboardingData() {
	const { data, isLoading } = useGetOnboardingData();
	const { data: documents } = useGetSettings();

	if (isLoading) {
		return <div className="text-xs text-muted-foreground">Loading...</div>;
	}

	const { partner, children, dependents } = data || {};

	return (
		<div className="h-full w-full flex flex-col space-y-6 py-4">
			<div className="grow flex flex-col space-y-6 overflow-hidden w-full">
				{partner && (
					<CardContainer
						title="Partner"
						color="indigo"
						icon={
							<Icon
								icon="fluent:person-heart-24-filled"
								height={20}
								width={20}
							/>
						}
						description="The person who you are married to or with whom you enjoy a long-term relationship"
					>
						<div className="flex flex-col space-y-3">
							<PersonCard
								canDelete={false}
								person={{
									firstName: partner.name,
									lastName: partner.surname,
									relationship: "Partner",
								}}
								onDelete={() => console.log("Delete partner")}
							/>
						</div>
					</CardContainer>
				)}
				{children && children.length > 0 && (
					<CardContainer
						title="Children"
						color="dark-teal"
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
									canDelete={false}
									person={{
										firstName: item.name,
										lastName: item.surname,
										relationship: item.relationship || "Child",
									}}
									onDelete={() => console.log("Delete")}
								/>
							))}
						</div>
					</CardContainer>
				)}
				{dependents && dependents.length > 0 && (
					<CardContainer
						title="Dependents"
						color="purple"
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
									canDelete={false}
									person={{
										firstName: item.name,
										lastName: item.surname,
										relationship: item.relationship || "Dependent",
									}}
									onDelete={() => console.log("Delete")}
								/>
							))}
						</div>
					</CardContainer>
				)}
				{documents && documents.length > 0 && (
					<CardContainer
						title="Estate Checklist"
						color="dark-green"
						icon={
							<Icon
								icon="fluent:shield-checkmark-24-filled"
								height={20}
								width={20}
							/>
						}
						description="Get started with your estate planning by completing this checklist."
					>
						<div className="flex flex-col space-y-3">
							{documents.map((item) => (
								<EstateChecklistItem
									key={uid.randomUUID()}
									item={{
										...item,
										isApplicable: item.isApplicable ? "yes" : "no",
									}}
								/>
							))}
						</div>
					</CardContainer>
				)}
			</div>
		</div>
	);
}

export default OnboardingData;
