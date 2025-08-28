import CategoryList from "./category-list";

type RiskItemProps = {
	category: string;
	goalName: string;
	eduText: string;
};

export default function RiskItem({
	category,
	goalName,
	eduText,
}: RiskItemProps) {
	return (
		<div className="space-y-3 p-3 rounded-[12px] border bg-indigo-50/30 border-indigo-100 backdrop-blur-[25px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]">
			<h1 className="text-xs font-medium leading-4 pl-0.5">{goalName}</h1>
			<CategoryList items={[category]} />
			<p className="text-[0.78rem] opacity-75 text-pretty">{eduText}</p>
		</div>
	);
}
