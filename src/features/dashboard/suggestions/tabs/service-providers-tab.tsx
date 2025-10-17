import Image from "next/image";
import Markdown from "react-markdown";
import type { ServiceProvider } from "@/api/services/dashboard/suggestion/types";
import { ComingSoonBadge } from "@/features/shared/coming-soon-badge";

type ServiceProvidersTabProps = {
	serviceProviders: ServiceProvider[];
};

export default function ServiceProvidersTab({
	serviceProviders,
}: ServiceProvidersTabProps) {
	return (
		<div className="p-3 bg-[#FFFFFF]/65 space-y-3 border border-black/5 rounded-3xl backdrop-blur-[25px] shadow-[0px_8px_30px_0px rgba(106, 106, 106, 0.06)]">
			<div className="px-2 mb-4">
				<p className="text-[13px] font-medium">Service Providers</p>
				<p className="text-xs text-[#616161]">
					Companies that provides services for this topic.
				</p>
			</div>
			<div className="flex items-center gap-2 flex-wrap py-2">
				<ComingSoonBadge
					variant="gradient"
					className="text-[11px] whitespace-nowrap"
				/>
				<p className="text-[13px] text-muted-foreground text-pretty">
					Soon you'll be able to connect with service providers in our network
					to assist you.
				</p>
			</div>
			{/* <div className="gap-2 flex items-center bg-[#006150]/3 p-2 rounded-[16px]">
				<div className="rounded-[12px] h-[88px] w-[88px] shrink-0">
					<Image src="/image.png" alt="" height={88} width={88} />
				</div>
				<div className="space-y-1.5">
					<Image
						src="/Old-Mutual-logo-vector-01 1.svg"
						alt=""
						height={24}
						width={105}
					/>
					<p className="text-xs text-[#616161] line-clamp-2">
						<span className="font-medium">Old Mutual</span> is a leading
						financial services group that provides personal and business
						financial solutions.
					</p>
					<a
						href="https://www.oldmutual.co.za/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#006150] text-[0.75rem] font-semibold"
					>
						Visit Old Mutual
					</a>
				</div>
			</div> */}
			<ul className="space-y-3">
				{serviceProviders.map((provider, index) => (
					<li key={`${provider.name}-${provider.summary}`}>
						<div className="flex gap-2 bg-gray-100 border border-[#c2c2c2]/30 rounded-[16px] p-2">
							{/* <div className="relative h-10 w-10 flex items-center justify-center rounded-[10px] shrink-0 bg-[#5856D6]/15">
								<div className="h-[32px] w-[32px] shrink-0 rounded-[8px] flex items-center justify-center text-white/95 bg-[#5856D6]">
									<Icon
										icon="fluent:info-sparkle-20-filled"
										height={20}
										width={20}
									/>
								</div>
							</div> */}
							<div className="rounded-[12px] h-[88px] w-[88px] shrink-0 overflow-hidden">
								<Image
									src={
										index === 0
											? "/images/Intimate Family Moment with Pregnant Mother.png"
											: "/images/Family Shopping Checkout Moment.png"
									}
									alt=""
									height={88}
									width={88}
								/>
							</div>
							<div className="space-y-1">
								<p className="font-semibold text-[13px]">{provider.name}</p>
								{/* <Image
									priority
									src="/logo_light.svg"
									alt="Nextdot Logo"
									width={84}
									height={10}
									className="mt-1"
								/> */}
								{/* <p className="text-[0.8rem] font-semibold">{provider.name}</p> */}
								<div className="text-pretty text-[#616161] text-[0.8rem] provider-summary-markdown">
									<Markdown>{provider.summary}</Markdown>
								</div>
								<a
									href="mailto:info@rattlehub.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 text-[0.75rem] font-semibold"
								>
									Contact NextDot
								</a>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
