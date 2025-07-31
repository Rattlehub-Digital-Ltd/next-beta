import SuggestionItem from "@/features/shared/suggestion-item";
import UserBadge from "@/features/shared/user-badge";

export default function Family() {
	return (
		<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<SuggestionItem
				title="Family"
				description={`5 family members`}
				showReminder={false}
				color="indigo"
			/>
			<div className="flex flex-wrap gap-2">
				<UserBadge name="Halle Berry" />
				<UserBadge name="John Wick" />
				<UserBadge name="Black Widow" />
				<UserBadge name="Child 1" />
				<UserBadge name="Child 2" />
			</div>
		</div>
	);
}
