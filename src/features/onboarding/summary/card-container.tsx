import { cn } from "@/lib/utils";

type CardContainerProps = {
	title: string;
	icon: React.ReactNode;
	description: string;
	children: React.ReactNode;
	color?:
		| "yellow"
		| "teal"
		| "dark-green"
		| "indigo"
		| "brown"
		| "dark-teal"
		| "blue"
		| "purple";
};

export default function CardContainer({
	title,
	icon,
	description,
	children,
	color = "yellow",
}: CardContainerProps) {
	let color1 = "";
	let color2 = "";

	switch (color) {
		case "yellow":
			color1 = "bg-[#FECB01]/15";
			color2 = "bg-[#FECB01]";
			break;
		case "teal":
			color1 = "bg-[#6FCAB6]/15";
			color2 = "bg-[#6FCAB6]";
			break;
		case "dark-green":
			color1 = "bg-[#197278]/15";
			color2 = "bg-[#197278]";
			break;
		case "indigo":
			color1 = "bg-[#5856D6]/15";
			color2 = "bg-[#5856D6]";
			break;
		case "brown":
			color1 = "bg-[#A2845E]/15";
			color2 = "bg-[#A2845E]";
			break;
		case "dark-teal":
			color1 = "bg-[#00C7BE]/15";
			color2 = "bg-[#00C7BE]";
			break;
		case "blue":
			color1 = "bg-[#007AFF]/15";
			color2 = "bg-[#007AFF]";
			break;
		case "purple":
			color1 = "bg-[#CB30E0]/15";
			color2 = "bg-[#CB30E0]";
			break;
		default:
			color1 = "bg-[#000]/15";
			color2 = "bg-[#6b6b6b]";
			break;
	}

	return (
		<div className="w-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<div className="flex gap-3">
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
						{icon}
					</div>
				</div>
				<div>
					<p className="text-sm leading-6 font-semibold">{title}</p>
					<p className="text-xs text-pretty text-[#616161]">{description}</p>
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
}
