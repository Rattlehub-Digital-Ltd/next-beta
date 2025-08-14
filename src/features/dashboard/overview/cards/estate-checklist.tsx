import SuggestionItem from "@/features/shared/suggestion-item";

export default function EstateChecklist() {
	return (
		<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<SuggestionItem
				title="Estate Checklist"
				description="Confirm yes or no to each question to help us fine tune your profile"
				showReminder={false}
				color="purple"
			/>
		</div>
	);
}
