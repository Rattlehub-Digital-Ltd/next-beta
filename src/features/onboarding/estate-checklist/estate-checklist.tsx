"use client";

import { useCallback, useEffect, useState } from "react";
import { useDocumentStore } from "store/use-document-store";
import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetSettings } from "@/api/services/dashboard/onboarding/queries";
import SuggestionItem from "@/features/shared/suggestion-item";
import CustomAccordion from "./custom-accordion";

const title = "Estate Checklist";
const description =
	"Get started with your estate planning by completing this checklist.";

export default function EstateChecklist() {
	const { data, isLoading, isError, error } = useGetSettings();
	const { setNextButtonDisabled } = useOnboardingStore();
	const { documents, setDocuments } = useDocumentStore();

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (data && documents.length === 0) {
			const filtered = data.filter(
				(d) =>
					!d.name?.toLowerCase().includes("child") &&
					!(d.displayName ?? "").toLowerCase().includes("spouse") &&
					!(d.displayName ?? "").toLowerCase().includes("dependent"),
			);
			setDocuments(filtered);
		}
	}, [data, documents, setDocuments]);

	useEffect(() => {
		if (
			documents &&
			documents.filter((d) => d.isApplicable === null).length === 0
		) {
			setNextButtonDisabled(false);
		} else {
			setNextButtonDisabled(true);
		}
	}, [documents, setNextButtonDisabled]);

	const handleOnChange = useCallback(
		(value: string, index: number) => {
			const newDocuments = [...documents];
			const updatedDocument = { ...newDocuments[index], isApplicable: value };
			newDocuments[index] = updatedDocument;

			setDocuments(newDocuments);
		},
		[documents, setDocuments],
	);

	const handleOnNextPress = useCallback(
		(index: number) => {
			setCurrentIndex((_) => {
				const max = Math.max(0, documents.length - 1);
				return Math.max(0, Math.min(index, max));
			});
		},
		[documents.length],
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error?.message}</div>;
	}

	return (
		<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<SuggestionItem
				title={title}
				description={description}
				showReminder={false}
				color="purple"
			/>
			<CustomAccordion
				readOnly={false}
				currentIndex={currentIndex}
				data={documents}
				onChange={handleOnChange}
				onNextPress={handleOnNextPress}
			/>
		</div>
	);
}
