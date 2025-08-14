import { ChevronRight } from "lucide-react";
import { memo } from "react";
import type { EstateChecklistItem } from "@/api/services/dashboard/onboarding/types";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import RiskCarousel from "@/features/shared/risk-carousel";

type ChecklistAccordionItemProps = {
	item: EstateChecklistItem;
	currentIndex: number;
	itemIndex: number;
	readOnly?: boolean;
	onChange: (value: string, index: number) => void;
	onNextPress: (index: number) => void;
};

const ChecklistAccordionItemComponent = ({
	item,
	currentIndex,
	itemIndex,
	readOnly,
	onChange,
	onNextPress,
}: ChecklistAccordionItemProps) => {
	const isCompleted = item.isApplicable === "yes" || item.isApplicable === "no";
	const isDisabled = currentIndex !== itemIndex && item.isApplicable === null;
	const isExpanded = currentIndex === itemIndex;

	return (
		<AccordionItem
			key={item.id}
			className="relative disabled:opacity-60 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.03)] rounded-2xl"
			value={itemIndex.toString()}
			disabled={isDisabled}
		>
			<AccordionTrigger disabled={isDisabled} className="disabled:opacity-60">
				<div className="grow overflow-hidden">
					<div className="flex pr-4 w-full">
						<div className="flex items-center grow w-full justify-between ml-4 font-medium text-left">
							<div className="mr-2"></div>
							<span className="text-default-800 grow">{item.displayName}</span>
							{item.isApplicable !== null && !isExpanded && (
								<span className="font-normal text-neutral-600 capitalize">
									{item.isApplicable}
								</span>
							)}
						</div>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className="flex flex-col gap-4 text-balance pb-0">
				{item.eduText && isExpanded ? (
					<p className="flex pl-4 leading-5 text-[13px]">{item.eduText}</p>
				) : null}
				<div className="w-full space-y-3">
					{item.riskItems && item.riskItems.length > 0 && (
						<RiskCarousel items={item.riskItems} />
					)}
					<Separator className="w-full" />
					<div className="flex items-center justify-between w-full">
						<RadioGroup
							className="justify-center flex-grow pl-3 flex-nowrap h-11 w-full"
							orientation="horizontal"
							disabled={readOnly}
							value={item.isApplicable ?? undefined}
							onValueChange={(value) => onChange(value, itemIndex)}
						>
							<RadioGroupItem
								className="h-full mr-0 space-x-1.5 text-sm"
								value="yes"
							>
								Yes
							</RadioGroupItem>
							<RadioGroupItem className="h-full space-x-1.5" value="no">
								No
							</RadioGroupItem>
						</RadioGroup>
						<Button
							aria-disabled={!isCompleted}
							className="pr-3 -mt-4 text-sm"
							color="primary"
							disabled={!isCompleted || readOnly}
							size="sm"
							variant="link"
							onClick={() => onNextPress(currentIndex + 1)}
						>
							Next
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export const ChecklistAccordionItem = memo(ChecklistAccordionItemComponent);
