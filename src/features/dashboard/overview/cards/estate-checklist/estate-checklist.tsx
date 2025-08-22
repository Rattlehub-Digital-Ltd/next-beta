"use client";

import { useCallback, useEffect, useState } from "react";
import { useGetSettings } from "@/api/services/dashboard/onboarding/queries";
import type { EstateChecklistItem } from "@/api/services/dashboard/onboarding/types";
import SuggestionItem from "@/features/shared/suggestion-item";
import CustomAccordion from "./custom-accordion";

const title = "Estate Checklist";
const description =
	"Get started with your estate planning by completing this checklist.";

export default function EstateChecklist() {
	const { data, isLoading, isError, error } = useGetSettings();
	const [documents, setDocuments] = useState<EstateChecklistItem[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (data) {
			setDocuments(data);
		}
	}, [data]);

	const handleOnChange = useCallback((value: string, index: number) => {
		setDocuments((prevDocuments) => {
			const newDocuments = [...prevDocuments];
			const updatedDocument = { ...newDocuments[index], isApplicable: value };
			newDocuments[index] = updatedDocument;
			return newDocuments;
		});
	}, []);

	const handleOnNextPress = useCallback(
		(index: number) => {
			setCurrentIndex((_) => {
				const max = Math.max(0, documents.length - 1);
				return Math.max(0, Math.min(index, max));
			});
		},
		[documents.length],
	);

	// const handleOnNextPress = useCallback((index: number) => {
	// 	setCurrentIndex(index);
	// }, []);

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
