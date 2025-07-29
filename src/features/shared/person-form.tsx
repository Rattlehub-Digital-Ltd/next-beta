/** biome-ignore-all lint/correctness/noChildrenProp: better */
import * as motion from "motion/react-client";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
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

type PersonFormProps = {
	buttonLabel: string;
	onClose: () => void;
};

const labelClass =
	"text-xs font-medium tracking-[0.08px] mb-1.5 text-[#616161]";
const inputClass =
	"!text-base placeholder:text-sm bg-white rounded-[12px] w-full";

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<em>{field.state.meta.errors.join(", ")}</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}

function PersonForm({ buttonLabel, onClose }: PersonFormProps) {
	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			relationship: "",
		},
		onSubmit: async ({ value }) => {
			// Do something with form data
			console.log(value);
		},
	});

	return (
		<div>
			<form
				className="space-y-4"
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

								<Select>
									<SelectTrigger className={inputClass}>
										<SelectValue placeholder="Relationship" />
									</SelectTrigger>
									<SelectContent>
										{["Biological", "Adopted", "Other"].map((item) => (
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
							<motion.div whileTap={{ scale: 0.95 }}>
								<Button
									type="submit"
									disabled={!canSubmit}
									className="bg-blue-600 hover:bg-blue-600 active:bg-blue-700 px-8"
								>
									{isSubmitting ? "..." : buttonLabel}
								</Button>
							</motion.div>
						)}
					/>
					<motion.div whileTap={{ scale: 0.95 }}>
						<Button className="px-8" variant="outline" onClick={onClose}>
							Cancel
						</Button>
					</motion.div>
				</div>
			</form>
		</div>
	);
}

export default PersonForm;
