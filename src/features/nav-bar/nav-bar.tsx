import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import MenuPopup from "./menu-popup";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between h-full px-8">
			<Link href="/">
				<Image
					src="/logo_light.svg"
					alt="Nextdot Logo"
					width={100.72}
					height={12}
				/>
			</Link>
			<MenuPopup>
				<div className="relative">
					<Avatar className="h-10 w-10 rounded-2xl">
						<AvatarImage src="" />
						<AvatarFallback className="text-[0.7rem] font-semibold text-navbar-avatar-foreground bg-navbar-avatar-bg rounded-2xl h-full w-full">
							TP
						</AvatarFallback>
					</Avatar>
					<Badge
						className="h-5 min-w-5 rounded-full px-1 text-[0.65rem] font-mono tabular-nums absolute top-0 right-0 -mt-1.5 -mr-1.5"
						variant="destructive"
					>
						34
					</Badge>
				</div>
			</MenuPopup>
		</div>
	);
};

export default Navbar;
