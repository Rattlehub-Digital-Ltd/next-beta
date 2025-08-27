import { Icon } from "@iconify/react";
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

type DocumentLocationSuggestionsProps = {
	children: React.ReactNode;
};

const items = [
	{
		label: "Safe deposit box",
		options: [],
	},
	{
		label: "Attorney",
		options: [],
	},
	{
		label: "Fireproof Safe Box",
		options: [],
	},
	{
		label: "Online document storage",
		options: [],
	},
	{
		label: "Cloud storage",
		options: [
			{
				name: "Google Drive",
				icon: "logos:google-drive",
			},
			{
				name: "Dropbox",
				icon: "logos:dropbox",
			},
			{
				name: "One Drive",
				icon: "logos:microsoft-onedrive",
			},
			{
				name: "Box",
				icon: "logos:box",
			},
		],
	},
	{
		label: "Keeping Documents At Home",
		options: [],
	},
	{
		label: "With Your Estate Planner",
		options: [],
	},
	{
		label: "With Your Executor",
		options: [],
	},
	{
		label: "Safekeeping Documents With Your Trustee",
		options: [],
	},
];

export default function DocumentLocationSuggestions({
	children,
}: DocumentLocationSuggestionsProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-left">Storage locations</DrawerTitle>
					<DrawerDescription className="text-left text-pretty">
						Here is a list a list of suggested storage locations where you can
						store your documents
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4">
					<ul className="p-6 list-disc space-y-3 overflow-y-auto">
						{items.map(({ label, options }) => (
							<li key={label}>
								<div className="space-y-1.5">
									<p className="text-[13px]">{label}</p>
									{options.length > 0 && (
										<div className="flex flex-wrap gap-1.5 -ml-1.5">
											{options.map(({ name, icon }) => (
												<div
													key={name}
													className="p-2 rounded-full bg-black/3 flex items-center gap-2"
												>
													<Icon icon={icon} className="h-4 w-4" />
													<p className="text-xs">{name}</p>
												</div>
											))}
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
