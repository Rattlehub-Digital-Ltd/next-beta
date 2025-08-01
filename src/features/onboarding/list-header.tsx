import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

type ListHeaderProps = {
	title: string;
	onReset: () => void;
};

export default function ListHeader({
	title = "List",
	onReset,
}: ListHeaderProps) {
	return (
		<div className="flex items-center space-x-2 w-full pl-3 py-2">
			<p className="text-sm font-semibold grow text-left">{title}</p>
			<Button
				className="!no-underline text-red-500"
				type="button"
				size="sm"
				variant="link"
				onClick={onReset}
			>
				<Icon icon="fluent:arrow-reset-20-filled" />
				<span className="text-[12.6px]">Reset</span>
			</Button>
		</div>
	);
}
