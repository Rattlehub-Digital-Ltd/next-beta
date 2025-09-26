import { Icon } from "@iconify/react";
import ShortUniqueId from "short-unique-id";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";

const uid = new ShortUniqueId({ length: 10 });

type RiskTabProps = {
	item: Suggested;
};

function RiskTab({ item }: RiskTabProps) {
	const people: string[] = [];
	item.suggestedFor.forEach((item) => {
		item.affectedOwners.forEach((owner) => {
			if (!people.includes(owner)) people.push(owner);
		});
	});

	return (
		<div className="p-3 bg-[#FFFFFF]/65 space-y-6 border border-black/5 rounded-3xl backdrop-blur-[25px] shadow-[0px_8px_30px_0px rgba(106, 106, 106, 0.06)]">
			<div className="flex items-center space-x-2">
				<Icon icon="fluent-color:lock-shield-24" className="h-5 w-5" />

				<p className="text-[13px] font-medium grow truncate text-left">
					Reduces risk for
				</p>
			</div>

			<ul className="flex flex-wrap gap-2">
				{item.suggestedFor.map((item) => (
					<li key={uid.randomUUID()}>
						<div className="bg-white rounded-lg px-2.5 py-1.5 outline outline-[#E0E0E0] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
							<p className="text-xs font-medium capitalize">
								{item.displayName}
							</p>
							<ul className="flex flex-wrap gap-1.5">
								{item.affectedOwners.map((owner) => (
									<li key={uid.randomUUID()}>
										<div>
											<p className="text-xs text-[#616161] capitalize">
												{owner}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default RiskTab;
