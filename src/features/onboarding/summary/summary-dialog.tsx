"use client";

import { RedirectType, redirect } from "next/navigation";
import { useCallback, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { toast } from "sonner";
import { useChildrenStore } from "store/use-children-store";
import { useDependentStore } from "store/use-dependent-store";
import { useDocumentStore } from "store/use-document-store";
import { useOnboardingStore } from "store/use-onboarding-store";
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
import { OptimizedImage } from "@/features/shared/optimized-image";
import { cn } from "@/lib/utils";
import { SparkleIcon } from "@/styles/icons";
import Summary from "./summary";

type SummaryDialogProps = {
	open: boolean;
	onClose: () => void;
};

export default function SummaryDialog({ open, onClose }: SummaryDialogProps) {
	const { setIsOnboarded } = useOnboardingStore();
	const { width } = useWindowSize();

	const submitOnboarding = useSubmitOnboardingData();

	const { partner } = usePartnerStore();
	const { children } = useChildrenStore();
	const { dependents } = useDependentStore();
	const { documents } = useDocumentStore();

	const [isComplete, setIsComplete] = useState(false);

	const handleSubmit = useCallback(async () => {
		try {
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
						toast.success("Onboarding completed successfully.");
						setIsOnboarded(true);
						// setRedirectToDashboard(true);
						//onClose();
						setIsComplete(true);
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
		} catch (error) {
			console.log(error);
		}
	}, [
		children?.map,
		dependents?.map,
		documents,
		// onClose,
		partner,
		setIsOnboarded,
		submitOnboarding.mutateAsync,
		// setRedirectToDashboard,
	]);

	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent
				className={cn("overflow-y-auto rounded-3xl py-0", {
					"h-[85svh]": !isComplete,
					"h-auto overflow-hidden": isComplete,
				})}
			>
				<AlertDialogHeader className="sticky top-0 left-0 py-4 bg-white/50 backdrop-blur-md z-10">
					<AlertDialogTitle className="text-lg font-bold text-left">
						{isComplete ? "Success" : "Summary"}
					</AlertDialogTitle>
					<AlertDialogDescription className="text-sm text-left leading-5 text-[#616161] text-pretty">
						{isComplete
							? "Successfuly completed onboarding. Click continue to view your dashboard."
							: "A summary of all the details you have provided. Please carefully review for any mistakes or inconsistencies."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div
					className={cn("grow w-full", {
						"opacity-75": submitOnboarding.isPending,
					})}
				>
					{!isComplete && <Summary />}
					{isComplete && (
						<div className="w-full h-full overflow-hidden flex flex-col">
							<div className="flex items-center justify-center w-full pt-4 pb-4 overflow-hidden">
								<div>
									<OptimizedImage
										alt=""
										height={220}
										src="/images/families-rafiki.svg"
										width={220}
									/>
								</div>
							</div>
							<div className="mx-auto space-y-1 text-center">
								<h4 className="text-xl font-semibold text-pretty">
									Great job!
								</h4>
								<p className="text-sm leading-5 max-w-[300px] tracking-wide text-neutral-600 text-pretty">
									Trust us—one day, your family's going to look back and smile
									big time!
								</p>
							</div>
							<ReactConfetti
								className="relative z-10"
								height={window.screen.height}
								width={width}
							/>
						</div>
					)}
				</div>
				<AlertDialogFooter className="sticky bottom-0 left-0 bg-white/50 backdrop-blur-md py-4 z-10">
					{!isComplete && (
						<AlertDialogCancel disabled={submitOnboarding.isPending}>
							Cancel
						</AlertDialogCancel>
					)}
					{!isComplete && (
						<AlertDialogAction
							disabled={submitOnboarding.isPending}
							className="disabled:opacity-70"
							onClick={handleSubmit}
						>
							{submitOnboarding.isPending ? "Submitting..." : "Submit"}
						</AlertDialogAction>
					)}
					{isComplete && (
						<AlertDialogAction
							className="rounded-full h-10"
							onClick={() => {
								// setRedirectToDashboard(true);
								redirect("/dashboard", RedirectType.replace);
								//onClose(false);
							}}
						>
							<SparkleIcon />
							Continue to dashboard
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
