"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useChildrenStore } from "store/use-children-store";
import { useDependentStore } from "store/use-dependent-store";
import { useDocumentStore } from "store/use-document-store";
import { usePartnerStore } from "store/use-partner-store";
import { useSubmitOnboardingData } from "@/api/services/dashboard/onboarding/queries";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SuccessDialog from "../success/success-dialog";
import Summary from "./summary";

type SummaryDialogProps = {
	open: boolean;
	onClose: () => void;
};

export default function SummaryDialog({ open, onClose }: SummaryDialogProps) {
	const submitOnboarding = useSubmitOnboardingData();

	const { partner } = usePartnerStore();
	const { children } = useChildrenStore();
	const { dependents } = useDependentStore();
	const { documents } = useDocumentStore();

	const [successDialogOpen, setSuccessDialogOpen] = useState(false);

	const handleSubmit = async () => {
		await submitOnboarding.mutateAsync(
			{
				payload: {
					partner: partner
						? {
								name: partner[0].firstName,
								surname: partner[0].lastName,
							}
						: null,
					children:
						children?.map((item) => ({
							relationship: item.relationship,
							name: item.firstName,
							surname: item.lastName,
						})) || [],
					dependents:
						dependents?.map((item) => ({
							relationship: item.relationship,
							name: item.firstName,
							surname: item.lastName,
						})) || [],
					settings: documents.map((doc) => ({
						id: doc.id,
						isApplicable:
							doc.isApplicable === "yes"
								? true
								: doc.isApplicable === "no"
									? false
									: null,
					})),
				},
			},
			{
				onSuccess: () => {
					onClose();
					setSuccessDialogOpen(true);
				},
				onError: (error) => {
					console.error("Error submitting onboarding data:", error);
					toast(error.name || "Uh oh! Something went wrong.", {
						description:
							error.message || "There was a problem with your request.",
						className: "bg-red-500 text-white rounded-2xl",
					});
				},
			},
		);
	};

	return (
		<>
			<AlertDialog open={open} onOpenChange={onClose}>
				<AlertDialogContent className="h-[85svh] overflow-y-auto rounded-3xl py-0">
					<AlertDialogHeader className="sticky top-0 left-0 py-4 bg-white/50 backdrop-blur-md z-10">
						<AlertDialogTitle className="text-lg font-bold text-left">
							Summary
						</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-left leading-5 text-[#616161] text-pretty">
							A summary of all the details you have provided. Please carefully
							review for any mistakes or inconsistencies.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grow">
						<Summary />
					</div>
					<AlertDialogFooter className="sticky bottom-0 left-0 bg-white/50 backdrop-blur-md py-4 z-10">
						<AlertDialogCancel disabled={submitOnboarding.isPending}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							disabled={submitOnboarding.isPending}
							className="disabled:opacity-70"
							onClick={handleSubmit}
						>
							{submitOnboarding.isPending ? "Submitting..." : "Submit"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<SuccessDialog open={successDialogOpen} onClose={setSuccessDialogOpen} />
		</>
	);
}
