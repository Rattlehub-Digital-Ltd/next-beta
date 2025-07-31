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
		<div className="space-y-3 p-3 rounded-[12px] border border-[#EBEDED] backdrop-blur-[25px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)]">
			<h1 className="text-sm font-semibold leading-4">{goalName}</h1>
			<CategoryList items={[category]} />
			<p className="text-[0.78rem] text-pretty">{eduText}</p>
		</div>
	);
}
