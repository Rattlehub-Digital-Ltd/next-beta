"use client";

import * as motion from "motion/react-client";
import { CategoryBadge } from "@/features/shared/category-badge";
import MainSheet from "@/features/shared/main-sheet";
// import PersonCard from "../shared/person-card";
// import AddPersonButton from "./add-person-button";

const Content = () => {
	return (
		<div className="h-full flex flex-col w-full">
			<motion.div
				className="text-center px-6 grow"
				initial={{ opacity: 0, translateY: 10 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.25 }}
			>
				<h2 className={`text-pretty font-semibold text-xl leading-8`}>
					Do you have dependents
				</h2>
				<p className="text-foreground-secondary text-[0.85rem] text-pretty">
					Individuals who rely on yourself for financial support, excluding your
					spouse and children
				</p>
				{/* <div className="py-4 flex flex-col w-full items-center space-y-3">
					<PersonCard
						type="dependent"
						title="Edit John Wick"
						firstName="John"
						lastName="Wick"
						relationship="Adopted child"
						imgSrc="https://deadline.com/wp-content/uploads/2023/03/Keanu-Reeves-john-wick-4.jpg?w=681&h=383&crop=1"
						onDelete={() => console.log("Delete dependents")}
					/>
					<PersonCard
						type="dependent"
						title="Edit Zenday Coleman "
						firstName="Zendaya"
						lastName="Coleman "
						relationship="Extended family"
						imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaqn3epJvdldKDEgK8Ef1e1iGWb6nl3cinQcXRnwOwMI6mx-ZTCBEqo3azQktoTFOIv-rB9xfq6lFnA5JGj3jpwtlLhmib3BUZ6aXP8m99w"
						onDelete={() => console.log("Delete dependents")}
					/>
				</div> */}
			</motion.div>
			{/* <div className="w-full flex justify-center">
				<AddPersonButton type="dependent" label="Add Dependent" />
			</div> */}
		</div>
	);
};

const Dependents = () => {
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
				imgSrc="/images/dependents.png"
				imgAlt="Child with bird Image"
				content={<Content />}
			/>
		</motion.div>
	);
};

export default Dependents;
