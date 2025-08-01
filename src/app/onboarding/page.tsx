"use client";

// import { useEffect, useState } from "react";
import {
	Carousel,
	// type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Children from "@/features/onboarding/children";
import Dependents from "@/features/onboarding/dependents";
import Partner from "@/features/onboarding/partner";
// import Pagination from "@/features/shared/pagination";

function OnboardingPage() {
	// const [api, setApi] = useState<CarouselApi>();
	// const [current, setCurrent] = useState(0);
	// const [count, setCount] = useState(0);

	return (
		<div className="h-full space-y-3 flex flex-col">
			<Carousel className="grow">
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
				</CarouselContent>
			</Carousel>
			{/* <Pagination
				currentPage={current}
				totalPages={count}
				onPrevious={() => api?.scrollPrev()}
				onNext={() => api?.scrollNext()}
			/> */}
		</div>
	);
}

export default OnboardingPage;
