import * as AdaptiveCards from "adaptivecards";
import MarkdownIt from "markdown-it";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LifeFileDocument } from "@/api/services/dashboard/overview/types";
import { Spinner } from "@/components/ui/spinner";
import { track } from "@/lib/analytics";
import type { ActionItem } from "@/types/action-item";
import Swiper from "swiper";

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
	currentDocument?: LifeFileDocument;
	currentActionItem?: ActionItem;
	// biome-ignore lint/suspicious/noExplicitAny: true
	card: any;
	submit: (
		formData: FormData,
		isCancelButton: boolean,
		headers?: object,
	) => Promise<void>;
}

function AdaptiveCardTemplate({
	currentDocument,
	currentActionItem,
	card,
	submit,
}: AdaptiveCardProps) {
	const cardWrapperRef = useRef<HTMLDivElement>(null);
	const formData = useRef<FormData>(new FormData());
	const [isPending, setIsPending] = useState(true);
	const trackedItem = useRef(false);

	const initialize = useCallback(async () => {
		if (!cardWrapperRef.current || !card) return;

		setIsPending(true);

		const adaptiveCard = new AdaptiveCards.AdaptiveCard();

		try {
			adaptiveCard.parse(card);

			const renderedCard = adaptiveCard.render();
			cardWrapperRef.current.innerHTML = "";
			if (renderedCard) {
				// Clear previous content
				cardWrapperRef.current.appendChild(renderedCard);

				// Initialize Swiper manually for the carousel
				const carouselEl = renderedCard.querySelector(
					".ac-carousel",
				) as HTMLElement;
				if (carouselEl) {
					new Swiper(carouselEl, {
						slidesPerView: 1,
						spaceBetween: 10,
						loop: true,
						pagination: { el: ".swiper-pagination", clickable: true },
						touchStartPreventDefault: false, // allow vertical scroll while touching
						touchMoveStopPropagation: false,
					});
				}

				if (currentDocument && !trackedItem.current) {
					const item = currentDocument;

					track("viewed_document", {
						item: item.displayName,
						record_identifier: item.id,
						affected_owner: item.affectedOwner,
						is_applicable: item.isApplicable,
						is_adaptive_card: true,
					});

					trackedItem.current = true;
				}

				if (currentActionItem && !trackedItem.current) {
					const item = currentActionItem;

					track("viewed_document", {
						item: item.displayName,
						record_identifier: item.id,
						affected_owner: item.ownerDisplayName,
						is_complete: item.isComplete,
						ranking: item.ranking,
						section: item.section,
						is_adaptive_card: "true",
					});

					trackedItem.current = true;
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsPending(false);
		}

		card.onExecuteAction = (action: AdaptiveCards.SubmitAction) => {
			// Access the data from the action
			const actionData = action.data;

			// Test that the onExecute parameter has the data JSON
			if (actionData) {
				console.debug("Received data:", actionData);
				// Do something with the data
			} else {
				console.debug("No data received from the card action.");
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
	}, [currentActionItem, currentDocument, card, submit]);

	useEffect(() => {
		try {
			initialize();
		} catch (error) {
			console.log(error);
		}
	}, [initialize]);

	return (
		<div className="!h-full md:max-w-xl flex flex-col overflow-hidden">
			<div
				className={`px-4 !pb-8 mb-8 rounded-3xl md:px-0 overflow-y-auto !${fontSans.variable} !${fontMono.variable}`}
				ref={cardWrapperRef}
			/>

			{isPending && (
				<div className="absolute top-0 left-0 z-200 flex flex-col items-center justify-center w-full h-full space-y-4 text-center bg-[#ECECEC]/90 backdrop-blur-2xl">
					<Spinner size="lg" />
					<p className="text-[13px] text-neutral-700">Loading...</p>
				</div>
			)}
		</div>
	);
}

export default AdaptiveCardTemplate;
