import ShortUniqueId from "short-unique-id";
import { useSubscribeToProduct } from "@/api/services/dashboard/subscription/queries";
import type { ProductPlan } from "@/api/services/dashboard/subscription/types";
import { Button } from "@/components/ui/button";

interface ProductProps {
	plan: ProductPlan;
	isRecommended?: boolean;
	currency?: string;
}

const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className="w-4 h-4 text-[#c9a957]"
	>
		<title>Checkmark Icon</title>
		<path
			fillRule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
			clipRule="evenodd"
		/>
	</svg>
);

const uid = new ShortUniqueId();

const Product: React.FC<ProductProps> = ({
	plan,
	isRecommended = false,
	currency = "CA$",
}) => {
	const subscribeToPlan = useSubscribeToProduct();

	return (
		// Main card container
		<div className="flex flex-col gap-4 rounded-[36px] bg-[#ffffff1a] p-8 border border-white/20 text-white shadow-lg max-w-sm">
			<div className="space-y-4">
				{isRecommended && (
					<div className="flex">
						<p className="self-start rounded-full bg-[#00000033] px-1.5 py-0.5 text-xs font-semibold">
							Recommended
						</p>
					</div>
				)}
				<h2 className="text-xl font-semibold text-pretty ml-0.5">
					{plan.name}
				</h2>
			</div>

			<p className="text-sm text-white/70">{plan.description}</p>

			{/* Price section */}
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-4xl font-bold">
					{currency}
					{plan.price}
				</span>
				<span className="text-[13px] text-white/70">
					{plan.frequency.summary}
				</span>
			</div>

			{/* Features list */}
			<ul className="mt-4 flex flex-col gap-3">
				{plan.features.map((feature) => (
					<li
						key={uid.randomUUID()}
						className="flex items-center gap-2 text-sm"
					>
						<CheckIcon />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			{/* Action Button */}
			<Button
				size="default"
				className="mt-6 w-full h-11 rounded-full py-3 bg-[#ceaa40] font-bold text-gray-900 transition-colors hover:bg-[#b89849]"
				onClick={async () => {
					await subscribeToPlan.mutateAsync({ id: plan.id });
				}}
			>
				{plan.subscribed ? "Manage Subscription" : "Start Trial"}
			</Button>
		</div>
	);
};

export default Product;
