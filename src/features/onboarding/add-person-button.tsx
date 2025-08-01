"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import type { PersonType } from "@/types/person";
import PersonDrawer from "../shared/person-drawer";

type AddPersonButtonProps = {
	type: PersonType;
	label: string;
	disabled?: boolean;
};

function AddPersonButton({ type, disabled, label }: AddPersonButtonProps) {
	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, translateY: -60 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ duration: 0.35 }}
		>
			<PersonDrawer type={type} title={label}>
				<Button
					className="text-[#0372E3] rounded-full gap-1.5 w-full py-2 pl-2 pr-3 bg-[#0372E3]/8 disabled:opacity-50"
					variant="default"
					type="button"
					size="lg"
					disabled={disabled}
				>
					<Icon
						icon="fluent:add-circle-20-regular"
						style={{ stroke: "#0372E3" }}
					/>
					<span className="text-center text-[13px] font-semibold leading-4 truncate">
						{label}
					</span>
				</Button>
			</PersonDrawer>
		</motion.div>
	);
}

export default AddPersonButton;
