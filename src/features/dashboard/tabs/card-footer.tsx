"use client";

import { useMutation } from "@tanstack/react-query";
import * as motion from "motion/react-client";
import { useState } from "react";
import { toast } from "sonner";
import { queryKeys } from "@/api/queryClient";
import { useAutoAdvanceAdaptiveCard } from "@/api/services/dashboard/queries";
import { queryClient } from "@/app/providers";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";

type CardFooterProps = {
	recordId: string;
	children: React.ReactNode;
	refresh: () => void;
};

export default function CardFooter({
	recordId,
	children,
	refresh,
}: CardFooterProps) {
	const form = new FormData();
	form.set(recordId ?? "", recordId ?? "");
	const { refetch } = useAutoAdvanceAdaptiveCard(form);

	const [isBusy, setIsBusy] = useState(false);

	async function handleNoResponse(id: string) {
		if (id === "") {
			toast.error("Invalid document ID");
			return "";
		}

		setIsBusy(true);

		try {
			const response = await refetch();

			if (!response) {
				toast.error("Failed to delete document");
				return "";
			}
		} catch (error) {
			console.error("Error during auto-advance:", error);
			return "";
		} finally {
			setIsBusy(false);
		}

		return id;
	}

	const noResponseMutation = useMutation({
		mutationFn: async (id: string) => await handleNoResponse(id),
		onSuccess: (id) => {
			toast.success("Answer submitted successfully");
			queryClient.invalidateQueries({ queryKey: queryKeys.documents.byId(id) });
			queryClient.invalidateQueries({ queryKey: queryKeys.documents.all });
		},
		onError: () => {
			toast.error("An error occured, please try again");
		},
	});

	return (
		<div className="px-4 space-y-6">
			<p className="text-xs px-2">{children}</p>
			<div className="grid grid-cols-2 gap-2">
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<AdaptiveCardButton
						autoSubmit={true}
						recordId={recordId}
						referer="actions"
						refresh={refresh}
					>
						<Button
							className="w-full rounded-2xl px-6 bg-black/10"
							size="sm"
							variant="ghost"
							disabled={isBusy}
						>
							Yes
						</Button>
					</AdaptiveCardButton>
				</motion.div>
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								className="px-6 rounded-2xl w-full disabled:opacity-80"
								variant="outline"
								size="sm"
								disabled={isBusy}
							>
								{isBusy ? (
									<span className="text-[13px] text-muted-foreground">
										Processing...
									</span>
								) : (
									"No"
								)}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete the
									document.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={async () =>
										await noResponseMutation.mutateAsync(recordId ?? "")
									}
								>
									I am sure
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</motion.div>
			</div>
		</div>
	);
}
