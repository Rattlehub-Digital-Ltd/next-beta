import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "./optimized-image";

type LoadingProps = {
	className?: string;
};

export default function Loading({ className }: LoadingProps) {
	return (
		<div
			className={cn(
				"flex flex-col fixed z-200 top-0 left-0 h-full w-full items-center justify-center bg-[#fafafa]/80 backdrop-blur-[25px]",
				className,
			)}
		>
			<div className="relative flex items-center justify-center h-24 w-24">
				<OptimizedImage
					src="/wordmark-light.svg"
					height={36}
					width={36}
					loading="eager"
					alt="Logo"
				/>
				<Spinner className="absolute" variant="light" size="3xl" />
			</div>
		</div>
	);
}
