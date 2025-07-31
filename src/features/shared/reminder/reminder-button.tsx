import { Button } from "@/components/ui/button";
import ReminderDrawer from "./reminder-drawer";
import { Icon } from "@iconify/react";

export default function ReminderButton() {
	return (
		<ReminderDrawer>
			<Button
				className="text-xs font-semibold text-[#E34C00] px-0 py-2 -ml-4"
				variant="ghost"
			>
				<Icon
					className="!w-4.5 !h-4.5 shrink-0"
					icon="fluent:alert-urgent-24-filled"
					height={18}
					width={18}
				/>
				<span className="grow truncate">Set a reminder</span>
			</Button>
		</ReminderDrawer>
	);
}
