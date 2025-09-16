"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetDocuments } from "@/api/services/dashboard/queries";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { ActionItem } from "@/types/action-item";
import RiskItem from "../shared/risk-item";

type CampaignIssueProps = {
	setCurrentIssue: (issue: ActionItem) => void;
};

function CampaignIssue({ setCurrentIssue }: CampaignIssueProps) {
	const { user } = useAuth0();
	const { data: issues } = useGetDocuments({ page: 1, limit: 10 });

	const router = useRouter();
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);

			const referrer = searchParams.get("referrer") ?? "Unknown";
			const id = searchParams.get("id") ?? "Unknown";

			localStorage.setItem("campaign", JSON.stringify({ id, referrer }));

			if (!user) {
				setIsLoading(false);
				router.replace("/login");
				return;
			}

			localStorage.removeItem("campaign");
			const issue = issues?.items[0];

			if (issue) setCurrentIssue(issue);

			setIsLoading(false);
		};

		getData();
	}, [router, searchParams, user, issues?.items[0], setCurrentIssue]);

	if (isLoading) return <p>Please wait...</p>;

	const issue = issues?.items[0];

	return (
		<div>
			{issue && (
				<div className="bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.03)] rounded-[14px]">
					<div className="px-4 py-4">
						<div className="space-y-2">
							<p className="text-sm font-medium text-default-700">
								{issue.displayName}
							</p>
							<div className="flex items-center pb-2 space-x-4">
								<Avatar>
									<AvatarFallback>
										{getInitials(issue.ownerDisplayName)}
									</AvatarFallback>
								</Avatar>
								<p className="text-xs">{issue.ownerDisplayName}</p>
								{/* <TagItem category="Protective" /> */}
							</div>
						</div>
						<p className="text-xs leading-5 text-default-500">
							{issue.eduText}
						</p>
					</div>
					{issue.riskItems && issue.riskItems.length > 0 && (
						<ul className="px-4 py-3 space-y-3">
							{issue.riskItems.map(({ category, eduText, goalName }, i) => (
								<li key={`${category}-${i}-${eduText}`}>
									<RiskItem
										category={category}
										eduText={eduText}
										goalName={goalName}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}

export default CampaignIssue;
