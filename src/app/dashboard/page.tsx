import { Icon } from "@iconify/react";
import Link from "next/link";
import SummaryCard from "@/features/dashboard/summary-card";
import TabsCard from "@/features/dashboard/tabs-card";
import Header from "@/features/shared/header";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@/styles/icons";

function DashboardPage() {
	return (
		<div className="pt-3 space-y-4 pb-16">
			<Header
				title="Welcome back!"
				description="These will affect your estate, please read them carefully and take the necessary action."
				content={
					<Link
						href="/"
						className="flex items-center space-x-2 text-[#27A7BE] font-medium text-[13px] leading-4 no-underline py-2"
					>
						<Icon
							icon="fluent:gift-20-filled"
							className="shrink-0"
							height={18}
							width={18}
						/>
						<p>Invite a friend and get 5% off</p>
						<Icon icon="fluent:chevron-right-16-filled" />
					</Link>
				}
			/>
			<SummaryCard />
			<TabsCard />

			<div className="mt-6 fixed bottom-24 left-0 w-full z-50 px-6">
				<Button
					color="primary"
					size="lg"
					className="shadow-md rounded-2xl shadow-blue-500/40 h-11 text-[13px] w-full overflow-hidden"
					variant="default"
				>
					<SparkleIcon className="w-5 h-5 text-white shrink-0" />
					<span className="line-clamp-1 truncate">{`Tap to start`}</span>
				</Button>
			</div>
		</div>
	);
}

export default DashboardPage;
