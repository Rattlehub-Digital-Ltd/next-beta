"use client";

import { useGetProducts } from "@/api/services/dashboard/subscription/queries";
import { Spinner } from "@/components/ui/spinner";
import Product from "./product";

function Products() {
	const { data, isLoading, isError, error } = useGetProducts();

	return (
		<div className="flex flex-col gap-4">
			{data && (
				<ul className="space-y-4">
					{data.map((item) => (
						<li key={item.id}>
							<Product plan={item} isRecommended={true} currency="CA$" />
						</li>
					))}
				</ul>
			)}
			{isLoading && (
				<div className="flex h-full text-sm w-full items-center text-white/90 justify-center gap-2">
					<Spinner variant="dark" />
					Loading...
				</div>
			)}
			{isError && (
				<div className="flex h-full w-full text-sm text-white/90 text-pretty items-center justify-center">
					Something went wrong {error?.message}
				</div>
			)}
		</div>
	);
}

export default Products;
