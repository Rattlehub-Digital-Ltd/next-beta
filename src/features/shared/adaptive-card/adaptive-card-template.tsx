import * as AdaptiveCards from "adaptivecards";
import MarkdownIt from "markdown-it";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAutoAdvanceAdaptiveCard } from "@/api/services/dashboard/queries";
import { Spinner } from "@/components/ui/spinner";

const adaptiveCard = new AdaptiveCards.AdaptiveCard();

adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
	fontFamily: "Mona Sans, sans-serif",
});

const fontSans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

const fontMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text, result) => {
	const markdown = new MarkdownIt();
	const html = markdown.render(text);
	result.outputHtml = html;
	result.didProcess = true;
};

export interface AdaptiveCardProps {
	open: boolean;
	autoYes?: boolean;
	recordId?: string;
	// biome-ignore lint/suspicious/noExplicitAny: true
	card: any | null;
	setProccessing: (isProcessing: boolean) => void;
	submit: (
		formData: FormData,
		isCancelButton: boolean,
		headers?: object,
	) => Promise<void>;
}

function AdaptiveCardTemplate({
	open,
	autoYes,
	recordId,
	card,
	submit,
}: AdaptiveCardProps) {
	const advanceAdaptiveCard = useAutoAdvanceAdaptiveCard();

	const cardWrapperRef = useRef<HTMLDivElement>(null);
	const formData = useRef<FormData>(new FormData());
	const [initialized, setInitialized] = useState(false);
	const [isPending, setIsPending] = useState(true);

	const initialize = useCallback(async () => {
		// if (!cardWrapperRef || !card || !cardWrapperRef.current || !open) return;
		if (!cardWrapperRef.current || !open) return;

		cardWrapperRef.current.innerHTML = "";

		const adaptiveCard = new AdaptiveCards.AdaptiveCard();

		if (autoYes && recordId && !initialized) {
			setIsPending(true);

			const form = new FormData();
			form.set(recordId, "True");

			const headers: Record<string, string> = {};
			headers["x-record-identifier"] = recordId;

			const resp = await advanceAdaptiveCard.mutateAsync({
				formData: form,
				headers: headers,
			});

			const data = resp?.card.data;

			if (data?.itemListElement?.card) {
				card = data.itemListElement.card;

				adaptiveCard.parse(card);

				cardWrapperRef.current.innerHTML = "";
				adaptiveCard.render(cardWrapperRef.current);
			}

			setIsPending(false);
			setInitialized(true);
		} else if (card) {
			adaptiveCard.parse(card);

			cardWrapperRef.current.innerHTML = "";
			adaptiveCard.render(cardWrapperRef.current);
			setIsPending(false);
		}

		adaptiveCard.onInputValueChanged = (input: AdaptiveCards.Input) => {
			if (input.validateValue()) {
				formData.current.append(input.id?.toString() ?? "", input.value);
			}
		};

		adaptiveCard.onExecuteAction = async (action: AdaptiveCards.Action) => {
			const json = action.toJSON();

			if (json?.type === "Action.ToggleVisibility") {
				console.log("Toggle visibility");
				return;
			}

			const inputs = adaptiveCard.getAllInputs();
			const form = new FormData();

			if (inputs?.length > 0) {
				for (const input of inputs) {
					const { id, value } = input;
					if (value !== "" && value !== undefined) {
						form.append(id?.toString() ?? "", value);
					}
				}
			}

			action.validateInputs();
			console.debug(
				action.title,
				action.toJSON(),
				action.getRootObject(),
				action.getAriaRole(),
				action.getSchema(),
			);
			submit(
				form,
				action.toJSON()?.data?.["x-action-context"]?.toLowerCase() === "cancel",
				action.toJSON()?.data,
			);
		};
	}, [
		card,
		submit,
		autoYes,
		recordId,
		initialized,
		open,
		advanceAdaptiveCard.mutateAsync,
	]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	return (
		<div className="h-full md:max-w-xl relative">
			<div
				className={`px-4 pb-4 rounded-3xl md:px-0 !${fontSans.variable} !${fontMono.variable}`}
				ref={cardWrapperRef}
			/>

			{isPending && (
				<div className="absolute top-0 left-0 z-200 flex flex-col items-center justify-center w-full h-full space-y-8 text-center bg-white/90 backdrop-blur-2xl">
					<Spinner />
					<p className="text-[13px] text-default-700">Loading...</p>
				</div>
			)}
		</div>
	);
}

export default AdaptiveCardTemplate;
