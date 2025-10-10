import { Icon } from "@iconify/react";
import type { Suggested } from "@/api/services/dashboard/suggestion/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ArticlesTab from "./tabs/articles-tab";
import RiskTab from "./tabs/risk-tab";
import ServiceProvidersTab from "./tabs/service-providers-tab";
import SuggestedForTab from "./tabs/suggested-for-tab";

type DrawerTabsCardProps = {
	item: Suggested;
};

export default function DrawerTabsCard({ item }: DrawerTabsCardProps) {
	return (
		<Tabs defaultValue="suggested-for" className="space-y-3">
			<div className="">
				<div className="p-2 backdrop-blur-[15px] bg-white/40 relative rounded-[16px] w-full border border-[#EBEDED] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
					<TabsList className="flex justify-start flex-wrap h-auto w-full p-2 gap-2">
						<TabsTrigger className="px-2 flex-none" value="suggested-for">
							<Icon
								icon="fluent:shield-error-24-filled"
								className="!w-5 !h-5"
							/>
							Suggested for
						</TabsTrigger>
						<TabsTrigger className="px-2 flex-none" value="people">
							<Icon
								icon="fluent:people-community-24-filled"
								className="!w-5 !h-5"
							/>
							Risks
						</TabsTrigger>

						<TabsTrigger className="px-2 flex-none" value="services">
							<Icon icon="fluent:handshake-20-filled" className="!w-5 !h-5" />
							Get help
						</TabsTrigger>
						{/* <TabsTrigger className="px-2 flex-none" value="articles">
							<Icon icon="fluent:news-20-filled" className="!w-5 !h-5" />
							Articles
						</TabsTrigger> */}
					</TabsList>
				</div>
			</div>
			<TabsContent value="people">
				<SuggestedForTab
					item={item}
					items={item.suggestedFor}
					riskItems={item.riskItems}
				/>
			</TabsContent>
			<TabsContent value="suggested-for">
				<RiskTab item={item} />
			</TabsContent>
			<TabsContent value="services">
				<ServiceProvidersTab serviceProviders={item.serviceProviders} />
			</TabsContent>
			{/* <TabsContent value="articles">
				<ArticlesTab />
			</TabsContent> */}
		</Tabs>
	);
}
