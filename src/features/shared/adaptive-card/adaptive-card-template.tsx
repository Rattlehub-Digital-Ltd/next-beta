import * as AdaptiveCards from "adaptivecards";
import MarkdownIt from "markdown-it";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
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
	// biome-ignore lint/suspicious/noExplicitAny: true
	card: any;
	submit: (
		formData: FormData,
		isCancelButton: boolean,
		headers?: object,
	) => Promise<void>;
}

function AdaptiveCardTemplate({ card, submit }: AdaptiveCardProps) {
	const cardWrapperRef = useRef<HTMLDivElement>(null);
	const formData = useRef<FormData>(new FormData());
	const [isPending, setIsPending] = useState(true);

	const initialize = useCallback(async () => {
		if (!cardWrapperRef.current) return;

		setIsPending(true);

		const adaptiveCard = new AdaptiveCards.AdaptiveCard();
		adaptiveCard.parse(card);

		const renderedCard = adaptiveCard.render();
		cardWrapperRef.current.innerHTML = "";
		if (renderedCard) {
			// Clear previous content
			cardWrapperRef.current.appendChild(renderedCard);
		}

		setIsPending(false);

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
	}, [card, submit]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	return (
		<div className="!h-full md:max-w-xl flex flex-col overflow-hidden">
			<div
				className={`px-4 !pb-8 mb-8 rounded-3xl md:px-0 overflow-y-auto !${fontSans.variable} !${fontMono.variable}`}
				ref={cardWrapperRef}
			/>

			{isPending && (
				<div className="absolute  top-0 left-0 z-200 flex flex-col items-center justify-center w-full h-full space-y-8 text-center bg-white/90 backdrop-blur-2xl">
					<Spinner />
					<p className="text-[13px] text-default-700">Loading...</p>
				</div>
			)}
		</div>
	);
}

export default AdaptiveCardTemplate;
