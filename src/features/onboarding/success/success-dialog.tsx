import { RedirectType, redirect } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { OptimizedImage } from "@/features/shared/optimized-image";
import { SparkleIcon } from "@/styles/icons";

type SuccessDialogProps = {
	open: boolean;
	onClose: (open: boolean) => void;
};

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
	const { width } = useWindowSize();

	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent className="rounded-3xl">
				<AlertDialogHeader>
					<AlertDialogTitle>Success</AlertDialogTitle>
					<AlertDialogDescription>
						Successfuly completed onboarding. Click continue to view your
						dashboard.
					</AlertDialogDescription>
					<div>
						<div className="flex items-center justify-center w-full pt-4 pb-4">
							<div>
								<OptimizedImage
									alt=""
									height={220}
									src="/images/families-rafiki.svg"
									width={220}
								/>
							</div>
						</div>
						<div className="mx-auto space-y-1 text-center">
							<h4 className="text-xl font-semibold text-pretty">Great job!</h4>
							<p className="text-sm leading-5 max-w-[300px] tracking-wide text-neutral-600 text-pretty">
								Trust us—one day, your family's going to look back and smile big
								time!
							</p>
						</div>
						<Confetti
							className="relative z-10"
							height={window.screen.height}
							width={width}
						/>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						className="rounded-full h-10"
						onClick={() => {
							// setRedirectToDashboard(true);
							redirect("/dashboard", RedirectType.replace);
							//onClose(false);
						}}
					>
						<SparkleIcon />
						Continue to dashboard
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
