import { Icon } from "@iconify/react";
import Link from "next/link";
import DocumentLocations from "@/features/dashboard/overview/cards/document-locations";
import EstatePlan from "@/features/dashboard/overview/cards/estate-plan";
import Family from "@/features/dashboard/overview/cards/family";
import LifeFileDocuments from "@/features/dashboard/overview/cards/life-file-documents";
import Header from "@/features/shared/header";

export default function OverviewPage() {
	return (
		<div className="pt-3 space-y-4 pb-8">
			<Header
				title="Overview"
				description="The Overview section provides a quick view of progress, showing completed items, and highlighting risks like missing items or incomplete sections."
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
			<Family />
			<DocumentLocations />
			<EstatePlan />
			<LifeFileDocuments />
		</div>
	);
}
