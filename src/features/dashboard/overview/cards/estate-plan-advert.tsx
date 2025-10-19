import { Icon } from "@iconify/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { OptimizedImage } from "@/features/shared/optimized-image";

export default function EstatePlanAdvert() {
	return (
		<div className="h-full w-full overflow-hidden">
			<div className="gap-2 flex flex-col bg-[#ff3a30]/3 p-5 rounded-[16px]">
				<OptimizedImage src="/momentum.svg" alt="" height={32} width={128} />

				<AspectRatio ratio={16 / 9}>
					<OptimizedImage
						src="/images/estate-planningyoung-couple-discussing-estate-plan-hero-1-1.jpg"
						alt="Image"
						height="88"
						width={88}
						className="rounded-[12px] object-cover !h-full !w-full"
					/>
				</AspectRatio>

				<div className="space-y-4 w-full mt-2">
					<p className="text-[13px]">
						Our <span className="font-semibold">estate planning services</span>{" "}
						can help you:
					</p>
					<div className="text-xs text-[#616161] line-clamp-2 space-y-3 flex flex-col gap-2 px-2 w-full overflow-hidden">
						<div className="flex gap-2">
							<Icon
								icon="fluent:checkmark-24-filled"
								className="!h-4 !w-4 shrink-0"
							/>
							<p className=" text-wrap grow">
								Carry out your final wishes with{" "}
								<span className="font-semibold underline underline-offset-1">
									Will drafting
								</span>{" "}
								and{" "}
								<span className="font-semibold underline underline-offset-1">
									deceased estate administration.
								</span>
							</p>
						</div>
						<div className="flex gap-2">
							<Icon
								icon="fluent:checkmark-24-filled"
								className="!h-4 !w-4 shrink-0"
							/>
							<p className=" text-wrap grow">
								Secure a legacy and shield loved ones from financial burdens
								with{" "}
								<span className="font-semibold underline underline-offset-1">
									estate cover.
								</span>{" "}
							</p>
						</div>
						<div className="flex gap-2">
							<Icon
								icon="fluent:checkmark-24-filled"
								className="!h-4 !w-4 shrink-0"
							/>
							<p className=" text-wrap grow">
								Protect the interests of beneficiaries who depend on you with{" "}
								<span className="font-semibold underline underline-offset-1">
									Trust administration.
								</span>{" "}
							</p>
						</div>
					</div>
					<div className="pt-6 flex justify-center">
						<a
							href="https://www.momentum.co.za/momentum/personal/will-trust-estate/call-me-back#/lead?name=estate-planning"
							className="text-white text-[0.75rem] font-semibold py-1.5 shrink-0 px-16 rounded-full bg-[#ff3a30]"
						>
							Get advice
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
