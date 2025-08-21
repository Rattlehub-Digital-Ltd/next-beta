"use client";

import * as motion from "motion/react-client";
import { useToggleSuggestion } from "@/api/services/dashboard/suggestion/queries";
import { Button } from "@/components/ui/button";

type SummaryFooterProps = {
	id: string;
	children: React.ReactNode;
};

export default function SummaryFooter({ id, children }: SummaryFooterProps) {
	const toggleSuggestion = useToggleSuggestion();

	const handleSuggestionToggle = async (value: boolean) => {
		try {
			await toggleSuggestion.mutateAsync({ id, value });
		} catch (error) {
			console.error("Error toggling suggestion:", error);
			// Handle error appropriately, e.g., show a notification or alert
		}
	};

	return (
		<div className="px-4 space-y-6">
			<p className="text-xs px-2">{children}</p>
			<div className="grid grid-cols-2 gap-2">
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<Button
						className="w-full rounded-2xl bg-blue-600 hover:bg-blue-600 active:bg-blue-700 px-6"
						onClick={() => handleSuggestionToggle(true)}
					>
						Yes, I do
					</Button>
				</motion.div>
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<Button
						className="px-6 rounded-2xl w-full"
						variant="outline"
						onClick={() => handleSuggestionToggle(false)}
					>
						No
					</Button>
				</motion.div>
			</div>
		</div>
	);
}
