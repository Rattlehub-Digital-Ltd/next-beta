"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "store/use-onboarding-store";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import { useVerifyEmail } from "@/api/services/dashboard/verify/queries";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Header from "@/features/shared/header";
import Loading from "@/features/shared/loading";
import useSignalR from "@/hooks/useSignalR";
import { isValidEmail } from "@/lib/utils";

const title = "Verify your email address";
const description = "You have not verified your email address";

function EmailVerify() {
	console.log("Rendering EmailVerify component");
	const { user, isLoading } = useAuth0();
	const hubUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/messaging`;

	const { refetch: verifyEmail, isLoading: isLoadingVerify } = useVerifyEmail();
	const { setIsOnboarded, setIsEmailVerified, isEmailVerified } =
		useOnboardingStore();
	const {
		data: onboardingStatus,
		isLoading: isOnboardingLoading,
		refetch,
	} = useGetOnboarding();

	const { messages } = useSignalR(hubUrl);

	const [processing, setProccessing] = useState(false);
	const [seconds, setSeconds] = useState(30);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (isLoading || isOnboardingLoading || isEmailVerified) return;

		// if (
		// 	isEmailVerified ||
		// 	!onboardingStatus ||
		// 	onboardingStatus?.isEmailVerified
		// ) {
		// 	if (onboardingStatus?.isOnboarded) {
		// 		redirect("/dashboard");
		// 	} else if (!onboardingStatus?.isOnboarded)
		// 		redirect("/dashboard/onboarding");
		// }

		setProccessing(true);

		verifyEmail().finally(() => setProccessing(false));
	}, [
		isEmailVerified,
		verifyEmail,
		// onboardingStatus,
		isLoading,
		isOnboardingLoading,
	]);

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
				if (message.isOnboarded) redirect("/dashboard");
				else redirect("/dashboard/onboarding");
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

	// if (
	// 	onboardingStatus?.isEmailVerified ||
	// 	isLoading ||
	// 	isLoadingVerify ||
	// 	isOnboardingLoading
	// )
	// 	return;

	const loading = isLoading || isLoadingVerify || isOnboardingLoading;

	return (
		<>
			{loading && <Loading />}
			{!loading && (
				<div className="pt-8 space-y-8 pb-8">
					<Header title={title} description={description} />

					<div className="space-y-4 px-4 bg-[#F8F8F8]/95 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
						<p className="text-sm text-pretty text-[#525f7f]">
							Hi <span className="capitalize font-medium">{name}</span>
							<br />
							<br />
							Check your inbox, we've sent you a verification email.
							<br />
							<br />
							It might have landed in your spam/junk, check it there as well.
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
							{processing ? "Resending..." : "Resend"}
						</Button>
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
			)}
		</>
	);
}

export default EmailVerify;
