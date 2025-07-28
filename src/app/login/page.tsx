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
		<div className="h-full flex flex-col w-full grow">
			<div className="space-y-4 text-center px-6 grow">
				<h2 className={`text-pretty font-bold text-2xl ${serif.className}`}>
					Your Estate, <br />
					Organized and Accessible Anytime, Anywhere
				</h2>
				<p className="text-foreground-secondary text-[0.78rem] text-pretty">
					By continuing, you agree to NEXTDOT's <strong>Privacy Policy</strong>,
					<strong>Terms of Service</strong>, and acknowledge their{" "}
					<strong>Data Policy</strong>.
				</p>
			</div>
			<Button
				className="font-semibold rounded-2xl h-11 !pr-3 shadow-md shadow-primary/40"
				variant="default"
				size="lg"
			>
				<SparkleIcon className="!h-4.5 !w-4.5 text-white mr-2" />
				<span className="grow text-center text-sm">Continue with Nextdot</span>
				<FluentArrowCircleRight24Filled className="!h-6 !w-6 text-white" />
			</Button>
		</div>
	);
};

function LoginPage() {
	return (
		<div className="h-full w-full flex flex-col grow">
			<MainSheet
				title="Sign in"
				imgSrc="/images/login_img.png"
				imgAlt="Login Image"
				content={<Content />}
			/>
		</div>
	);
}

export default LoginPage;
