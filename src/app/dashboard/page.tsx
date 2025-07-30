import { Icon } from "@iconify/react";
import Link from "next/link";
import SummaryCard from "@/features/dashboard/summary-card";
import Header from "@/features/shared/header";

function DashboardPage() {
	return (
		<div className="py-3 space-y-4">
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
		</div>
	);
}

export default DashboardPage;
