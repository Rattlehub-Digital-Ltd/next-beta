"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { OptimizedImage } from "../optimized-image";
import MenuPopup from "./menu-popup";

const Navbar = () => {
	const { user } = useAuth0();

	return (
		<div className="flex items-center justify-between h-full pr-4 pl-6">
			<Link className="relative z-1" href="/">
				<OptimizedImage
					priority
					src="/logo_light.svg"
					alt="Nextdot Logo"
					width={101}
					height={12}
					loading="eager"
				/>
			</Link>
			{user && (
				<div className="flex items-center gap-6">
					{/* <Badge
						className="bg-[#ff6c37] h-5 min-w-5 rounded-full  text-[10px] pl-1 font-mono tabular-nums"
						variant="default"
					>
						<Icon icon="fluent:star-16-filled" />
						<span>BETA</span>
					</Badge> */}
					<MenuPopup>
						<div className="relative">
							<Avatar className="h-8 w-8 rounded-[12px]">
								<AvatarImage src={user?.picture} alt="Avatar" />
								<AvatarFallback className="text-[0.7rem] font-semibold text-navbar-avatar-foreground bg-navbar-avatar-bg rounded-[12px] h-full w-full">
									{user?.name && user?.nickname ? (
										getInitials(user?.name ?? user?.nickname ?? "")
									) : (
										<div className="text-white">
											<Icon
												icon="fluent:person-20-filled"
												className="!w-5 !h-5"
											/>
										</div>
									)}
								</AvatarFallback>
							</Avatar>
							{/* <Badge
								className="h-5 min-w-5 rounded-full px-1 text-[0.65rem] font-mono tabular-nums absolute top-0 right-0 -mt-1.5 -mr-1.5"
								variant="destructive"
							>
								34
							</Badge> */}
						</div>
					</MenuPopup>
				</div>
			)}
		</div>
	);
};

export default Navbar;
