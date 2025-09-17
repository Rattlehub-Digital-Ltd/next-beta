"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import { useVerifyEmail } from "@/api/services/dashboard/verify/queries";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { appConfig } from "@/config/app.config";
import Header from "@/features/shared/header";
import useSignalR from "@/hooks/useSignalR";

const title = "Verify your email address";
const description = "You have not verified your email address";

function EmailVerify() {
	const hubUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/messaging`;

	const { refetch: verifyEmail } = useVerifyEmail();
	const { setIsOnboarded, setIsEmailVerified, isEmailVerified } =
		useOnboardingStore();
	const { data: onboardingStatus, refetch } = useGetOnboarding();

	const { messages } = useSignalR(hubUrl);

	const [processing, setProccessing] = useState(false);

	if (messages.length > 0) {
		const message = messages[0];
		console.log(message);
	}

	useEffect(() => {
		console.log(isEmailVerified);
		if (isEmailVerified) {
			redirect("/dashboard");
		}

		setProccessing(true);

		verifyEmail().finally(() => setProccessing(false));
	}, [isEmailVerified, verifyEmail]);

	return (
		<div className="pt-8 space-y-8 pb-8">
			<Header title={title} description={description} />

			<div className="space-y-4 px-4 bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
				<p className="text-sm text-pretty text-[#525f7f]">
					Thanks for joining{" "}
					<span className="font-semibold">{appConfig.name}</span>.<br /> You're
					almost ready to get started!
					<br />
					<br />
					Please check your email and click the link to verify your email
					address.
				</p>
				<Button
					disabled={processing}
					className="disabled:opacity-85 rounded-full"
					onClick={async () => {
						setProccessing(true);
						await verifyEmail();
						await refetch();
						if (onboardingStatus) {
							setIsOnboarded(onboardingStatus.isOnboarded);
							setIsEmailVerified(onboardingStatus.isEmailVerified);
						}
						setProccessing(false);
					}}
				>
					{processing && <Spinner />}
					{processing ? "Resending..." : "Resend verification link"}
				</Button>
			</div>
		</div>
	);
}

export default EmailVerify;
