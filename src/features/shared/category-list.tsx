import * as motion from "motion/react-client";
import type { CategoryVariant } from "@/types/category-variant";
import { CategoryBadge } from "./category-badge";
import TagDialog from "./tag/tag-dialog";

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
	hidden: { opacity: 0.5, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
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
				<TagDialog key={item} name={item}>
					<motion.div whileTap={{ scale: 0.95 }} variants={itemVariants}>
						<CategoryBadge variant={item.toLowerCase() as CategoryVariant} />
					</motion.div>
				</TagDialog>
			))}
		</motion.div>
	);
}

export default CategoryList;
