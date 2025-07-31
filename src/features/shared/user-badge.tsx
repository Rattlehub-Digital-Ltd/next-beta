import { Icon } from "@iconify/react";

type UserBadgeProps = {
	name: string;
	imageSrc?: string;
};

export default function UserBadge({ name }: UserBadgeProps) {
	return (
		<div className="flex">
			<div className="bg-[#49454F]/8 pl-1 pr-2.5 items-center rounded-full py-[3px] flex space-x-1">
				<div className="text-[#6750A4]">
					<Icon icon="fluent:person-circle-20-filled" height={16} width={16} />
				</div>
				<p className="text-[#49454F] text-xs tracking-[0.01px] font-medium">
					{name}
				</p>
			</div>
		</div>
	);
}
