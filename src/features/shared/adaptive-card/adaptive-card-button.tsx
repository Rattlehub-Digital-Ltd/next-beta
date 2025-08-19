/** biome-ignore-all lint/suspicious/noExplicitAny: true */
import { VisuallyHidden } from "@react-aria/visually-hidden";
import Image from "next/image";
import { type ReactNode, useCallback, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { dashboardEndpoints } from "@/api/services/dashboard/endpoints";
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
import useAxios from "@/hooks/use-axios";
import type { Document } from "@/types/document";
import AdaptiveCardTemplate from "./adaptive-card-template";

type Props = {
	autoSubmit?: boolean;
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
	autoSubmit,
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

	const { client } = useAxios();

	const [isProcessing, setIsProcessing] = useState(false);
	const [open, setOpen] = useState(defaultOpen);

	const submit = useCallback(
		async (formData: FormData, isCancelButton: boolean, headers?: object) => {
			setIsProcessing(true);

			try {
				await client.put<any>(
					dashboardEndpoints.submitAdaptiveCard(),
					formData,
					{
						baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}`,
						headers: {
							"Content-Type": "multipart/form-data",
							...headers,
						},
					},
				);
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);

				if (isCancelButton) {
					setOpen(false);
					refresh();
					refetch();
				}
			}
		},
		[refresh, client, refetch],
	);

	return (
		<Drawer open={open} onOpenChange={setOpen} onClose={refresh}>
			<DrawerTrigger
				asChild
				className="flex justify-center w-full overflow-hidden"
			>
				{children}
			</DrawerTrigger>
			<DrawerContent className="h-[90svh] flex flex-col items-center min-h-[80svh]  pb-4 !rounded-t-3xl">
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
							autoYes={autoSubmit}
							recordId={recordId}
							card={data?.itemListElement?.card}
							setProccessing={setIsProcessing}
							submit={submit}
						/>
					)}
					{isError && <ErrorComp />}
					{isProcessing && (
						<div className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full space-y-8 text-center bg-white/90 backdrop-blur-sm">
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
