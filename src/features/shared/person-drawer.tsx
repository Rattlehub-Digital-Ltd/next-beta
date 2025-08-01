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
import PersonForm from "./person-form";
import ProfilePictureCard from "./profile-picture-card";

type PersonDrawerProps = {
	title?: string;
	description?: string;
	children: React.ReactNode;
	firstName?: string;
	lastName?: string;
	relationship?: string;
	imgSrc?: string;
};

function PersonDrawer({
	firstName = "",
	lastName = "",
	relationship = "",
	imgSrc = "",
	children,
	description,
}: PersonDrawerProps) {
	const { title, open, onOpenChange } = usePersonDrawerStore();

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-[#ECECEC]">
				<DrawerHeader className="items-start text-left px-6">
					<DrawerTitle className="text-base font-semibold">{title}</DrawerTitle>
					{description && <DrawerDescription>{description}</DrawerDescription>}
				</DrawerHeader>
				<div className="p-4">
					<div className="grow w-full h-full bg-[#F6F6F6]/90 border border-black/5 rounded-3xl backdrop-blur-[20px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-8 p-4 flex flex-col">
						<header>
							<h1 className="text-sm font-bold leading-6">
								Profile Information
							</h1>
							<p className="text-xs leading-4 tracking-[0.01px] text-foreground-secondary">
								Add/Update person details and/or profile picture
							</p>
						</header>
						<ProfilePictureCard />
						<PersonForm
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
