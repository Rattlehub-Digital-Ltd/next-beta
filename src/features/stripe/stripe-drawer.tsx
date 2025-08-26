"use client";

import { useGetProducts } from "@/api/services/dashboard/subscription/queries";
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
import Product from "../dashboard/subscription/product";

type StripeDrawerProps = {
	children: React.ReactNode;
};

export default function StripeDrawer({ children }: StripeDrawerProps) {
	const { data } = useGetProducts();

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className="max-h-[80svh] bg-[#16243d] flex flex-col border-[#16243d] text-white h-full">
				<DrawerHeader>
					<DrawerTitle className="text-white">Subscription</DrawerTitle>
				</DrawerHeader>
				<div className="p-4 grow overflow-y-auto">
					{data && (
						<ul className="space-y-4">
							{data.map((item) => (
								<li key={item.id}>
									<Product plan={item} isRecommended={true} currency="CA$" />
								</li>
							))}
						</ul>
					)}
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
