import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import StripePricingTable from "./stripe-pricing-table";

type StripeDrawerProps = {
	children: React.ReactNode;
};

export default function StripeDrawer({ children }: StripeDrawerProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="bg-[#16243d] border-[#16243d] text-white">
				<DrawerHeader>
					<DrawerTitle className="text-white">Subscription</DrawerTitle>
				</DrawerHeader>
				<div className="p-4">
					<StripePricingTable />
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button className="dark" variant="ghost">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
