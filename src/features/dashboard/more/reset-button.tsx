"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app.config";
import useAxios from "@/hooks/use-axios";

function ResetButton() {
	const { client } = useAxios();

	return (
		<Button
			className="rounded-full !pr-5"
			variant="destructive"
			onClick={async () => {
				try {
					const url = appConfig.previewMode
						? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/AdaptiveCard`
						: `${process.env.NEXT_PUBLIC_API_BASE_URL}/guardian/api/AdaptiveCard`;

					await client.post(url, {
						type: "GraphReset",
					});
				} catch (e) {
					console.debug(e);
				}

				window.location.pathname = "/";
			}}
		>
			<Icon icon="fluent:arrow-reset-20-filled" />
			<p className="flex-grow">Reset Profile</p>
		</Button>
	);
}

export default ResetButton;
