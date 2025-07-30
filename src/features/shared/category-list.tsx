import * as motion from "motion/react-client";
import { CategoryBadge } from "./category-badge";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1, // Stagger children by 0.1 seconds
			delayChildren: 0.2, // Delay the first child's animation by 0.2 seconds
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: 20 },
	visible: { opacity: 1, x: 0 },
};

function CategoryList() {
	return (
		<motion.div
			className="flex items-center gap-1.5"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div variants={itemVariants}>
				<CategoryBadge variant="protection" />
			</motion.div>
			<motion.div variants={itemVariants}>
				<CategoryBadge variant="delay" />
			</motion.div>
			<motion.div variants={itemVariants}>
				<CategoryBadge variant="cost" />
			</motion.div>
		</motion.div>
	);
}

export default CategoryList;
