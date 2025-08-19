import * as AdaptiveCards from "adaptivecards";
import MarkdownIt from "markdown-it";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAutoAdvanceAdaptiveCard } from "@/api/services/dashboard/queries";
import { Spinner } from "@/components/ui/spinner";

const adaptiveCard = new AdaptiveCards.AdaptiveCard();

adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
	fontFamily: "Geist, sans-serif",
});

const fontSans = Mona_Sans({
	variable: "--font-mono-sans",
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
	autoYes?: boolean;
	recordId?: string;
	// biome-ignore lint/suspicious/noExplicitAny: true
	card: any;
	setProccessing: (isProcessing: boolean) => void;
	submit: (
		formData: FormData,
		isCancelButton: boolean,
		headers?: object,
	) => Promise<void>;
}

function AdaptiveCardTemplate({
	autoYes,
	recordId,
	card,
	submit,
}: AdaptiveCardProps) {
	const form = new FormData();
	form.set(recordId ?? "", "true");

	const { refetch, isPending, isFetching, isRefetching } =
		useAutoAdvanceAdaptiveCard(form);

	const cardWrapperRef = useRef<HTMLDivElement>(null);
	const formData = useRef<FormData>(new FormData());
	const [initialized, setInitialized] = useState(false);

	const initialize = useCallback(async () => {
		if (!cardWrapperRef || !card || !cardWrapperRef.current) return;

		const adaptiveCard = new AdaptiveCards.AdaptiveCard();

		if (autoYes && recordId && !initialized) {
			const { data } = await refetch();

			if (data?.itemListElement?.card) {
				const card = data.itemListElement.card;
				adaptiveCard.clear();
				adaptiveCard.parse(card);

				cardWrapperRef.current.innerHTML = "";
				adaptiveCard.render(cardWrapperRef.current);
			}

			setInitialized(true);
		} else {
			adaptiveCard.parse(card);

			cardWrapperRef.current.innerHTML = "";
			adaptiveCard.render(cardWrapperRef.current);
		}

		card.onExecuteAction = (action: AdaptiveCards.SubmitAction) => {
			// Access the data from the action
			const actionData = action.data;

			// Test that the onExecute parameter has the data JSON
			if (actionData) {
				console.debug("Received data:", actionData);
				// Do something with the data
			} else {
				console.debug(
					"You are all caught up for now received from the card action.",
				);
			}
		};

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
	}, [card, submit, autoYes, recordId, initialized, refetch]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	return (
		<div className="h-full md:max-w-xl relative">
			<div
				className={`px-4 pb-4 rounded-3xl md:px-0 !${fontSans.variable} !${fontMono.variable}`}
				ref={cardWrapperRef}
			/>

			{(isPending || isFetching || isRefetching) && (
				<div className="absolute top-0 left-0 z-200 flex flex-col items-center justify-center w-full h-full space-y-8 text-center bg-white/90 backdrop-blur-2xl">
					<Spinner />
					<p className="text-[13px] text-default-700">Loading...</p>
				</div>
			)}
		</div>
	);
}

export default AdaptiveCardTemplate;
