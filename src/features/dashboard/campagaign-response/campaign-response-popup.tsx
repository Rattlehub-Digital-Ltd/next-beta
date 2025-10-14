"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { useGetCampaignDocuments } from "@/api/services/dashboard/queries";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import { track } from "@/lib/analytics";
import { cardVariants } from "@/motion";
import type { ActionItem } from "@/types/action-item";
import { LoadingSkeleton } from "../tabs/actions-tab";
import CardFooter from "../tabs/card-footer";

type CampaignResponsePopupProps = {
	utm: string;
};

const uid = new ShortUniqueId({ length: 10 });

function CampaignResponsePopup({ utm }: CampaignResponsePopupProps) {
	const urlParams = new URLSearchParams(utm);
	const campaign = urlParams.get("utm_campaign");

	const { data, isLoading, isError, refetch } = useGetCampaignDocuments(
		campaign ?? "",
	);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (utm === "" || !utm) return;

		try {
			console.log("campaign", campaign);

			if (campaign && campaign.toLowerCase() === "stay protected") {
				setIsOpen(true);
				refetch();
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
	}, [campaign, refetch, urlParams.get, utm]);

	const handleOnRiskItemChange = useCallback(
		(index: number, item: ActionItem) => {
			const value = item.riskItems[index];

			if (!value) return;

			track("swiped_carousel", {
				item: item.displayName,
				record_identifier: item.id,
				risk_category: value.category,
				goal_name: value.goalName,
			});
		},
		[],
	);

	if (utm === "" || !utm)
		// https://dev.nextdot.app/dashboard?utm_campaign=Stay+Protected&utm_content=Stay+Updated&utm_medium=email_action&utm_source=customer.io
		// http://localhost:3000/dashboard?utm_campaign=Stay+Protected&utm_content=Stay+Updated&utm_medium=email_action&utm_source=customer.io

		return;

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className="h-[90vh] rounded-2xl px-0 bg-white/85 backdrop-blur-[14px] outline-gray-100">
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
				<div className="flex flex-col grow overflow-y-auto px-6">
					{isLoading &&
						Array.from({ length: 3 }).map(() => (
							<LoadingSkeleton key={uid.randomUUID()} />
						))}

					{data && (
						<ul className="space-y-4">
							{data?.items.map((item) => {
								const { id, displayName, eduText, riskItems } = item;

								return (
									<motion.li
										key={id}
										initial="offscreen"
										whileInView="onscreen"
										viewport={{ amount: 0.2 }}
									>
										<motion.div
											id={id}
											variants={cardVariants}
											className="flex flex-col space-y-3 py-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]"
										>
											<div className="px-4">
												<SuggestionItem
													title={displayName}
													description={eduText}
													showReminder={false}
													color="teal"
													owner={item.ownerDisplayName}
												/>
											</div>

											<div className="px-4">
												<RiskCarousel
													items={riskItems}
													className="!bg-white !border-none !shadow-none"
													onRiskItemChange={(index: number) =>
														handleOnRiskItemChange(index, item)
													}
												/>
											</div>

											<Separator className="bg-black/5 px-4" />
											<CardFooter item={item} recordId={id} refresh={refetch}>
												<span className="font-normal">
													Do you have a{" "}
													<span className="font-semibold">
														{item.displayName}
													</span>{" "}
													in place?
												</span>
											</CardFooter>
										</motion.div>
									</motion.li>
								);
							})}
						</ul>
					)}

					{/* Fetching data error */}
					{isError && (
						<p className="text-[13px] pl-14 text-muted-foreground">
							Error fetching data
						</p>
					)}
				</div>
				<AlertDialogFooter className="px-6">
					<AlertDialogAction
						// disabled={
						// 	data?.items.filter((item) => item.isComplete === false).length ===
						// 	0
						// }
						onClick={() => setIsOpen(false)}
					>
						Done
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default CampaignResponsePopup;
