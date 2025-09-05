import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type UserBadgeProps = {
	name: string;
	imageSrc?: string;
	relationship?: string;
};

export default function UserBadge({ name, relationship }: UserBadgeProps) {
	return (
		<div className="flex">
			<div
				className={cn(
					"bg-[#49454F]/8 pl-1 pr-3 rounded-xl py-[3px] flex space-x-1.5",
					{
						"items-center": !relationship,
					},
				)}
			>
				<div className="text-[#6750A4]">
					<Icon icon="fluent:person-circle-20-filled" height={24} width={24} />
				</div>

				<div>
					{relationship && (
						<p className="opacity-50 uppercase text-[9px] tracking-wider font-semibold">
							{relationship}
						</p>
					)}
					<p className="text-[#49454F] text-xs tracking-[0.01px] font-semibold">
						{name}
					</p>
				</div>
			</div>
		</div>
	);
}
