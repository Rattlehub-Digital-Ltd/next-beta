"use client";

import * as motion from "motion/react-client";
import { useState } from "react";
import { useSubmitAdaptiveCardData } from "@/api/services/dashboard/queries";
// import {
// 	AlertDialog,
// 	AlertDialogAction,
// 	AlertDialogCancel,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";
import { cn } from "@/lib/utils";
import type { ActionItem } from "@/types/action-item";

type CardFooterProps = {
	recordId: string;
	children: React.ReactNode;
	item: ActionItem;
	refresh: () => void;
};

export default function CardFooter({
	item,
	recordId,
	children,
	refresh,
}: CardFooterProps) {
	const submitAdaptiveCard = useSubmitAdaptiveCardData();
	// const advanceAdaptiveCard = useAutoAdvanceAdaptiveCard();

	const [isBusy, setIsBusy] = useState(false);
	// biome-ignore lint/suspicious/noExplicitAny: dynamic object
	const [cards, setCards] = useState<any | undefined>();

	// async function handleNoResponse(id: string, value: boolean) {
	// 	if (id === "") {
	// 		toast.error("Invalid document ID");
	// 		return "";
	// 	}

	// 	setIsBusy(true);

	// 	try {
	// 		const form = new FormData();
	// 		form.set(id, value.toString());

	// 		const headers: Record<string, string> = {};
	// 		headers["x-record-identifier"] = id;

	// 		const response = await advanceAdaptiveCard.mutateAsync({
	// 			formData: form,
	// 			headers: headers,
	// 			referer: "actions",
	// 			recordId: id,
	// 		});

	// 		if (!response) {
	// 			toast.error("Failed to delete document");
	// 			return "";
	// 		}
	// 	} catch (error) {
	// 		console.error("Error during auto-advance:", error);
	// 		return "";
	// 	} finally {
	// 		setIsBusy(false);
	// 	}

	// 	return id;
	// }

	// const noResponseMutation = useMutation({
	// 	mutationFn: async ({ id, value }: { id: string; value: boolean }) => {
	// 		await handleNoResponse(id, value);
	// 		return { id, value };
	// 	},
	// 	onSuccess: ({ id, value }) => {
	// 		toast.success("Answer submitted successfully");
	// 		queryClient.invalidateQueries({
	// 			queryKey: [...queryKeys.documents.byId(id), value],
	// 		});
	// 		queryClient.invalidateQueries({
	// 			queryKey: [...queryKeys.documents.all, value],
	// 		});
	// 	},
	// 	onError: () => {
	// 		toast.error("An error occured, please try again");
	// 	},
	// });

	if (item.nextAction.type === "Applicable") {
		if (item.nextAction.inputs?.length > 2) {
			return <div>Replace this</div>;
		} else {
			return (
				<div className="px-4 space-y-6">
					<div className="text-xs px-2">{children}</div>
					<ul>
						{item.nextAction.inputs.map((input) => {
							return (
								<li key={input.identifier}>
									<div className="grid grid-cols-2 gap-2">
										{input.values.map(({ name, value }) => (
											<motion.div
												key={name}
												className="w-full"
												whileTap={{ scale: 0.95 }}
											>
												<AdaptiveCardButton
													isBusy={isBusy}
													cards={cards}
													autoSubmit={true}
													recordId={recordId}
													referer="actions"
													refresh={refresh}
												>
													<Button
														className={cn(
															"w-full rounded-2xl border px-6 disabled:opacity-80 bg-white shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]",
															{ "bg-black/5": name === "Yes" },
														)}
														size="sm"
														variant="ghost"
														disabled={isBusy}
														onClick={async () => {
															setIsBusy(true);

															const form = new FormData();
															form.set(recordId, value);

															const headers: Record<string, string> = {};
															headers["x-record-identifier"] = recordId;

															const resp = await submitAdaptiveCard.mutateAsync(
																{
																	formData: form,
																	headers: headers,
																	referer: "actions",
																	recordId,
																},
															);

															if (resp?.data) setCards(resp.data);

															setIsBusy(false);
														}}
													>
														{name}
													</Button>
												</AdaptiveCardButton>
											</motion.div>
										))}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}
	} else {
		return (
			<div className="px-4">
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<AdaptiveCardButton
						autoSubmit={true}
						recordId={recordId}
						referer="actions"
						refresh={refresh}
					>
						<Button
							className="w-full rounded-2xl border px-6 disabled:opacity-80 bg-white shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]"
							size="sm"
							variant="ghost"
							disabled={isBusy}
						>
							Continue
						</Button>
					</AdaptiveCardButton>
				</motion.div>
			</div>
		);
	}

	// return (
	// 	<div className="px-4 space-y-6">
	// 		<p className="text-xs px-2">{children}</p>
	// 		<div className="grid grid-cols-2 gap-2">
	// 			<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
	// 				<AdaptiveCardButton
	// 					autoSubmit={true}
	// 					recordId={recordId}
	// 					referer="actions"
	// 					refresh={refresh}
	// 				>
	// 					<Button
	// 						className="w-full rounded-2xl px-6 bg-black/5"
	// 						size="sm"
	// 						variant="ghost"
	// 						disabled={isBusy}
	// 						onClick={async () => {
	// 							setIsBusy(true);

	// 							const form = new FormData();
	// 							form.set(recordId, "true");

	// 							const headers: Record<string, string> = {};
	// 							headers["x-record-identifier"] = recordId;

	// 							await submitAdaptiveCard.mutateAsync({
	// 								formData: form,
	// 								headers: headers,
	// 								referer: "actions",
	// 								recordId,
	// 							});

	// 							setIsBusy(false);
	// 						}}
	// 					>
	// 						Yes
	// 					</Button>
	// 				</AdaptiveCardButton>
	// 			</motion.div>
	// 			<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
	// 				<Button
	// 					className="px-6 rounded-2xl w-full disabled:opacity-80"
	// 					variant="outline"
	// 					size="sm"
	// 					disabled={isBusy}
	// 					onClick={() =>
	// 						noResponseMutation.mutate({
	// 							id: recordId,
	// 							value: false,
	// 						})
	// 					}
	// 				>
	// 					{isBusy ? (
	// 						<span className="text-[13px] text-muted-foreground">
	// 							Processing...
	// 						</span>
	// 					) : (
	// 						"No"
	// 					)}
	// 				</Button>
	// 				{/* <AlertDialog>
	// 					<AlertDialogTrigger asChild>
	// 						<Button
	// 							className="px-6 rounded-2xl w-full disabled:opacity-80"
	// 							variant="outline"
	// 							size="sm"
	// 							disabled={isBusy}
	// 						>
	// 							{isBusy ? (
	// 								<span className="text-[13px] text-muted-foreground">
	// 									Processing...
	// 								</span>
	// 							) : (
	// 								"No"
	// 							)}
	// 						</Button>
	// 					</AlertDialogTrigger>
	// 					<AlertDialogContent>
	// 						<AlertDialogHeader>
	// 							<AlertDialogTitle>Are you sure you don't need this item?</AlertDialogTitle>
	// 							<AlertDialogDescription>
	// 								This action cannot be undone. This will permanently delete the
	// 								document.
	// 							</AlertDialogDescription>
	// 						</AlertDialogHeader>
	// 						<AlertDialogFooter>
	// 							<AlertDialogCancel>Cancel</AlertDialogCancel>
	// 							<AlertDialogAction
	// 								onClick={async () =>
	// 									await noResponseMutation.mutateAsync(recordId)
	// 								}
	// 							>
	// 								I am sure
	// 							</AlertDialogAction>
	// 						</AlertDialogFooter>
	// 					</AlertDialogContent>
	// 				</AlertDialog> */}
	// 			</motion.div>
	// 		</div>
	// 	</div>
	// );
}
