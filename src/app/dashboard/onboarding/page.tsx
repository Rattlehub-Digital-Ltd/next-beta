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
import EstateChecklist from "@/features/onboarding/estate-checklist/estate-checklist";
import Partner from "@/features/onboarding/partner";
import SummaryDialog from "@/features/onboarding/summary/summary-dialog";
import Pagination from "@/features/shared/pagination";

function OnboardingPage() {
	const { isOnboarded } = useOnboardingStore();

	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [summaryOpen, setSummaryOpen] = useState(false);

	const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
	const [prevButtonDisabled, setPrevButtonDisabled] = useState(false);

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

	useEffect(() => {
		console.log({ current, count });
		setPrevButtonDisabled(current === 1);
	}, [current, count]);

	if (isOnboarded) redirect("/dashboard");

	return (
		<div className="space-y-3 flex flex-col overflow-hidden">
			<Carousel setApi={setApi} className="flex">
				<CarouselContent className="flex">
					<CarouselItem>
						<Partner setNextButtonDisabled={setNextButtonDisabled} />
					</CarouselItem>
					<CarouselItem>
						<Children />
					</CarouselItem>
					<CarouselItem>
						<Dependents />
					</CarouselItem>
					<CarouselItem>
						<EstateChecklist />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
			<div className="fixed bottom-4 left-0 w-full z-50 px-4">
				<Pagination
					currentPage={current}
					totalPages={count}
					nextButtonDisabled={nextButtonDisabled}
					prevButtonDisabled={prevButtonDisabled}
					onPrevious={() => api?.scrollPrev()}
					onNext={() => {
						if (current === count) {
							setSummaryOpen(true);
						} else {
							api?.scrollNext();
						}
					}}
				/>
			</div>
			<SummaryDialog open={summaryOpen} onClose={() => setSummaryOpen(false)} />
		</div>
	);
}

export default OnboardingPage;
