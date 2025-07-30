"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
import { useOnboardingStore } from "store/use-onboarding-store";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isValidEmail } from "@/lib/utils";

type UserMenuProps = {
	children: React.ReactNode;
};

const UserMenu = ({ children }: UserMenuProps) => {
	const { user, logout } = useAuth0();

	const { setIsOnboarded } = useOnboardingStore();

	let email: string;
	let name: string;

	if (user?.email && isValidEmail(user?.email)) {
		email = user.email;
	} else if (user?.name && isValidEmail(user?.name)) {
		email = user.name;
	} else {
		email = "Unknown";
	}

	if (user?.name && !isValidEmail(user?.name)) {
		name = user.name;
	} else if (user?.nickname && !isValidEmail(user?.nickname)) {
		name = user.nickname;
	} else {
		name = "Unknown";
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-4 w-48 border-border" sideOffset={8}>
				<DropdownMenuLabel className="text-[10px] uppercase font-medium text-muted-foreground">
					Account
				</DropdownMenuLabel>
				<DropdownMenuItem>
					<div className="text-left">
						<h2 className="text-sm font-medium truncate w-full">{name}</h2>
						<p className="text-neutral-500 text-[0.8rem]">{`${email ?? "unknown"}`}</p>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-default-200" />
				<DropdownMenuItem className="pointer-events-none opacity-80">
					<span className="opacity-60">Billing</span>
					{/* <ComingSoonBadge variant="gradient" className="ml-8 text-[11px]" /> */}
				</DropdownMenuItem>
				<DropdownMenuItem className="pointer-events-none opacity-80">
					<span className="opacity-60">Profile</span>
					{/* <ComingSoonBadge variant="gradient" className="ml-8 text-[11px]" /> */}
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-default-200" />
				<DropdownMenuItem
					className="font-medium text-red-600"
					onClick={async () => {
						logout({
							logoutParams: { returnTo: window.location.origin },
						})
							.catch((error) => {
								console.error(error);
							})
							.finally(() => {
								setIsOnboarded(false);
							});
					}}
				>
					<div className="flex items-center gap-2">
						<Icon
							icon="hugeicons:logout-03"
							height={20}
							width={20}
							style={{ color: "#DC2626" }}
						/>
						<span className="font-medium text-sm">Sign out</span>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
