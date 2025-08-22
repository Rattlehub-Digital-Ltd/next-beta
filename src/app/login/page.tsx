import * as motion from "motion/react-client";
import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import { appConfig } from "@/config/app.config";
import LoginButton from "@/features/login/login-button";
import MainSheet from "@/features/shared/main-sheet";

const serif = Merriweather({
	variable: "--font-merriweather",
	subsets: ["latin"],
});

const title = "Login - Nextdot";
const description =
	"Securely manage and share your digital legacy with Nextdot.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		url: `${appConfig.baseURL}/login`,
		siteName: title,
	},
};

const Content = () => {
	const { links } = appConfig;
	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="space-y-4 text-center px-6 grow"
				initial={{ opacity: 0, translateY: 20 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.35 }}
			>
				<h2
					className={`text-pretty font-bold text-2xl leading-8 ${serif.className}`}
				>
					Your Estate, <br />
					Organized and Accessible Anytime
				</h2>
				<p className="text-foreground-secondary text-[0.78rem] text-pretty">
					By continuing, you agree to NEXTDOT's{" "}
					<a
						href={links.privacyPolicy}
						className="font-semibold text-blue-600"
						target="_blank"
						rel="noopener noreferrer"
					>
						Privacy Policy
					</a>{" "}
					,
					<a
						href={links.termsOfUse}
						className="font-semibold text-blue-600"
						target="_blank"
						rel="noopener noreferrer"
					>
						Terms of Service
					</a>
					, and acknowledge their{" "}
					<a
						href={links.dataPolicy}
						className="font-semibold text-blue-600"
						target="_blank"
						rel="noopener noreferrer"
					>
						Data Policy
					</a>
					.
				</p>
			</motion.div>
			<LoginButton />
		</div>
	);
};

export default function LoginPage() {
	return (
		<motion.div
			className="h-full w-full flex flex-col grow"
			initial={{ opacity: 0, scale: 0.7, translateY: 20 }}
			animate={{ opacity: 1, scale: 1, translateY: 0 }}
			transition={{
				duration: 0.3,
				scale: {
					type: "spring",
					ease: "easeInOut",
					visualDuration: 0.26,
					bounce: 0.25,
				},
			}}
		>
			<MainSheet
				title="Sign in"
				imgSrc="/images/login_img.png"
				imgAlt="Login Image"
				content={<Content />}
			/>
		</motion.div>
	);
}
