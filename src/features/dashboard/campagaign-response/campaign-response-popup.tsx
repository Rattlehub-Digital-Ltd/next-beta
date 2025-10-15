"use client";

import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import {
	useGetAdaptiveCard,
	useSubmitAdaptiveCardData,
} from "@/api/services/dashboard/queries";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdaptiveCardTemplate from "@/features/shared/adaptive-card/adaptive-card-template";
import Loading from "@/features/shared/loading";

type CampaignResponsePopupProps = {
	utm: string;
};

function CampaignResponsePopup({ utm }: CampaignResponsePopupProps) {
	const urlParams = new URLSearchParams(utm);
	const campaign = urlParams.get("utm_campaign");

	const submitAdaptiveCardData = useSubmitAdaptiveCardData();

	const { data, isLoading, isError, refetch } = useGetAdaptiveCard(
		campaign || "",
	);

	const [isOpen, setIsOpen] = useState(false);

	const fetchData = useCallback(async () => {
		if (!open || isLoading) return;

		await refetch();
	}, [refetch, isLoading]);

	useEffect(() => {
		if (utm === "" || !utm) return;

		try {
			console.log("campaign", campaign);

			if (campaign && campaign.toLowerCase() === "stay protected") {
				setIsOpen(true);
				fetchData();
			}

			const keys = [
				"utm_source",
				"utm_medium",
				"utm_campaign",
				"utm_term",
				"utm_content",
			];
			keys.forEach((key) => {
				const value = urlParams.get(key);
				if (value) {
					sessionStorage.setItem(key, value);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [campaign, fetchData, urlParams.get, utm]);

	const submit = useCallback(
		async (formData: FormData, isCancelButton: boolean, headers?: object) => {
			try {
				const header = headers ? (headers as object) : {};

				await submitAdaptiveCardData.mutateAsync({
					formData: formData,
					headers: header,
					referer: campaign || "",
				});
			} catch (error) {
				console.log(error);
			} finally {
				if (isCancelButton) {
					setIsOpen(false);
				} else {
					await refetch();
				}
			}
		},
		[submitAdaptiveCardData.mutateAsync, campaign, refetch],
	);

	if (utm === "" || !utm)
		// https://dev.nextdot.app/dashboard?utm_campaign=Stay+Protected&utm_content=Stay+Updated&utm_medium=email_action&utm_source=customer.io
		// http://localhost:3000/dashboard?utm_campaign=Stay+Protected&utm_content=Stay+Updated&utm_medium=email_action&utm_source=customer.io

		return;

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className="h-[95vh] rounded-3xl gap-2 px-0 bg-white/85 backdrop-blur-[14px] outline-gray-100">
				<AlertDialogHeader className="px-6">
					<AlertDialogTitle className="text-left flex items-center gap-2">
						<Icon icon="fluent-color:shield-24" height={24} width={24} />
						Stay Protected
					</AlertDialogTitle>
					<AlertDialogDescription className="text-left">
						Good job on responding to the email, here are those 3 actions you
						needed to complete
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="flex flex-col grow overflow-y-auto pt-4">
					{(isLoading || submitAdaptiveCardData.isPending) && (
						<Loading className="rounded-3xl overflow-hidden" />
					)}
					{!isLoading && (
						<AdaptiveCardTemplate
							card={data?.itemListElement?.card}
							submit={submit}
						/>
					)}

					{/* Fetching data error */}
					{isError && (
						<p className="text-[13px] pl-14 text-muted-foreground">
							Error fetching data
						</p>
					)}
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default CampaignResponsePopup;
