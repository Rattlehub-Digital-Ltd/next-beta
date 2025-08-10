import * as motion from "motion/react-client";
import type { CategoryVariant } from "@/types/category-variant";
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
	hidden: { x: 2 },
	visible: { x: 0 },
};

type CategoryListProps = {
	items: string[];
};

function CategoryList({ items }: CategoryListProps) {
	return (
		<motion.div
			className="flex items-center gap-1.5"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{items.map((item) => (
				<motion.div key={item} variants={itemVariants}>
					<CategoryBadge variant={item.toLowerCase() as CategoryVariant} />
				</motion.div>
			))}
		</motion.div>
	);
}

export default CategoryList;
