import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import RiskCarousel from "../risk-carousel";

type TagDialogProps = {
	name: string;
	children: React.ReactNode;
};

export default function TagDialog({ name, children }: TagDialogProps) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent className="rounded-[20px] bg-white/85 backdrop-blur-3xl border-[#EBEDED]">
					<DialogHeader className="text-left">
						<DialogTitle className="capitalize text-base">{name}</DialogTitle>
						<DialogDescription className="text-[13px] text-pretty">
							Understanding these categories, you can efficiently manage your
							documents and information, providing peace of mind for you and
							your loved ones.
						</DialogDescription>
					</DialogHeader>
					<div className="w-full overflow-hidden">
						<RiskCarousel items={data} />
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

const data = [
	{
		category: "Protection",
		goalName: "Legacy",
		eduText:
			"Without clarity on debts, creditors could pursue claims against your estate, potentially depleting assets meant for loved ones.",
	},
	{
		category: "Delay",
		goalName: "Legacy",
		eduText:
			"Unidentified loans or debts can stall the probate process, creating confusion and disputes over repayment obligations.",
	},
	{
		category: "Cost",
		goalName: "Legacy",
		eduText:
			"Hidden debts might lead to unexpected legal battles, higher administrative fees, or emotional stress for beneficiaries sorting out financial chaos.",
	},
	{
		category: "Protection",
		goalName: "Legacy",
		eduText:
			"Unknown loans or debts can blindside your executor, leaving assets vulnerable to claims or legal disputes. Beneficiaries may face unexpected financial liabilities.",
	},
	{
		category: "Delay",
		goalName: "Legacy",
		eduText:
			"Missing loan agreements can stall the settlement process as creditors and executors scramble to verify terms, prolonging estate resolution.",
	},
	{
		category: "Cost",
		goalName: "Legacy",
		eduText:
			"Without clarity, legal fees can skyrocket, and unpaid debts might accrue penalties, draining resources meant for your loved ones.",
	},
];
