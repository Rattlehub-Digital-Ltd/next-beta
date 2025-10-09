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

	const [isBusy, setIsBusy] = useState(false);
	// biome-ignore lint/suspicious/noExplicitAny: dynamic object
	const [cards, setCards] = useState<any | undefined>();

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
													clearCards={() => setCards(undefined)}
												>
													<Button
														className={cn(
															"w-full rounded-2xl border px-6 disabled:opacity-80 bg-white shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]",
															{ "bg-blue-600 text-white/90": name === "Yes" },
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
						currentActionItem={item}
						recordId={recordId}
						referer="actions"
						refresh={refresh}
					>
						<Button
							className="w-full rounded-2xl border px-6 disabled:opacity-80 bg-blue-600 hover:bg-blue-500 hover:text-white active:bg-blue-700 text-white shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]"
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
}
