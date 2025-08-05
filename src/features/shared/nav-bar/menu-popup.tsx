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
import { ComingSoonBadge } from "../coming-soon-badge";

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
			<DropdownMenuContent
				className="mr-4 max-w-96 border-border"
				sideOffset={8}
			>
				<DropdownMenuSeparator className="bg-muted" />
				<DropdownMenuItem>
					<div className="flex items-center gap-2">
						<Icon
							icon="fluent:checkmark-starburst-16-filled"
							className="shrink-0 !h-5 !w-5"
							height={20}
							width={20}
						/>
						<span className="opacity-60">Upgrage to Pro</span>
					</div>
				</DropdownMenuItem>

				<DropdownMenuSeparator className="bg-muted" />
				<DropdownMenuLabel className="text-[10px] uppercase font-medium text-muted-foreground">
					Account
				</DropdownMenuLabel>
				<DropdownMenuItem>
					<div className="text-left">
						<h2 className="text-sm font-medium truncate w-full">{name}</h2>
						<p className="text-neutral-500 text-[0.8rem]">{`${email ?? "unknown"}`}</p>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-muted" />
				<DropdownMenuItem className="pointer-events-none opacity-80">
					<div className="flex items-center gap-2">
						<Icon
							icon="fluent:person-20-regular"
							className="shrink-0 !h-5 !w-5"
							height={20}
							width={20}
						/>
						<span className="opacity-60">Account</span>
						<ComingSoonBadge
							variant="gradient"
							className="ml-8 text-[11px] whitespace-nowrap"
						/>
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem className="pointer-events-none opacity-80">
					<div className="flex items-center gap-2">
						<Icon
							icon="fluent:receipt-20-regular"
							className="shrink-0 !h-5 !w-5"
							height={20}
							width={20}
						/>
						<span className="opacity-60">Billing</span>
						<ComingSoonBadge
							variant="gradient"
							className="ml-8 text-[11px] whitespace-nowrap"
						/>
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem className="pointer-events-none opacity-80">
					<div className="flex items-center gap-2">
						<Icon
							icon="fluent:alert-20-regular"
							className="shrink-0 !h-5 !w-5"
							height={20}
							width={20}
						/>
						<span className="opacity-60">Notifications</span>
						<ComingSoonBadge
							variant="gradient"
							className="ml-8 text-[11px] whitespace-nowrap"
						/>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-muted" />
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
							className="shrink-0 !h-5 !w-5"
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
