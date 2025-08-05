"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app.config";
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
			<div className="px-4 space-y-4">
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
