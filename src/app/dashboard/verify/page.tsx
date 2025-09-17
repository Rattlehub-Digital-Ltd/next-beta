"use client";

import { useAuth0 } from "@auth0/auth0-react";
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
import { isValidEmail } from "@/lib/utils";

const title = "Verify your email address";
const description = "You have not verified your email address";

function EmailVerify() {
	const { user } = useAuth0();
	const hubUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/messaging`;

	const { refetch: verifyEmail } = useVerifyEmail();
	const { setIsOnboarded, setIsEmailVerified, isEmailVerified } =
		useOnboardingStore();
	const { data: onboardingStatus, refetch } = useGetOnboarding();

	const { messages } = useSignalR(hubUrl);

	const [processing, setProccessing] = useState(false);
	const [seconds, setSeconds] = useState(30);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (isEmailVerified) {
			redirect("/dashboard/onboarding");
		}

		setProccessing(true);

		verifyEmail().finally(() => setProccessing(false));
	}, [isEmailVerified, verifyEmail]);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isActive && seconds > 0) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		} else if (seconds === 0) {
			setIsActive(false);
			if (interval) {
				clearInterval(interval);
			}
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [isActive, seconds]);

	useEffect(() => {
		if (messages.length > 0) {
			const message = messages[0];
			setIsEmailVerified(message.isEmailVerified);
			if (message.isEmailVerified) {
				redirect("/dashboard/onboarding");
			}
		}
	}, [messages, setIsEmailVerified]);

	const reset = () => {
		setSeconds(30);
		setIsActive(true);
	};

	let name = "Unknown";

	if (user) {
		if (user?.name && !isValidEmail(user?.name)) {
			name = user.name;
		} else if (user?.nickname && !isValidEmail(user?.nickname)) {
			name = user.nickname;
		}
	}

	return (
		<div className="pt-8 space-y-8 pb-8">
			<Header title={title} description={description} />

			<div className="space-y-4 px-4 bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
				<p className="text-sm text-pretty text-[#525f7f]">
					Hi <span className="capitalize font-medium">{name}</span>
					<br />
					<br />
					We're thrilled to welcome you to{" "}
					<span className="font-bold">{appConfig.name}</span> and celebrate this
					big step for your family’s future!
					<br />
					<br />
					Click below to send a quick verification email. If it lands in spam,
					move it to your inbox - we’re eager to start!
				</p>
				<Button
					disabled={processing || isActive}
					className="disabled:opacity-70 rounded-full"
					onClick={async () => {
						setProccessing(true);

						await refetch();
						if (onboardingStatus) {
							setIsOnboarded(onboardingStatus.isOnboarded);
							setIsEmailVerified(onboardingStatus.isEmailVerified);

							if (onboardingStatus.isEmailVerified) {
								redirect("/dashboard/onboarding");
							} else {
								await verifyEmail();
							}
						}

						setProccessing(false);
						reset();
					}}
				>
					{processing && <Spinner />}
					{processing ? "Please wait..." : "Resend verification email"}
				</Button>
				<p className="text-xs leading-5 text-pretty text-[#525f7f]">
					Can’t wait for this journey together! <br />
					<span className="font-medium">The NextDot Team</span>
				</p>
				{isActive && (
					<div>
						<p className="text-xs text-pretty text-[#525f7f]">
							Check your Inbox, can resend in{" "}
							<span className="font-semibold">{seconds} seconds</span>
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default EmailVerify;
