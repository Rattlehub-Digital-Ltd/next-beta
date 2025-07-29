import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
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
};

function PersonDrawer({
	children,
	description,
	title = "Add person",
}: PersonDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-[#ECECEC]">
				<DrawerHeader className="items-start text-left">
					<DrawerTitle className="text-base font-semibold">{title}</DrawerTitle>
					{description && <DrawerDescription>{description}</DrawerDescription>}
				</DrawerHeader>
				<div className="p-4 ">
					<div className="grow w-full h-full bg-[#F6F6F6]/90 stroke-1 stroke-black/5 rounded-3xl backdrop-blur-[20px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-3 p-4 flex flex-col">
						<header>
							<h1 className="text-sm font-bold leading-6">
								Profile Information
							</h1>
							<p className="text-xs leading-4 tracking-[0.01px] text-foreground-secondary">
								Update your profile details and profile picture
							</p>
						</header>
						<ProfilePictureCard />
						<PersonForm />
					</div>
				</div>
				<DrawerFooter className="grid grid-cols-2 gap-2">
					<Button>Save</Button>
					<DrawerClose asChild>
						<Button className="w-full" variant="outline">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export default PersonDrawer;
