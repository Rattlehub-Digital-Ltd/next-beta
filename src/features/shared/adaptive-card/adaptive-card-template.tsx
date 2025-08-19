import * as AdaptiveCards from "adaptivecards";
import MarkdownIt from "markdown-it";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAutoAdvanceAdaptiveCard } from "@/api/services/dashboard/queries";

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
	setProccessing,
}: AdaptiveCardProps) {
	const form = new FormData();
	form.set(recordId ?? "", recordId ?? "");

	const { refetch } = useAutoAdvanceAdaptiveCard(form);

	const cardWrapperRef = useRef<HTMLDivElement>(null);
	const formData = useRef<FormData>(new FormData());
	const [initialized, setInitialized] = useState(false);

	const initialize = useCallback(async () => {
		if (!cardWrapperRef || !card || !cardWrapperRef.current) return;

		setProccessing(true);

		const adaptiveCard = new AdaptiveCards.AdaptiveCard();
		adaptiveCard.parse(card);

		cardWrapperRef.current.innerHTML = "";
		adaptiveCard.render(cardWrapperRef.current);

		if (autoYes && recordId && !initialized) {
			// const inputs = adaptiveCard.getAllInputs();

			// const form = new FormData();

			// if (inputs?.length > 0) {
			// 	let i = 0;
			// 	for (const input of inputs) {
			// 		const { id, value, getJsonTypeName } = input;
			// 		const typeName = getJsonTypeName();

			// 		if (i === 1 && typeName === "Input.ChoiceSet") {
			// 			form.append(id?.toString() ?? "", value);
			// 		} else {
			// 			form.append(id?.toString() ?? "", "yes");
			// 		}
			// 		i++;
			// 	}

			// 	const header = {};

			// 	(header as Record<string, string>)["x-record-identifier"] = recordId;

			// 	await submit(form, false, header);
			// }
			const { data } = await refetch();

			if (data?.itemListElement?.card) {
				const card = data.itemListElement.card;
				adaptiveCard.parse(card);

				cardWrapperRef.current.innerHTML = "";
				adaptiveCard.render(cardWrapperRef.current);
			}

			setInitialized(true);
			setProccessing(false);
		}

		setProccessing(false);

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
	}, [card, submit, autoYes, recordId, initialized, refetch, setProccessing]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	return (
		<div className="h-full md:max-w-xl">
			<div
				className={`px-4 pb-4 rounded-3xl md:px-0 !${fontSans.variable} !${fontMono.variable}`}
				ref={cardWrapperRef}
			/>
		</div>
	);
}

export default AdaptiveCardTemplate;
