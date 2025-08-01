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
// import Summary from "@/features/onboarding/summary/summary";
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
		<div className="grow space-y-3 flex flex-col overflow-hidden">
			<div className="grow overflow-hidden flex flex-col pb-1">
				<Carousel setApi={setApi} className="h-full">
					<CarouselContent className="h-full">
						<CarouselItem className="overflow-hidden">
							<Partner />
						</CarouselItem>
						<CarouselItem className="overflow-hidden">
							<Children />
						</CarouselItem>
						<CarouselItem className="overflow-hidden">
							<Dependents />
						</CarouselItem>
						{/* <CarouselItem className="h-full overflow-hidden">
							<Summary />
						</CarouselItem> */}
					</CarouselContent>
				</Carousel>
			</div>
			<div className="sticky bottom-0 left-0 w-full z-10">
				<Pagination
					currentPage={current}
					totalPages={count}
					onPrevious={() => api?.scrollPrev()}
					onNext={() => api?.scrollNext()}
				/>
			</div>
		</div>
	);
}

export default OnboardingPage;
