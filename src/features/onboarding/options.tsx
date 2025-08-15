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
			<div className="flex gap-2 mt-4 text-muted-foreground p-3 bg-black/3 rounded-2xl">
				<Icon
					icon="fluent:info-16-regular"
					className="shrink-0 mt-[3px]"
					height={16}
					width={16}
				/>
				<p
					className={cn("text-xs text-left text-pretty leading-5", {
						"line-clamp-1 mt-px": value !== null,
					})}
				>
					Please choose yes or no, your information will not be shared with
					third parties, read our{" "}
					<a href="/" className="text-blue-600 font-medium hover:underline">
						Data Policy
					</a>{" "}
					for more information <span className="text-red-500">*</span>
				</p>
			</div>
		</fieldset>
	);
}
