import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Defines the variant styles for the Spinner component.
 * This approach, while verbose with `[&>svg]:`, is a common and powerful pattern
 * in libraries like shadcn/ui. It allows variant props on the parent component
 * to control the styles of child elements, offering great flexibility to the consumer.
 */
const spinnerVariants = cva(
	// Base classes applied to the root element.
	// The direct child SVG will get the spin animation.
	"[&>svg]:animate-spin",
	{
		variants: {
			variant: {
				/**
				 * The `text-*` class sets the color for the spinner's track (the dimmer, static part).
				 * The `fill-*` class sets the color for the spinner's moving arc (the brighter, active part).
				 */
				default: "[&>svg]:fill-blue-600 [&>svg]:text-neutral-200",
				brand: "[&>svg]:fill-[#C7A038] [&>svg]:text-neutral-200",
				dark: "[&>svg]:fill-white [&>svg]:text-white/20",
				light: "[&>svg]:fill-black [&>svg]:text-black/20",
			},
			size: {
				xs: "[&>svg]:h-3 [&>svg]:w-3",
				sm: "[&>svg]:h-4 [&>svg]:w-4",
				md: "[&>svg]:h-5 [&>svg]:w-5",
				lg: "[&>svg]:h-8 [&>svg]:w-8",
				xl: "[&>svg]:h-10 [&>svg]:w-10",
				"2xl": "[&>svg]:h-12 [&>svg]:w-12",
				"3xl": "[&>svg]:h-16 [&>svg]:w-16",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	},
);

/**
 * Defines the props for the Spinner component, combining standard HTML div attributes
 * with the custom variants defined above.
 */
export interface SpinnerProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof spinnerVariants> {}

/**
 * A flexible and accessible spinner component.
 * It uses `React.forwardRef` to allow a ref to be passed to the root `div` element.
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
	// FIX: Destructured the `size` prop to ensure size variants are applied.
	({ className, variant, size, ...props }, ref) => {
		return (
			// The `role="status"` attribute makes the component accessible to screen readers,
			// announcing a change of state when the spinner is present.
			// biome-ignore lint/a11y/useSemanticElements:don't care
			<div
				role="status"
				ref={ref}
				// FIX: Passed both `variant` and `size` to `spinnerVariants` to generate correct classes.
				className={cn(spinnerVariants({ variant, size }), className)}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 101"
					// The SVG is decorative and thus hidden from screen readers.
					aria-hidden="true"
					fill="none"
				>
					{/* Path 1: The track of the spinner. */}
					{/* `fill="currentColor"` makes this path inherit its color from the CSS `color` property, */}
					{/* which is set by Tailwind's `text-*` utility classes in the variants. */}
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					{/* Path 2: The moving arc of the spinner. */}
					{/* FIX: Removed the invalid `fill="currentFill"` attribute. This path now correctly */}
					{/* inherits its color from the parent SVG's `fill` property, which is set by */}
					{/* Tailwind's `fill-*` utility classes in the variants. */}
					<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
				</svg>
				{/* A visually hidden span provides a text alternative for screen readers. */}
				<span className="sr-only">Loading...</span>
			</div>
		);
	},
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
