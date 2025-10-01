"use client";

import { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Pagination from "@/features/shared/pagination";
import type { RiskItemProps } from "@/types/risk-item-props";
import RiskItem from "./risk-item";

type RiskCarouselProps = {
	items: RiskItemProps[];
	onRiskItemChange?: (index: number) => void;
};

const uid = new ShortUniqueId();

export default function RiskCarousel({
	items,
	onRiskItemChange,
}: RiskCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
			onRiskItemChange?.(api.selectedScrollSnap());
		});
	}, [api, onRiskItemChange]);

	return (
		<div className="space-y-2 flex flex-col">
			<Carousel
				setApi={setApi}
				opts={{
					align: "start",
					loop: true,
				}}
			>
				<CarouselContent>
					{items.map(({ category, goalName, eduText }) => (
						<CarouselItem key={uid.randomUUID()}>
							<RiskItem
								category={category}
								goalName={goalName}
								eduText={eduText}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<Pagination
				nextButtonDisabled={false}
				prevButtonDisabled={false}
				currentPage={current}
				className="!bg-gray-100 !border-none !shadow-none"
				totalPages={count}
				onPrevious={() => api?.scrollPrev()}
				onNext={() => api?.scrollNext()}
			/>
		</div>
	);
}

RiskCarousel.defaultProps = {
	items: [
		{
			category: "Protection",
			goalName: "Estate Liquidity",
			eduText:
				"Without clear confirmation of bank account details, critical estate funds may remain inaccessible, leaving bills, debts, or taxes unpaid, and exposing heirs to financial strain.",
		},
		{
			category: "Delay",
			goalName: "Estate Liquidity",
			eduText:
				"Executors could face delays in locating accounts, navigating bureaucracy, or proving ownership, slowing down the estate settlement process.",
		},
		{
			category: "Cost",
			goalName: "Estate Liquidity",
			eduText:
				"Legal fees may rise as professionals are hired to trace accounts, while emotional stress mounts for loved ones trying to make sense of financial gaps.",
		},
		{
			category: "Protection",
			goalName: "Legacy",
			eduText:
				"Without clear banking information, accounts could remain frozen, leaving loved ones without access to funds for immediate needs like bills, medical expenses, or funeral costs.",
		},
		{
			category: "Delay",
			goalName: "Legacy",
			eduText:
				"The estate's settlement process slows down as executors or heirs struggle to locate accounts and verify balances, potentially dragging on for months.",
		},
		{
			category: "Cost",
			goalName: "Legacy",
			eduText:
				"Additional legal fees and administrative costs arise as professionals are hired to track down missing account details, while families endure unnecessary stress and uncertainty.",
		},
		{
			category: "Protection",
			goalName: "Legacy",
			eduText:
				"Without confirmation letters, bank accounts may remain hidden or inaccessible, leaving funds unprotected and vulnerable to being overlooked.",
		},
		{
			category: "Delay",
			goalName: "Legacy",
			eduText:
				"Executors may face lengthy delays piecing together account details or navigating bank red tape, slowing down the transfer of funds to beneficiaries.",
		},
		{
			category: "Cost",
			goalName: "Legacy",
			eduText:
				"Unnecessary legal fees and emotional strain can arise from trying to access accounts without proper documentation, creating financial and emotional stress for loved ones.",
		},
	],
};
