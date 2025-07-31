import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActionsTab from "./tabs/actions-tab";
import TimelineTab from "./tabs/timeline-tab";

export default function TabsCard() {
	return (
		<div className="w-full h-full p-4 bg-[#F8F8F8]/95 py-4 stroke-1 stroke-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)] space-y-4 flex flex-col">
			<Tabs defaultValue="actions" className="space-y-3">
				<TabsList>
					<TabsTrigger value="actions">Actions</TabsTrigger>
					<TabsTrigger value="timeline">Timeline</TabsTrigger>
				</TabsList>
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
