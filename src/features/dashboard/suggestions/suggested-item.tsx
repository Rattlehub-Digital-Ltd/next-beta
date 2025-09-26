import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { Button } from "@/components/ui/button";
import RiskBar from "@/features/shared/risk-bar";
import SuggestionItem from "@/features/shared/suggestion-item";
import SummaryFooter from "@/features/shared/summary-footer";
import { track } from "@/lib/analytics";
import DrawerTabsCard from "./drawer-tabs-card";
import SuggesteItemDrawer from "./suggeste-item-drawer";

type SuggestedItemProps = {
	item: Suggested;
};

// const uid = new ShortUniqueId();

export default function SuggestedItem({ item }: SuggestedItemProps) {
	const { displayName, eduText, id, isApplicable } = item;
	console.log("isApplicable", isApplicable);

	const people: string[] = [];
	item.suggestedFor.forEach((item) => {
		item.affectedOwners.forEach((owner) => {
			if (!people.includes(owner)) people.push(owner);
		});
	});

	return (
		<div className="w-full h-full bg-[#F8F8F8]/80 py-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			<div className="px-4">
				<SuggestionItem
					title={displayName}
					description={eduText}
					showReminder={true}
					color="yellow"
				/>
			</div>
			{isApplicable === false && (
				<div className="px-4">
					<div className="text-[12.6px] p-3 bg-red-500/5 border border-red-500/60 rounded-[10px]">
						<p>
							You answered <b>No</b> to having a {displayName}, here is how it
							might affect your family and estate.
						</p>
					</div>
				</div>
			)}
			<div className="space-y-2">
				{item.isApplicable === null && (
					<div className="px-4">
						<SuggesteItemDrawer item={item}>
							<Button
								className="!p-0 w-full"
								variant="ghost"
								onClick={() => {
									track("opens_affected_owners", {
										item: displayName,
										is_adaptive_card: false,
									});
								}}
							>
								<RiskBar data={item} />
							</Button>
						</SuggesteItemDrawer>
					</div>
				)}
				{item.isApplicable === false && (
					<div className="px-4">
						<div className="bg-white/25 rounded-2xl border border-black/5 p-4 backdrop-blur-2xl space-y-3">
							{/* <RiskCarousel items={item.riskItems} /> */}

							<DrawerTabsCard item={item} />
							{/* <div className="space-y-6">
								<div className="flex items-center space-x-2">
									<Icon
										icon="fluent-color:lock-shield-24"
										className="h-5 w-5"
									/>

									<p className="text-[13px] font-medium grow truncate text-left">
										Reduces risk for
									</p>
								</div>
								<ul className="text-xs grid grid-cols-2 gap-2.5">
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
								<div className="px-0">
									<SuggesteItemDrawer item={item}>
										<Button
											className="text-blue-600 !no-underline font-semibold gap-1 text-[13.6px] px-2"
											size="sm"
											variant="link"
										>
											<span className="grow truncate">Tap for more</span>
											<Icon
												icon="fluent:chevron-right-24-regular"
												height={12}
												width={12}
											/>
										</Button>
									</SuggesteItemDrawer>
								</div>
							</div> */}
						</div>
					</div>
				)}
			</div>
			<SummaryFooter id={id} isApplicable={isApplicable}>
				<span className="font-normal">
					Do you have a <span className="font-semibold">{displayName}</span> in
					place?
				</span>
			</SummaryFooter>
		</div>
	);
}
