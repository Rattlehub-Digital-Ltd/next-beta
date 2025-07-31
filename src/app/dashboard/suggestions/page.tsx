import { Icon } from "@iconify/react";
import Link from "next/link";
import Header from "@/features/shared/header";
import RiskBar from "@/features/shared/risk-bar";
import SuggestionItem from "@/features/shared/suggestion-item";
import SummaryFooter from "@/features/shared/summary-footer";

export default function SuggestionsPage() {
	return (
		<div className="pt-3 space-y-4 pb-8">
			<Header
				title="Suggestions"
				description="Organize and store essential family-related documents."
				content={
					<Link
						href="/"
						className="flex items-center space-x-2 text-[#27A7BE] font-medium text-[13px] leading-4 no-underline py-2"
					>
						<Icon
							icon="fluent:gift-20-filled"
							className="shrink-0"
							height={18}
							width={18}
						/>
						<p>Invite a friend and get 5% off</p>
						<Icon icon="fluent:chevron-right-16-filled" />
					</Link>
				}
			/>
			<div className="w-full h-full bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
				<div className="px-4">
					<SuggestionItem
						title="Account Confirmation Letter"
						description={`An official document from a bank that verifies the existence of an account, including the account holder's name, account number, and branch details`}
						showReminder={true}
						color="blue"
					/>
				</div>
				<div className="px-4">
					<RiskBar />
				</div>
				<SummaryFooter>
					<span className="font-normal">
						Do you have{" "}
						<span className="font-semibold">Account Confirmation letter</span>{" "}
						in place?
					</span>
				</SummaryFooter>
			</div>
		</div>
	);
}
