"use client";

import * as motion from "motion/react-client";
import { useState } from "react";
import { useToggleSuggestion } from "@/api/services/dashboard/suggestion/queries";
import { Button } from "@/components/ui/button";

type SummaryFooterProps = {
	id: string;
	isApplicable: boolean | null;
	children: React.ReactNode;
};

export default function SummaryFooter({
	isApplicable,
	id,
	children,
}: SummaryFooterProps) {
	const toggleSuggestion = useToggleSuggestion();

	const [isPending, setIsPending] = useState(false);
	const [value, setValue] = useState<boolean | null>(isApplicable);

	const handleSuggestionToggle = async (value: boolean) => {
		setIsPending(true);

		try {
			await toggleSuggestion.mutateAsync({ id, value });
			setValue(value);
		} catch (error) {
			console.error("Error toggling suggestion:", error);
			// Handle error appropriately, e.g., show a notification or alert
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="px-4 space-y-6">
			<p className="text-xs px-2">{children}</p>
			<div className="grid grid-cols-2 gap-2">
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<Button
						className="w-full rounded-2xl bg-blue-600 hover:bg-blue-600 active:bg-blue-700 px-6"
						disabled={isPending}
						onClick={() => handleSuggestionToggle(true)}
					>
						Yes, I do
					</Button>
				</motion.div>
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<Button
						className="px-6 rounded-2xl w-full disabled::opacity-40"
						disabled={isPending || value === false}
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
