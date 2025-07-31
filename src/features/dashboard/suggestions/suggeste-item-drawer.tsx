import { Icon } from "@iconify/react";
import ShortUniqueId from "short-unique-id";
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
import UserBadge from "@/features/shared/user-badge";
import type { Suggested } from "@/types/suggested";

type SuggestedItemDrawerProps = {
	children: React.ReactNode;
	item: Suggested;
};

const uid = new ShortUniqueId({ length: 10 });

export default function SuggesteItemDrawer({
	children,
	item,
}: SuggestedItemDrawerProps) {
	const { suggestedFor, displayName } = item;

	const people: string[] = [];
	suggestedFor.forEach((item) => {
		item.affectedOwners.forEach((owner) => {
			if (!people.includes(owner)) people.push(owner);
		});
	});

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-[#ECECEC]">
				<DrawerHeader className="text-left items-start px-6 gap-0">
					<DrawerTitle className="text-sm font-semibold">
						{displayName}
					</DrawerTitle>
					<DrawerDescription className="text-sm">
						View affected People and articles.
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4 space-y-3">
					<div className="p-3 bg-[#F6F6F6]/90 space-y-3 border border-black/5 rounded-3xl backdrop-blur-[20px] shadow-[0px_8px_30px_0px rgba(106, 106, 106, 0.06)]">
						<div className="flex  space-x-4">
							<div className="text-[#616161]">
								<Icon
									icon="fluent:people-community-24-filled"
									height={24}
									width={24}
								/>
							</div>
							<div className="grow">
								<p className="text-[13px] font-medium">Suggested for</p>
								<p className="text-xs text-[#616161]">
									{suggestedFor.length} people are at risk
								</p>
							</div>
						</div>
						<div className="pt-6 flex flex-wrap gap-2">
							{people.map((person) => (
								<UserBadge key={uid.randomUUID()} name={person} />
							))}
						</div>
					</div>
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
