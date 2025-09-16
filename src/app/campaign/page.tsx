"use client";

import { Suspense, useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import CampaignIssue from "@/features/campaign/campaign-issue";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";
import { SparkleIcon } from "@/styles/icons";
import type { ActionItem } from "@/types/action-item";

function CampaignPage() {
	const [currentIssue, setCurrentIssue] = useState<ActionItem | undefined>();
	console.log(currentIssue);

	return (
		<ProtectedRoute>
			<div className="flex flex-col items-center w-full p-6 space-y-4">
				<Suspense fallback={<p>Loading...</p>}>
					<div className="w-full md:max-w-xl">
						<CampaignIssue setCurrentIssue={setCurrentIssue} />
					</div>
				</Suspense>
				<div className="fixed bottom-0 left-0 flex justify-center w-full p-6 bg-white/90 backdrop-blur-sm">
					<div className="w-full md:max-w-xl">
						<AdaptiveCardButton
							defaultOpen
							referer="campaign"
							refresh={console.log}
						>
							<Button
								color="primary"
								size="lg"
								className="shadow-md rounded-2xl shadow-primary-500/40 h-11"
								variant="default"
							>
								<SparkleIcon className="w-5 h-5 text-white" />
								Tap to start
							</Button>
						</AdaptiveCardButton>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}

export default CampaignPage;
