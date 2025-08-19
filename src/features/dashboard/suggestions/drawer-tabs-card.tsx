import { Icon } from "@iconify/react";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticlesTab from "./tabs/articles-tab";
import ServiceProvidersTab from "./tabs/service-providers-tab";
import SuggestedForTab from "./tabs/suggested-for-tab";

type DrawerTabsCardProps = {
	item: Suggested;
};

export default function DrawerTabsCard({ item }: DrawerTabsCardProps) {
	return (
		<Tabs defaultValue="people" className="space-y-3">
			<div className="pt-0 sticky left-0 top-0 w-full z-15">
				<div className="p-2 backdrop-blur-[15px] bg-white/40 rounded-[16px] border border-[#EBEDED] flex justify-between items-center shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
					<TabsList className="w-full">
						<TabsTrigger className="px-2" value="people">
							<Icon
								icon="fluent:people-community-24-filled"
								className="!w-5 !h-5"
							/>
							People
						</TabsTrigger>
						<TabsTrigger className="px-2" value="services">
							<Icon icon="fluent:handshake-20-filled" className="!w-5 !h-5" />
							Services
						</TabsTrigger>
						<TabsTrigger className="px-2" value="articles">
							<Icon icon="fluent:news-20-filled" className="!w-5 !h-5" />
							Articles
						</TabsTrigger>
					</TabsList>
				</div>
			</div>
			<TabsContent value="people">
				<SuggestedForTab items={item.suggestedFor} riskItems={item.riskItems} />
			</TabsContent>
			<TabsContent value="services">
				<ServiceProvidersTab serviceProviders={item.serviceProviders} />
			</TabsContent>
			<TabsContent value="articles">
				<ArticlesTab />
			</TabsContent>
		</Tabs>
	);
}
