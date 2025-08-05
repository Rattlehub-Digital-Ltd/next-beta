"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app.config";
import AddPeople from "@/features/onboarding/summary/add-people";
import ProfileHeader from "@/features/onboarding/summary/profile-header";
import Header from "@/features/shared/header";
import useApi from "@/hooks/use-api";

export default function MorePage() {
	const { accessToken } = useApi();

	return (
		<div className="space-y-8">
			<Header
				title="Updates and features"
				description="Keep up to date with the latest features and updates."
			/>
			<div className="space-y-6">
				<ProfileHeader />
				<div className="py-2 flex flex-col gap-4">
					<h1 className="text-xs uppercase mb-3 ml-1 font-medium">
						Add people
					</h1>
					<div className="flex items-center h-16 gap-2 py-2">
						<AddPeople label="Partner" icon="fluent:person-heart-32-filled" />
						<AddPeople label="Child" icon="fluent:person-star-32-filled" />
						<AddPeople label="Dependent" icon="fluent:people-32-filled" />
					</div>
				</div>
			</div>
			<div className="px-4 space-y-4 pt-8">
				<Button
					onClick={async () => {
						try {
							const url = appConfig.previewMode
								? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/AdaptiveCard`
								: `${process.env.NEXT_PUBLIC_API_BASE_URL}/guardian/api/AdaptiveCard`;

							await axios.post(url, {
								type: "GraphReset",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									"Ocp-Apim-Subscription-Key":
										process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
									Authorization: `Bearer ${accessToken}`,
								},
							});
						} catch (e) {
							console.debug(e);
						}

						window.location.pathname = "/";
					}}
				>
					<p className="flex-grow">Reset</p>
				</Button>
				<p className="text-[11px] font-medium text-neutral-500">
					{appConfig.name} © {new Date().getFullYear()}{" "}
					{` v${appConfig.version}`}
				</p>
			</div>
		</div>
	);
}
