/** biome-ignore-all lint/correctness/useUniqueElementIds: no applicable */
import { Icon } from "@iconify/react";
import { memo, useCallback } from "react";
import type { EstateChecklistItem } from "@/api/services/dashboard/onboarding/types";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RiskCarousel from "@/features/shared/risk-carousel";
import { track } from "@/lib/analytics";

type ChecklistAccordionItemProps = {
	isLastItem: boolean;
	item: EstateChecklistItem;
	currentIndex: number;
	itemIndex: number;
	readOnly?: boolean;
	onChange: (value: string, index: number) => void;
	onNextPress: (index: number) => void;
};

const ChecklistAccordionItemComponent = ({
	isLastItem,
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

	const handleOnRiskItemChange = useCallback(
		(index: number, item: EstateChecklistItem) => {
			const value = item.riskItems?.[index];

			if (!value) return;

			track("swiped_carousel", {
				item: item.displayName as string,
				record_identifier: item.id,
				risk_category: value.category,
				goal_name: value.goalName,
			});
		},
		[],
	);

	return (
		<AccordionItem
			key={item.id}
			className="relative disabled:opacity-60 bg-white/65 backdrop-blur-2xl border-none shadow-[0px_8px_24px rgba(149, 157, 165, 0.2)] rounded-2xl"
			value={itemIndex.toString()}
			disabled={isDisabled}
		>
			<AccordionTrigger
				disabled={isDisabled}
				className="disabled:opacity-60 px-4"
			>
				<div className="grow overflow-hidden">
					<div className="flex w-full">
						<div className="flex items-center grow w-full justify-between font-medium text-left">
							<div className="flex grow items-center gap-1.5 text-[#6b6b6b]">
								<Icon icon="fluent-color:shield-24" className="h-5 w-5" />
								<span className="text-neutral-800 grow truncate">
									{item.displayName}
								</span>
							</div>
							{item.isApplicable !== null && !isExpanded && (
								<div className="font-normal flex items-center gap-2 text-neutral-600 capitalize">
									{item.isApplicable === "no" && (
										<Icon
											icon="fluent-color:dismiss-circle-20"
											className="h-5 w-5"
										/>
									)}
									{item.isApplicable === "yes" && (
										<Icon
											icon="fluent-color:checkmark-circle-20"
											className="h-5 w-5"
										/>
									)}
									{item.isApplicable}
								</div>
							)}
						</div>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className="flex flex-col gap-4 text-balance pb-0">
				{item.eduText && isExpanded ? (
					<p className="flex pl-4 leading-5 text-xs text-muted-foreground">
						{item.eduText}
					</p>
				) : null}
				<div className="w-full space-y-2 px-4">
					{item.riskItems && item.riskItems.length > 0 && (
						<RiskCarousel
							items={item.riskItems}
							className="!bg-white !border-none !shadow-none"
							onRiskItemChange={(index: number) =>
								handleOnRiskItemChange(index, item)
							}
						/>
					)}
					<div className="flex items-center justify-between w-full">
						<RadioGroup
							className="justify-start flex grow flex-nowrap h-10 w-full pl-1 gap-4"
							orientation="horizontal"
							disabled={readOnly}
							value={item.isApplicable ?? undefined}
							onValueChange={(value) => {
								onChange(value, itemIndex);

								track("submitted_answer", {
									record_identifier: item.id,
									item: item.displayName ?? item.name ?? "",
									has_item_in_place: value === "yes",
									is_adaptive_card: false,
								});

								onNextPress(currentIndex + 1);
							}}
						>
							<div className="flex items-center gap-3 pr-2">
								<RadioGroupItem
									value="yes"
									id="yes"
									className="data-[state=checked]:bg-[#34C759] data-[state=checked]:text-white"
								/>
								<Label className="text-xs" htmlFor="yes">
									Yes
								</Label>
							</div>
							<div className="flex items-center gap-3 pr-2">
								<RadioGroupItem
									value="no"
									id="no"
									className="data-[state=checked]:bg-[#D64700] data-[state=checked]:text-white"
								/>
								<Label className="text-xs" htmlFor="no">
									No
								</Label>
							</div>
						</RadioGroup>
						{!isLastItem && (
							<Button
								aria-disabled={!isCompleted}
								className="pr-3 text-xs h-full"
								color="primary"
								disabled={!isCompleted || readOnly}
								size="sm"
								variant="link"
								onClick={() => onNextPress(currentIndex + 1)}
							>
								Next
							</Button>
						)}
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export const ChecklistAccordionItem = memo(ChecklistAccordionItemComponent);
