"use client";

import * as motion from "motion/react-client";
import { CategoryBadge } from "@/features/shared/category-badge";
import MainSheet from "@/features/shared/main-sheet";
import PersonCard from "../shared/person-card";
import AddPersonButton from "./add-person-button";
import Options from "./options";

const Content = () => {
	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="text-left px-6 grow"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<h2 className="text-sm font-medium">Do you have a partner</h2>
				<p className="text-muted-foreground text-sm text-pretty">
					The person who you are married to or with whom you enjoy a long-term
					relationship
				</p>
				<div className="py-4">
					<Options />
				</div>
				<div className="py-4 flex flex-col w-full items-center">
					<PersonCard
						title="Edit Halle Berry (Wife)"
						firstName="Halle"
						lastName="Berry"
						relationship="Wife"
						imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ItXU1XrpFWqetXf1M59Fd7Pb3mMPslGYPg&s"
						onDelete={() => console.log("Delete partner")}
					/>
				</div>
			</motion.div>
			<div className="w-full flex justify-center">
				<AddPersonButton label="Add Partner" />
			</div>
		</div>
	);
};

const Partner = () => {
	return (
		<motion.div
			className="h-full w-full flex flex-col grow"
			initial={{ opacity: 0, scale: 0.7, translateY: 20 }}
			animate={{ opacity: 1, scale: 1, translateY: 0 }}
			transition={{
				duration: 0.3,
				scale: {
					type: "spring",
					ease: "easeInOut",
					visualDuration: 0.26,
					bounce: 0.25,
				},
			}}
		>
			<div className="flex items-center gap-1.5 mb-3 px-3">
				<CategoryBadge variant="protection" />
				<CategoryBadge variant="delay" />
				<CategoryBadge variant="cost" />
			</div>
			<MainSheet
				imgSrc="/images/partner.png"
				imgAlt="Image of couple walking"
				content={<Content />}
			/>
		</motion.div>
	);
};

export default Partner;
