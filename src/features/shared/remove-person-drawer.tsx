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

type RemovePersonDrawerProps = {
	children: React.ReactNode;
	onDelete: () => void;
};

function RemovePersonDrawer({ children, onDelete }: RemovePersonDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-main-secondary-background">
				<DrawerHeader>
					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="grid grid-cols-2 gap-2">
					<Button type="button" onClick={onDelete} variant="destructive">
						Remove
					</Button>
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

export default RemovePersonDrawer;
