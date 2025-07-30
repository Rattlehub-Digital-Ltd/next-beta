import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

type SuggestionItemProps = {
	title: string;
	description: string;
	showReminder?: boolean;
};

export default function SuggestionItem({
	title,
	description,
	showReminder = false,
}: SuggestionItemProps) {
	return (
		<div className="flex gap-4">
			<div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-[#FECB01]/15 shrink-0">
				<div className="h-[32px] w-[32px] shrink-0 rounded-full bg-[#FECB01] flex items-center justify-center text-white/95">
					<Icon
						icon="fluent:lightbulb-filament-20-regular"
						height={20}
						width={20}
					/>
				</div>
			</div>
			<div className="space-y-1">
				<p className="text-[15px] leading-6 font-semibold">{title}</p>
				<p className="text-[12.6px] leading-5 text-pretty text-[#616161]">
					{description}
				</p>
				{showReminder && (
					<Button
						className="text-xs font-semibold text-[#E34C00] px-0 py-2 -ml-4"
						variant="ghost"
					>
						<Icon
							className="!w-4.5 !h-4.5 shrink-0"
							icon="fluent:alert-urgent-24-filled"
							height={18}
							width={18}
						/>
						<span className="grow truncate">Set a reminder</span>
					</Button>
				)}
			</div>
		</div>
	);
}
