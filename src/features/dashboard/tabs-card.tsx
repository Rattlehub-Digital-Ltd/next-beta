"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActionsTab from "./tabs/actions-tab";
import TimelineTab from "./tabs/timeline-tab";

export default function TabsCard() {
	return (
		<div>
			<Tabs defaultValue="actions" className="space-y-3">
				<div className="pt-3.5 sticky left-0 top-16 w-full z-15">
					<div className="p-2 backdrop-blur-[15px] bg-white/40 rounded-[16px] border border-[#EBEDED] flex justify-between items-center shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
						<TabsList>
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
						<Button
							className="rounded-lg bg-[#EBEBEB] text-[#6b6b6b] h-9 w-9 !px-0 !py-0 border border-black/5"
							variant="ghost"
						>
							<Icon
								icon="fluent:arrow-counterclockwise-24-regular"
								className="!w-5 !h-5"
							/>
						</Button>
					</div>
				</div>
				<TabsContent value="actions">
					<ActionsTab />
				</TabsContent>
				<TabsContent value="timeline">
					<TimelineTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
