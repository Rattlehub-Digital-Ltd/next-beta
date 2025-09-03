/** biome-ignore-all lint/correctness/noChildrenProp: better */

import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import * as motion from "motion/react-client";
import { useChildrenStore } from "store/use-children-store";
import { useDependentStore } from "store/use-dependent-store";
import { usePartnerStore } from "store/use-partner-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Person, PersonType } from "@/types/person";

type PersonFormProps = {
	type: PersonType;
	person?: Person;
	buttonLabel: string;
	onClose: () => void;
};

const labelClass =
	"text-xs font-medium tracking-[0.08px] mb-1.5 text-[#616161]";
const inputClass =
	"!text-base placeholder:text-sm bg-white rounded-[12px] w-full h-10 leading-6 flex items-center";

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<p className="text-xs mt-1 truncate">
					<span className="text-red-500">*</span>{" "}
					{field.state.meta.errors.join(", ")}
				</p>
			) : null}
			{field.state.meta.isValidating ? (
				<p className="text-xs text-muted-foreground mt-1 truncate">
					"Validating..."
				</p>
			) : null}
		</>
	);
}

function PersonForm({ type, person, buttonLabel, onClose }: PersonFormProps) {
	const { partner, setPartner } = usePartnerStore();
	const { children, setChildren } = useChildrenStore();
	const { dependents, setDependents } = useDependentStore();

	const form = useForm({
		defaultValues: {
			firstName: person?.firstName ?? "",
			lastName: person?.lastName ?? "",
			relationship: person?.relationship ?? "",
		},
		onSubmit: async ({ value }) => {
			const data: Person = {
				firstName: value.firstName,
				lastName: value.lastName,
				relationship: value.relationship,
				image: "",
			};

			if (type === "partner") {
				const items = partner ? partner : [];
				items.push(data);
				setPartner(items);
			} else if (type === "child") {
				const items = children ? children : [];
				items.push(data);
				setChildren(items);
			} else if (type === "dependent") {
				const items = dependents ? dependents : [];
				items.push(data);
				setDependents(items);
			}

			onClose();
		},
	});

	let options: string[] = [];

	switch (type) {
		case "child":
			options = ["Adopted", "Biological", "Step Child"];
			break;
		case "dependent":
			options = ["Extended family", "Friend", "Other"];
			break;
		case "partner":
			options = ["Wife"];
			break;
		default:
			break;
	}

	return (
		<div>
			<form
				className="space-y-6"
				onSubmit={(e) => {
					form.handleSubmit();
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				<div>
					{/* A type-safe field component*/}
					<form.Field
						name="firstName"
						validators={{
							onChange: ({ value }) =>
								!value
									? "A first name is required"
									: value.length < 3
										? "First name must be at least 3 characters"
										: undefined,
							onChangeAsyncDebounceMs: 500,
							onChangeAsync: async ({ value }) => {
								await new Promise((resolve) => setTimeout(resolve, 1000));
								return (
									value.includes("error") && 'No "error" allowed in first name'
								);
							},
						}}
						children={(field) => {
							// Avoid hasty abstractions. Render props are great!
							return (
								<>
									<Label htmlFor={field.name} className={labelClass}>
										First Name <span className="text-red-500">*</span>
									</Label>
									<Input
										id={field.name}
										name={field.name}
										placeholder="Enter first name"
										autoComplete="name"
										value={field.state.value}
										className={inputClass}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<FieldInfo field={field} />
								</>
							);
						}}
					/>
				</div>
				<div>
					<form.Field
						name="lastName"
						children={(field) => (
							<>
								<Label htmlFor={field.name} className={labelClass}>
									Last Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id={field.name}
									name={field.name}
									placeholder="Enter last name"
									autoComplete="family-name"
									value={field.state.value}
									className={inputClass}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>
				<div>
					<form.Field
						name="relationship"
						children={(field) => (
							<>
								<Label htmlFor={field.name} className={labelClass}>
									Relationship <span className="text-red-500">*</span>
								</Label>

								<Select
									onValueChange={field.handleChange}
									value={field.state.value}
									name={field.name}
									disabled={type === "partner"}
								>
									<SelectTrigger className={cn("py-[18px]", inputClass)}>
										<SelectValue placeholder="Select relationship" />
									</SelectTrigger>
									<SelectContent>
										{options.map((item) => (
											<SelectItem
												key={item}
												value={item}
												defaultValue={type === "partner" ? "Wife" : undefined}
											>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>
				<div className="flex items-center gap-2 mt-8">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<motion.div whileTap={{ scale: 0.9 }}>
								<Button
									type="submit"
									disabled={!canSubmit}
									className="rounded-2xl bg-blue-600 hover:bg-blue-600 active:bg-blue-700 px-6"
								>
									{person
										? `Update ${person.firstName} ${person.lastName}`
										: isSubmitting
											? "Submitting..."
											: buttonLabel}
								</Button>
							</motion.div>
						)}
					/>
					<motion.div whileTap={{ scale: 0.9 }}>
						<Button
							className="px-6 rounded-2xl"
							variant="outline"
							onClick={onClose}
						>
							Cancel
						</Button>
					</motion.div>
				</div>
			</form>
		</div>
	);
}

export default PersonForm;
