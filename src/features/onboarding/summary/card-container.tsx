type CardContainerProps = {
	title: string;
	icon: React.ReactNode;
	description: string;
	children: React.ReactNode;
};

export default function CardContainer({
	title,
	icon,
	description,
	children,
}: CardContainerProps) {
	return (
		<div className="w-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<div className="flex gap-3">
				<div className="relative h-10 w-10 bg-black/3 flex items-center justify-center rounded-full shrink-0">
					<div className="h-[32px] w-[32px] shrink-0 rounded-full flex items-center justify-center bg-black/8 text-black/50">
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
