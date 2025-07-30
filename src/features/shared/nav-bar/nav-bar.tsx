"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import MenuPopup from "./menu-popup";

const Navbar = () => {
	const { user } = useAuth0();

	return (
		<div className="flex items-center justify-between h-full pr-4 pl-6">
			<Link className="relative z-1" href="/">
				<Image
					src="/logo_light.svg"
					alt="Nextdot Logo"
					width={84}
					height={10}
					loading="eager"
				/>
			</Link>
			<MenuPopup>
				<div className="relative">
					<Avatar className="h-8 w-8 rounded-[12px]">
						<AvatarImage src={user?.picture} alt="Avatar" />
						<AvatarFallback className="text-[0.7rem] font-semibold text-navbar-avatar-foreground bg-navbar-avatar-bg rounded-[12px] h-full w-full">
							{getInitials(user?.name ?? user?.nickname ?? "")}
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
