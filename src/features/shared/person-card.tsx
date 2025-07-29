"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type PersonCardProps = {
	imgSrc?: string;
	fullName: string;
	relationship: string;
	onDelete?: () => void;
};

function PersonCard({
	imgSrc,
	fullName,
	relationship,
	onDelete,
}: PersonCardProps) {
	return (
		<div className="flex items-center px-1.5 rounded-full h-11 w-full gap-3 bg-white shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
			<Avatar>
				<AvatarImage
					className="h-8 w-8"
					style={{ objectFit: "cover" }}
					src={imgSrc}
				/>
				<AvatarFallback>HB</AvatarFallback>
			</Avatar>
			<div className="grow text-left">
				<p className="text-xs leading-4 text-[#3C3C43]/80 tracking-[-0.08px]">
					{relationship}
				</p>
				<p className="text-[13px] font-semibold leading-4">{fullName}</p>
			</div>
			<Button
				className="h-8 w-8 px-0 py-0 rounded-full bg-[#FEF2F2]"
				type="button"
				onClick={onDelete}
			>
				<Icon icon="fluent:delete-20-regular" style={{ stroke: "#DC2626" }} />
			</Button>
		</div>
	);
}

export default PersonCard;
