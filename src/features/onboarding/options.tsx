import { Icon } from "@iconify/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type OptionsProps = {
	value: string | null;
	onValueChange: (value: string | null) => void;
};

const option = [
	{
		id: "yes",
		name: "Yes",
	},
	{
		id: "no",
		name: "No",
	},
] as const;

export default function Options({ value, onValueChange }: OptionsProps) {
	return (
		<fieldset>
			<div className="flex gap-2 items-center mb-3 text-muted-foreground">
				<Icon icon="fluent:info-16-regular" height={16} width={16} />
				<p className="font-medium text-xs text-left">
					Select Yes or No <span className="text-red-500">*</span>
				</p>
			</div>
			<RadioGroup
				defaultValue="yes"
				value={value}
				className="grid grid-cols-2 gap-3 md:grid-cols-2"
				onValueChange={onValueChange}
			>
				{option.map((plan) => (
					<Label
						className={cn(
							"has-[[data-state=checked]]:ring-2 flex items-start gap-2 rounded-[8px] border border-black/15 py-2 pl-3 pr-2",
							{
								"has-[[data-state=checked]]:bg-[#34C759]/5 has-[[data-state=checked]]:border-[#34C759] ring-[#34C759]/40":
									plan.name === "Yes",
							},
							{
								"has-[[data-state=checked]]:bg-[#D64700]/5 has-[[data-state=checked]]:border-[#D64700] ring-[#D64700]/40":
									plan.name === "No",
							},
						)}
						key={plan.id}
					>
						<div className="flex items-center gap-2 w-full">
							<div className="font-medium text-[13px] grow truncate text-left leading-4">
								{plan.name}
							</div>
							<RadioGroupItem
								value={plan.id}
								id={plan.name}
								className={cn(
									"data-[state=checked]:text-white",
									{
										" data-[state=checked]:bg-[#34C759]": plan.name === "Yes",
									},
									{
										"data-[state=checked]:bg-[#D64700]": plan.name === "No",
									},
								)}
							/>
						</div>
					</Label>
				))}
			</RadioGroup>
		</fieldset>
	);
}
