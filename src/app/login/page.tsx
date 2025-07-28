import * as motion from "motion/react-client";
import { Merriweather } from "next/font/google";
import { Button } from "@/components/ui/button";
import MainSheet from "@/features/shared/main-sheet";
import { FluentArrowCircleRight24Filled, SparkleIcon } from "../styles/icons";

const serif = Merriweather({
	variable: "--font-merriweather",
	subsets: ["latin"],
});

const Content = () => {
	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="space-y-4 text-center px-6 grow"
				initial={{ opacity: 0, translateY: 20 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.35 }}
			>
				<h2 className={`text-pretty font-bold text-2xl ${serif.className}`}>
					Your Estate, <br />
					Organized and Accessible Anytime
				</h2>
				<p className="text-foreground-secondary text-[0.78rem] text-pretty">
					By continuing, you agree to NEXTDOT's{" "}
					<a href="/" className="font-semibold text-blue-500">
						Privacy Policy
					</a>{" "}
					,
					<a href="/" className="font-semibold text-blue-500">
						Terms of Service
					</a>
					, and acknowledge their{" "}
					<a href="/" className="font-semibold text-blue-500">
						Data Policy
					</a>
					.
				</p>
			</motion.div>
			<motion.div
				className="w-full"
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, translateY: -60 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.35 }}
			>
				<Button
					className="font-semibold rounded-2xl h-12 w-full                                                                                                                                                                                                                 !pr-3 shadow-md shadow-blue-500/40 bg-blue-600"
					variant="default"
					type="button"
					size="lg"
				>
					<SparkleIcon className="!h-4.5 !w-4.5 text-white mr-2" />
					<span className="grow text-center text-sm truncate">
						Continue with Nextdot
					</span>
					<FluentArrowCircleRight24Filled className="!h-6 !w-6 text-white" />
				</Button>
			</motion.div>
		</div>
	);
};

function LoginPage() {
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

export default LoginPage;
