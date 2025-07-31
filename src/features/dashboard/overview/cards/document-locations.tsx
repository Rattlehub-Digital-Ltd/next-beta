import SuggestionItem from "@/features/shared/suggestion-item";
import DocumentLocationBadge from "../document-location-badge";

export default function DocumentLocations() {
	return (
		<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<SuggestionItem
				title="Document Locations"
				description={`Where your documents are stored`}
				showReminder={false}
				color="brown"
			/>
			<div className="grid grid-cols-2 gap-2">
				<DocumentLocationBadge label="Safe" count={4} />
				<DocumentLocationBadge label="Lawyer Safe" count={2} />
				<DocumentLocationBadge label="Home Safety Box" count={8} />
				<DocumentLocationBadge label="Office Safe" count={3} />
			</div>
		</div>
	);
}
