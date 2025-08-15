"use client";

import { usePersonDrawerStore } from "store/use-person-drawer-store";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import type { Person } from "@/types/person";
import PersonForm from "./person-form";
import ProfilePictureCard from "./profile-picture-card";

type PersonDrawerProps = {
	description?: string;
	children?: React.ReactNode;
	person?: Person;
};

function PersonDrawer({ person, children, description }: PersonDrawerProps) {
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
								Add or modify a person's details.
							</p>
						</header>
						<ProfilePictureCard />
						<PersonForm
							type={type}
							person={person}
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
