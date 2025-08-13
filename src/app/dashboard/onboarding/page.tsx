"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "store/use-onboarding-store";
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
	const { isOnboarded } = useOnboardingStore();

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

	if (isOnboarded) redirect("/dashboard");

	return (
		<div className="space-y-3 flex flex-col overflow-hidden">
			<Carousel setApi={setApi}>
				<CarouselContent>
					<CarouselItem>
						<Partner />
					</CarouselItem>
					<CarouselItem>
						<Children />
					</CarouselItem>
					<CarouselItem>
						<Dependents />
					</CarouselItem>
					{/* <CarouselItem>
						<Summary />
					</CarouselItem> */}
				</CarouselContent>
			</Carousel>
			<div className="fixed bottom-4 left-0 w-full z-50 px-4">
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
