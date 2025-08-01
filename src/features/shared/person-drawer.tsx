"use client";

import { usePersonDrawerStore } from "store/person-drawer-store";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import type { Person, PersonType } from "@/types/person";
import PersonForm from "./person-form";
import ProfilePictureCard from "./profile-picture-card";

type PersonDrawerProps = {
	type: PersonType;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	firstName?: string;
	lastName?: string;
	relationship?: string;
	imgSrc?: string;
	addPerson?: (data: Person) => void;
};

function PersonDrawer({
	firstName = "",
	lastName = "",
	relationship = "",
	imgSrc = "",
	children,
	description,
}: PersonDrawerProps) {
	const { type, title, open, onOpenChange } = usePersonDrawerStore();

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			{children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
			<DrawerContent className="bg-[#ECECEC] !max-h-[95vh]">
				<DrawerHeader className="items-start text-left px-6">
					<DrawerTitle className="text-base font-semibold">{title}</DrawerTitle>
					{description && <DrawerDescription>{description}</DrawerDescription>}
				</DrawerHeader>
				<div className="px-4 pt-4 pb-6">
					<div className="grow w-full h-full bg-[#F6F6F6]/90 border border-black/5 rounded-3xl backdrop-blur-[20px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-8 p-4 flex flex-col">
						<header className="pl-1">
							<h1 className="text-sm font-bold leading-6">Person details</h1>
							<p className="text-xs leading-4 tracking-[0.01px] text-foreground-secondary">
								Add or modify person's person details.
							</p>
						</header>
						<ProfilePictureCard />
						<PersonForm
							type={type}
							firstName={firstName}
							lastName={lastName}
							relationship={relationship}
							imgSrc={imgSrc}
							buttonLabel={title}
							onClose={() => onOpenChange(false)}
						/>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default PersonDrawer;
