import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type HeaderProps = {
	title: string;
	description: string;
	color?:
		| "yellow"
		| "teal"
		| "dark-green"
		| "indigo"
		| "brown"
		| "dark-teal"
		| "blue";
};

function Header({ title, description, color }: HeaderProps) {
	let color1 = "";
	let color2 = "";
	let icon = "";

	switch (color) {
		case "yellow":
			color1 = "bg-[#FECB01]/15";
			color2 = "bg-[#FECB01]";
			icon = "fluent:lightbulb-filament-24-filled";
			break;
		case "teal":
			color1 = "bg-[#6FCAB6]/15";
			color2 = "bg-[#6FCAB6]";
			icon = "fluent:text-bullet-list-square-sparkle-24-filled";
			break;
		case "dark-green":
			color1 = "bg-[#197278]/15";
			color2 = "bg-[#197278]";
			icon = "fluent:target-arrow-24-filled";
			break;
		case "indigo":
			color1 = "bg-[#5856D6]/15";
			color2 = "bg-[#5856D6]";
			icon = "fluent:people-24-filled";
			break;
		case "brown":
			color1 = "bg-[#A2845E]/15";
			color2 = "bg-[#A2845E]";
			icon = "fluent:shield-lock-24-filled";
			break;
		case "dark-teal":
			color1 = "bg-[#00C7BE]/15";
			color2 = "bg-[#00C7BE]";
			icon = "fluent:document-one-page-sparkle-24-filled";
			break;
		case "blue":
			color1 = "bg-[#007AFF]/15";
			color2 = "bg-[#007AFF]";
			icon = "fluent:folder-people-24-filled";
			break;
		default:
			color1 = "bg-[#000]/15";
			color2 = "bg-[#6b6b6b]";
			icon = "fluent:info-sparkle-24-filled";
			break;
	}

	return (
		<div className="flex flex-col gap-3">
			<div
				className={cn(
					"relative h-10 w-10 flex items-center justify-center rounded-full shrink-0",
					color1,
				)}
			>
				<div
					className={cn(
						"h-[32px] w-[32px] shrink-0 rounded-full flex items-center justify-center text-white/95",
						color2,
					)}
				>
					<Icon icon={icon} height={20} width={20} />
				</div>
			</div>
			<div>
				<p className="text-[15px] leading-6 font-semibold">{title}</p>
				<p className="text-xs text-pretty text-[#616161]">{description}</p>
			</div>
		</div>
	);
}

export default Header;
