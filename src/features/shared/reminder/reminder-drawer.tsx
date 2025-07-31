import Calendar29 from "@/components/calendar-29";
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

type ReminderDrawerProps = {
	children: React.ReactNode;
};

export default function ReminderDrawer({ children }: ReminderDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-[#ECECEC]">
				<DrawerHeader className="text-left items-start px-6 gap-0">
					<DrawerTitle>Set Reminder</DrawerTitle>
					<DrawerDescription>set a reminder for this goal</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
					<div className="p-4 bg-[#F6F6F6]/90 stroke-1 stroke-black/5 rounded-3xl backdrop-blur-[20px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
						<Calendar29 />
					</div>
				</div>
				<DrawerFooter>
					<Button>Set reminder</Button>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
