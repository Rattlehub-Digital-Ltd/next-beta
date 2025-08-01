import { Icon } from "@iconify/react";
import PersonCard from "@/features/shared/person-card";
import CardContainer from "./card-container";

export default function Summary() {
	return (
		<div className="h-full w-full flex flex-col">
			<header className="space-y-1 px-6">
				<h1 className="text-lg font-bold">Summary</h1>
				<p className="text-sm leading-5 text-[#616161] text-pretty">
					A summary of all the details you have provided. Please carefully
					review for any mistakes or inconsistencies.
				</p>
			</header>
			<div className="grow flex flex-col space-y-6 overflow-hidden w-full px-4">
				<CardContainer
					title="Partner"
					icon={
						<Icon icon="fluent:person-heart-24-filled" height={20} width={20} />
					}
					description="The person who you are married to or with whom you enjoy a long-term
					relationship"
				>
					<div className="flex flex-col space-y-3">
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
					</div>
				</CardContainer>
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
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
					</div>
				</CardContainer>
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
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
						<PersonCard
							type="partner"
							title="Edit Halle Berry"
							firstName="Halle"
							lastName="Berry"
							relationship="Wife"
							imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
							onDelete={() => console.log("Delete partner")}
						/>
					</div>
				</CardContainer>
			</div>
		</div>
	);
}
