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
import type { Suggested } from "@/types/suggested";
import DrawerTabsCard from "./drawer-tabs-card";

type SuggestedItemDrawerProps = {
	children: React.ReactNode;
	item: Suggested;
};

export default function SuggesteItemDrawer({
	children,
	item,
}: SuggestedItemDrawerProps) {
	const { suggestedFor, displayName, eduText } = item;

	const people: string[] = [];
	suggestedFor.forEach((item) => {
		item.affectedOwners.forEach((owner) => {
			if (!people.includes(owner)) people.push(owner);
		});
	});

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-[#ECECEC] h-[85vh]">
				<DrawerHeader className="text-left items-start px-6 gap-0">
					<DrawerTitle className="text-sm font-semibold">
						{displayName}
					</DrawerTitle>
					<DrawerDescription className="text-xs line-clamp-2 text-left">
						{eduText}
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4 overflow-y-auto">
					<DrawerTabsCard item={item} />
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button className="rounded-full" variant="outline">
							Close
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
