"use client";

import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { usePersonDrawerStore } from "store/use-person-drawer-store";
import PersonDrawer from "@/features/shared/person-drawer";
import { cn } from "@/lib/utils";
import type { Person, PersonType } from "@/types/person";

type AddPeopeleProps = {
	person?: Person;
	label: string;
	icon: string;
	type: PersonType;
	iconClass: string;
};

export default function AddPeople({
	person,
	type,
	icon,
	label,
	iconClass,
}: AddPeopeleProps) {
	const { setTitle, setType } = usePersonDrawerStore();

	return (
		<PersonDrawer type={type} title={label} person={person}>
			<motion.div
				whileTap={{ scale: 0.95 }}
				className="flex flex-col rounded-[16px] h-24 w-24 gap-2 bg-white/70 backdrop-blur-3xl border border-black/5 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]"
				onClick={() => {
					setTitle(`Add ${label}`);
					setType(type);
				}}
			>
				<div className="flex justify-center items-center w-full grow">
					<motion.div
						className={cn(
							"text-white/95 h-8 w-8 flex items-center justify-center rounded-full ring-4",
							iconClass,
						)}
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
					>
						<Icon icon={icon} height={20} width={20} />
					</motion.div>
				</div>

				<div className="pb-2.5 px-3 text-center w-full">
					<p className="font-medium text-xs">{label}</p>
				</div>
			</motion.div>
		</PersonDrawer>
	);
}
