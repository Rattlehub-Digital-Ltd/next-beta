import Options from "./options";

type TypeHeaderProps = {
	title: string;
	description: string;
	value: string | null;
	onValueChange: (value: string | null) => void;
};

export default function TabHeader({
	title,
	description,
	value,
	onValueChange,
}: TypeHeaderProps) {
	return (
		<div>
			<h2 className="text-base font-medium">{title}</h2>
			<p className="text-muted-foreground text-sm text-pretty">{description}</p>

			<div className="py-6">
				<Options value={value} onValueChange={onValueChange} />
			</div>
		</div>
	);
}
