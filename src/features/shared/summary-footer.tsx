import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";

type SummaryFooterProps = {
	children: React.ReactNode;
};

export default function SummaryFooter({ children }: SummaryFooterProps) {
	return (
		<div className="px-4 space-y-6">
			<p className="text-xs px-2">{children}</p>
			<div className="grid grid-cols-2 gap-2">
				<motion.div className="w-full" whileTap={{ scale: 0.9 }}>
					<Button className="w-full rounded-2xl bg-blue-600 hover:bg-blue-600 active:bg-blue-700 px-6">
						Yes, I do
					</Button>
				</motion.div>
				<motion.div className="w-full" whileTap={{ scale: 0.9 }}>
					<Button className="px-6 rounded-2xl w-full" variant="outline">
						No
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
