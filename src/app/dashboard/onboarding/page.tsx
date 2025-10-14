"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useChildrenStore } from "store/use-children-store";
import { useDependentStore } from "store/use-dependent-store";
import { useDocumentStore } from "store/use-document-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { usePartnerStore } from "store/use-partner-store";
import { usePersonDrawerStore } from "store/use-person-drawer-store";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Children from "@/features/onboarding/children";
import Dependents from "@/features/onboarding/dependents";
import EstateChecklist from "@/features/onboarding/estate-checklist/estate-checklist";
import Intro from "@/features/onboarding/intro";
import Partner from "@/features/onboarding/partner";
// import SuccessDialog from "@/features/onboarding/success/success-dialog";
import SummaryDialog from "@/features/onboarding/summary/summary-dialog";
import Pagination from "@/features/shared/pagination";

function OnboardingPage() {
	const { setTitle, setType } = usePersonDrawerStore();

	const {
		isOnboarded,
		nextButtonDisabled,
		previoiusButtonDisabled,
		setPreviousButtonDisabled,
		setNextButtonDisabled,
	} = useOnboardingStore();

	const { has: hasChildren, children } = useChildrenStore();
	const { has: hasPartner, partner } = usePartnerStore();
	const { has: hasDependent, dependents } = useDependentStore();
	const { documents } = useDocumentStore();

	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [summaryOpen, setSummaryOpen] = useState(false);
	// const [successDialogOpen, setSuccessDialogOpen] = useState(false);

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
		// Partner
		setPreviousButtonDisabled(current === 1);

		if (current === 1) {
			setNextButtonDisabled(false);
		} else if (current === 2) {
			setTitle("Add Partner");
			setType("partner");

			if (
				hasPartner &&
				partner &&
				partner.length > 0 &&
				partner[0] &&
				partner[0].firstName !== "" &&
				partner[0].lastName !== ""
			) {
				setNextButtonDisabled(false);
			} else if (hasPartner === "no") {
				setNextButtonDisabled(false);
			} else {
				setNextButtonDisabled(true);
			}
		}
		// chuldren
		else if (current === 3) {
			setTitle("Add Child");
			setType("child");

			if (
				hasChildren &&
				children &&
				children?.length > 0 &&
				children.filter(
					(c) =>
						c.firstName === "" || c.lastName === "" || c.relationship === "",
				).length === 0
			) {
				setNextButtonDisabled(false);
			} else if (hasChildren === "no") {
				setNextButtonDisabled(false);
			} else {
				setNextButtonDisabled(true);
			}
		}
		// Dependents
		else if (current === 4) {
			setTitle("Add Dependent");
			setType("dependent");

			if (
				hasDependent === "yes" &&
				dependents &&
				dependents?.length > 0 &&
				dependents.filter(
					(c) =>
						c.firstName === "" || c.lastName === "" || c.relationship === "",
				).length === 0
			) {
				setNextButtonDisabled(false);
			} else if (hasDependent === "no") {
				setNextButtonDisabled(false);
			} else {
				setNextButtonDisabled(true);
			}
		}
		// Documents
		else if (current === 5) {
			if (
				documents &&
				documents.filter((d) => d.isApplicable === null).length === 0
			) {
				setNextButtonDisabled(false);
			} else {
				setNextButtonDisabled(true);
			}
		} else {
			setNextButtonDisabled(false);
		}
	}, [
		current,
		setPreviousButtonDisabled,
		setNextButtonDisabled,
		hasChildren,
		children,
		hasPartner,
		partner,
		hasDependent,
		dependents,
		documents,
		setTitle,
		setType,
	]);

	const scrollNext = () => {
		if (api) {
			api.scrollNext();
		}
	};

	if (isOnboarded && !summaryOpen) redirect("/dashboard");

	return (
		<div className="space-y-3 flex flex-col overflow-hidden">
			<Carousel
				setApi={setApi}
				opts={{ align: "start" }}
				className="w-full h-full"
			>
				<CarouselContent>
					<CarouselItem>
						<Intro />
					</CarouselItem>
					<CarouselItem>
						<Partner scrollNext={scrollNext} />
					</CarouselItem>
					<CarouselItem>
						<Children scrollNext={scrollNext} />
					</CarouselItem>
					<CarouselItem>
						<Dependents scrollNext={scrollNext} />
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
					prevButtonDisabled={previoiusButtonDisabled}
					showColor={true}
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
			<SummaryDialog
				open={summaryOpen}
				onClose={() => {
					// setSummaryOpen(false);
					// setSuccessDialogOpen(true);
				}}
			/>
			{/* <SuccessDialog open={successDialogOpen} onClose={setSuccessDialogOpen} /> */}
		</div>
	);
}

export default OnboardingPage;
