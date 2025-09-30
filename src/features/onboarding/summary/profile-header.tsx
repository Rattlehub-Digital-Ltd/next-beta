"use client";

// import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { isValidEmail } from "@/lib/utils";

export default function ProfileHeader() {
	const { user } = useAuth0();

	console.log(user);

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
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.8 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ type: "spring", ease: "easeInOut", duration: 0.55 }}
		>
			<div className="flex items-center px-3 rounded-[20px] h-14 w-full gap-3 bg-white/70 backdrop-blur-3xl border border-black/5 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
				<Avatar className="h-8 w-8 rounded-[12px]">
					<AvatarFallback className="text-navbar-avatar-foreground bg-navbar-avatar-bg rounded-[12px]">
						<div className="text-white">
							<Icon icon="fluent:person-20-filled" className="!w-5 !h-5" />
						</div>
					</AvatarFallback>
				</Avatar>
				<div className="grow text-left">
					<p className="text-[13px] font-semibold leading-4 truncate">{name}</p>
					<p className="text-xs leading-4 text-[#3C3C43]/80 tracking-[-0.08px] truncate">
						{email}
					</p>
				</div>
				{/* <div className="flex items-center gap-2">
					<Button className="h-8 w-8 px-0 py-0 rounded-full bg-black/[0.03] active:bg-black/[0.05]">
						<Icon
							icon="fluent:settings-20-regular"
							style={{ stroke: "#6b6b6b" }}
						/>
					</Button>
				</div> */}
			</div>
		</motion.div>
	);
}
