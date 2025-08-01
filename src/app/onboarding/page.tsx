"use client";

import { useEffect, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Children from "@/features/onboarding/children";
import Dependents from "@/features/onboarding/dependents";
import Partner from "@/features/onboarding/partner";
import Summary from "@/features/onboarding/summary/summary";
import Pagination from "@/features/shared/pagination";

function OnboardingPage() {
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
		});
	}, [api]);

	return (
		<div className="h-full space-y-3 flex flex-col">
			<Carousel setApi={setApi} className="grow">
				<CarouselContent className="h-full">
					<CarouselItem className="h-full">
						<Partner />
					</CarouselItem>
					<CarouselItem className="h-full">
						<Children />
					</CarouselItem>
					<CarouselItem className="h-full">
						<Dependents />
					</CarouselItem>
					<CarouselItem className="h-full">
						<Summary />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
			<Pagination
				currentPage={current}
				totalPages={count}
				onPrevious={() => api?.scrollPrev()}
				onNext={() => api?.scrollNext()}
			/>
		</div>
	);
}

export default OnboardingPage;
