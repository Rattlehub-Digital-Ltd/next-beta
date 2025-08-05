import { Icon } from "@iconify/react";

type AddPeopeleProps = {
	label: string;
	icon: string;
};

export default function AddPeople({ icon, label }: AddPeopeleProps) {
	return (
		<div>
			<div className="flex flex-col rounded-[16px] h-24 w-24 gap-2 bg-white/70 backdrop-blur-3xl border border-black/5 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
				<div className="grow text-[#424242]/80 flex items-center justify-center">
					<Icon icon={icon} height={32} width={32} />
				</div>
				<div className="pb-2.5 px-3 text-center w-full">
					<p className="font-medium text-xs">{label}</p>
				</div>
			</div>
		</div>
	);
}
