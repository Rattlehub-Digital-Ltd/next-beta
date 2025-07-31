import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const plans = [
	{
		id: "yes",
		name: "Yes",
	},
	{
		id: "no",
		name: "No",
	},
] as const;

export default function Options() {
	return (
		<fieldset>
			{/* <legend className="text-sm font-medium">Plan</legend>
			<p className="text-muted-foreground text-sm">
				Select the plan that best fits your needs.
			</p> */}
			<RadioGroup
				defaultValue="yes"
				className="grid grid-cols-2 gap-3 md:grid-cols-2"
			>
				{plans.map((plan) => (
					<Label
						className="has-[[data-state=checked]]:ring-2 ring-blue-600/20 has-[[data-state=checked]]:bg-blue-600/10 has-[[data-state=checked]]:border-blue-400 flex items-start gap-2 rounded-lg border border-black/15 p-2"
						key={plan.id}
					>
						<RadioGroupItem
							value={plan.id}
							id={plan.name}
							className="data-[state=checked]:border-primary"
						/>
						<div className="grid gap-1 font-normal">
							<div className="font-medium">{plan.name}</div>
							{/* <div className="text-muted-foreground text-xs leading-snug text-balance">
								{plan.description}
							</div> */}
						</div>
					</Label>
				))}
			</RadioGroup>
		</fieldset>
	);
}
