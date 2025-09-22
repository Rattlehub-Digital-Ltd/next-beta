import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { track } from "@/lib/analytics";
import TimelineTab from "../tabs/timeline-tab";
import DocumentsTab from "./documents-tab";

export default function TabsCard({
	referer = "timeline",
	goalName,
}: {
	referer?: string;
	goalName: string;
}) {
	function handleTabChange(value: string) {
		track("viewed_tab", {
			item: value,
		});
	}

	return (
		<div>
			<Tabs
				defaultValue="documents"
				className="space-y-3"
				onValueChange={handleTabChange}
			>
				<div className="pt-2 sticky left-0 top-0 w-full z-15">
					<div className="p-2 backdrop-blur-[15px] bg-white/60 rounded-[16px] border border-[#EBEDED] flex justify-between items-center shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
						<TabsList className="w-full grid grid-cols-2">
							<TabsTrigger className="px-2" value="documents">
								<Icon
									icon="fluent:document-one-page-sparkle-24-filled"
									className="!w-5 !h-5"
								/>
								Documents
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
				<TabsContent value="documents">
					<DocumentsTab goalName={goalName} />
				</TabsContent>
				<TabsContent value="timeline">
					<TimelineTab referer={referer} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
