import { memo } from "react";
import type { EstateChecklistItem } from "@/api/services/dashboard/onboarding/types";
import { Accordion } from "@/components/ui/accordion";
import { ChecklistAccordionItem } from "./checklist-accordion-item";

type Props = {
	data: EstateChecklistItem[];
	currentIndex: number;
	readOnly?: boolean;
	onChange: (value: string, index: number) => void;
	onNextPress: (index: number) => void;
};

function CustomAccordion(props: Props) {
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full flex flex-col gap-3"
			value={props.currentIndex.toString()}
			onValueChange={(value) => props.onNextPress(Number(value))}
		>
			{props.data.map((d, index) => (
				<ChecklistAccordionItem
					key={d.id}
					item={d}
					itemIndex={index}
					isLastItem={index === props.data.length - 1}
					{...props}
				/>
			))}
		</Accordion>
	);
}

export default memo(CustomAccordion);
