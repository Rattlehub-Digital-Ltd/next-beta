/** biome-ignore-all lint/suspicious/noExplicitAny: true */

import { VisuallyHidden } from "@react-aria/visually-hidden";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { useGetAdaptiveCard } from "@/api/services/dashboard/queries";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import useApi from "@/hooks/use-api";
import type { Document } from "@/types/document";
import AdaptiveCardTemplate from "./adaptive-card-template";

type Props = {
	currentDocument?: Document;
	recordId?: string;
	referer: string;
	children: ReactNode;
	defaultOpen?: boolean;
	refresh: () => void;
};

const uid = new ShortUniqueId();

const Loading = () => (
	<div className="w-full h-full px-4">
		<ul className="space-y-8">
			{new Array(4).fill(true).map(() => (
				<li key={uid.randomUUID()}>
					<div className="space-y-3">
						<Skeleton className="rounded-lg h-8 bg-black/10" />
						<div className="space-y-2">
							<Skeleton className="w-4/5 h-2 rounded-lg bg-black/10" />
							<Skeleton className="w-3/5 h-2 rounded-lg bg-black/10" />
							<Skeleton className="w-2/5 h-2 rounded-lg bg-black/10" />
						</div>
					</div>
				</li>
			))}
		</ul>
	</div>
);

const ErrorComp = () => (
	<div className="flex flex-col items-center justify-center w-full h-full px-8 py-8 space-y-4 text-center">
		<div>
			<Image src="/empty_state_3.svg" alt="" height={192} width={192} />
		</div>
		<p className="text-[13px] text-neutral-600">
			Oops, something went wrong! Please check your network connection or try
			again later.
		</p>
	</div>
);

function AdaptiveCardButton({
	recordId,
	referer,
	children,
	defaultOpen,
	refresh,
}: Props) {
	const { data, isLoading, isError, refetch } = useGetAdaptiveCard(
		referer,
		recordId,
	);
	const { submitAdaptiveCard } = useApi();

	const [isProcessing, setIsProcessing] = useState(false);
	const [open, setOpen] = useState(defaultOpen);

	const onSubmit = async (
		formData: FormData,
		isCancelButton: boolean,
		headers?: unknown,
	) => {
		setIsProcessing(true);

		const header = headers ? (headers as object) : {};
		if (recordId) {
			// If recordId is provided, include it in the headers
			(header as Record<string, string>)["x-record-identifier"] = recordId;
		}

		await submitAdaptiveCard(formData, header);

		refetch({});

		if (isCancelButton) {
			setIsProcessing(false);
			setOpen(false);
			refresh();
		}

		setIsProcessing(false);
	};

	return (
		<Drawer open={open} onOpenChange={setOpen} onClose={refresh}>
			<DrawerTrigger asChild className="flex justify-center w-full">
				{children}
			</DrawerTrigger>
			<DrawerContent className="max-h-[95svh] flex flex-col items-center min-h-[80svh] h-full pb-4 !rounded-t-3xl">
				<VisuallyHidden>
					<DrawerHeader className="sticky top-0 z-20 w-full max-w-xl pl-5 text-left bg-background/80 backdrop-blur-sm">
						<DrawerTitle className="flex items-center gap-2">
							Adaptive card
						</DrawerTitle>
					</DrawerHeader>
				</VisuallyHidden>
				<div className="relative flex-grow w-full overflow-y-auto max-w-xl p-0 pb-0">
					{isLoading && <Loading />}
					{!isLoading && data && (
						<AdaptiveCardTemplate
							card={data?.itemListElement?.card}
							submit={onSubmit}
						/>
					)}
					{isError && <ErrorComp />}
					{isProcessing && (
						<div className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full space-y-8 text-center bg-background/90 backdrop-blur-sm">
							<Spinner />
							<p className="text-[13px] text-default-700">Processing...</p>
						</div>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export default AdaptiveCardButton;
