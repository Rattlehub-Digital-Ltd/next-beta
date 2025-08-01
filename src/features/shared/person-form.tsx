/** biome-ignore-all lint/correctness/noChildrenProp: better */

import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import * as motion from "motion/react-client";
import { usePartnerStore } from "store/partner-store";
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
import { usePersonDrawerStore } from "store/person-drawer-store";

type PersonFormProps = {
	type: PersonType;
	firstName?: string;
	lastName?: string;
	relationship?: string;
	imgSrc?: string;
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

function PersonForm({
	type,
	firstName,
	lastName,
	relationship,
	buttonLabel,
	onClose,
}: PersonFormProps) {
	const { partner, setPartner } = usePartnerStore();
	const { onOpenChange } = usePersonDrawerStore();

	const form = useForm({
		defaultValues: {
			firstName: firstName ?? "",
			lastName: lastName ?? "",
			relationship: relationship ?? "",
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
			} else if (type === "dependent") {
			}

			onOpenChange(false);
			// onClose();
		},
	});

	return (
		<div>
			<form
				className="space-y-6"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
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
								>
									<SelectTrigger className={cn("py-[18px]", inputClass)}>
										<SelectValue placeholder="Select relationship" />
									</SelectTrigger>
									<SelectContent>
										{["Biological", "Adopted", "Other", "Wife"].map((item) => (
											<SelectItem key={item} value={item}>
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
									{(firstName !== "" && lastName !== "") || relationship !== ""
										? `Update ${firstName} ${lastName}`
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
