"use client";

import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import AdaptiveCardButton from "@/features/shared/adaptive-card/adaptive-card-button";

type CardFooterProps = {
	recordId: string;
	children: React.ReactNode;
	refresh: () => void;
};

export default function CardFooter({
	recordId,
	children,
	refresh,
}: CardFooterProps) {
	return (
		<div className="px-4 space-y-6">
			<p className="text-xs px-2">{children}</p>
			<div className="grid grid-cols-2 gap-2">
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<AdaptiveCardButton
						autoSubmit={true}
						recordId={recordId}
						referer="actions"
						refresh={refresh}
					>
						<Button
							className="w-full rounded-2xl px-6 bg-black/10"
							size="sm"
							variant="ghost"
						>
							Yes
						</Button>
					</AdaptiveCardButton>
				</motion.div>
				<motion.div className="w-full" whileTap={{ scale: 0.95 }}>
					<AdaptiveCardButton
						recordId={recordId}
						referer="actions"
						refresh={refresh}
					>
						<Button
							className="px-6 rounded-2xl w-full"
							variant="outline"
							size="sm"
						>
							No
						</Button>
					</AdaptiveCardButton>
				</motion.div>
			</div>
		</div>
	);
}
