import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type GoalProgressBarProps = {
	title: string;
	progress: string;
};

export default function GoalProgressBar({
	title,
	progress,
}: GoalProgressBarProps) {
	console.log(progress);
	return (
		<div className="rounded-[12px] flex w-full space-x-2 items-center p-2 bg-[#FDFDFD]/60 border border-[#EBEDED] backdrop-blur-[25px] shadow-[0px_8px_30px_0px rgba(106, 106, 106, 0.06)]">
			<Icon
				icon="fluent-color:document-lock-24"
				height={24}
				width={24}
				className="shrink-0"
			/>
			<div className="flex flex-col grow space-y-1.5">
				<p className="text-xs text-[#616161]">{title}</p>
				<div className="w-full h-1 relative bg-[#787880]/15 rounded-full overflow-hidden">
					<div
						className={cn(
							"absolute left-0 top-0 h-full bg-[#007AFF] rounded-full",
						)}
						style={{ width: progress }}
					/>
				</div>
			</div>
		</div>
	);
}
