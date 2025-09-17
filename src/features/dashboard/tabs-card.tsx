"use client";

import { Icon } from "@iconify/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { track } from "@/lib/analytics";
import ActionsTab from "./tabs/actions-tab";
import TimelineTab from "./tabs/timeline-tab";

export default function TabsCard() {
	function handleTabChange(value: string) {
		track("viewed_tab", {
			item: value,
		});
	}

	return (
		<div>
			<Tabs
				defaultValue="actions"
				className="space-y-3"
				onValueChange={handleTabChange}
			>
				<div className="pt-3.5 sticky left-0 top-16 w-full z-15">
					<div className="p-2 backdrop-blur-[25px] bg-white/70 rounded-[16px] border border-[#EBEDED] flex justify-between items-center shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
						<TabsList className="w-full grid grid-cols-2">
							<TabsTrigger className="px-2" value="actions">
								<Icon
									icon="fluent:cursor-click-20-filled"
									className="!w-5 !h-5"
								/>
								Actions
							</TabsTrigger>
							<TabsTrigger className="px-2" value="timeline">
								<Icon
									icon="fluent:calendar-clock-20-filled"
									className="!w-5 !h-5"
								/>
								Timeline
							</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<TabsContent value="actions">
					<ActionsTab />
				</TabsContent>
				<TabsContent value="timeline">
					<TimelineTab referer="timeline" />
				</TabsContent>
			</Tabs>
		</div>
	);
}
