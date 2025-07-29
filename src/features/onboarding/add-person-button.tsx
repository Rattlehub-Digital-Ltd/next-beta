import { Icon } from "@iconify/react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import PersonDrawer from "../shared/person-drawer";

type AddPersonButtonProps = {
	label: string;
};

function AddPersonButton({ label }: AddPersonButtonProps) {
	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, translateY: -60 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ duration: 0.35 }}
		>
			<PersonDrawer title={label}>
				<Button
					className="text-[#0372E3] rounded-full gap-1.5 w-full py-2 pl-2 pr-3 bg-[#0372E3]/8"
					variant="default"
					type="button"
					size="lg"
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
