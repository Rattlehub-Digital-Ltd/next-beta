import { Icon } from "@iconify/react";
import Markdown from "react-markdown";
import type { ServiceProvider } from "@/types/suggested";

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
			<ul className="space-y-3">
				{serviceProviders.map((provider) => (
					<li key={`${provider.name}-${provider.summary}`}>
						<div className="flex gap-2 border border-[#c2c2c2]/30 bg-white/90 rounded-[14px] p-3">
							<div className="relative h-10 w-10 flex items-center justify-center rounded-[10px] shrink-0 bg-[#5856D6]/15">
								<div className="h-[32px] w-[32px] shrink-0 rounded-[8px] flex items-center justify-center text-white/95 bg-[#5856D6]">
									<Icon
										icon="fluent:info-sparkle-20-filled"
										height={20}
										width={20}
									/>
								</div>
							</div>
							<div>
								<p className="text-[0.8rem] font-semibold">{provider.name}</p>
								<div className="text-pretty text-[#616161] text-[0.8rem] provider-summary-markdown">
									<Markdown>{provider.summary}</Markdown>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
