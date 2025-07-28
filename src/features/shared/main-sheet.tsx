import * as motion from "motion/react-client";
import Image from "next/image";

type MainSheetProps = {
	title?: string;
	imgSrc: string;
	imgAlt?: string;
	content: React.ReactNode;
};

function MainSheet({ title, imgSrc, imgAlt, content }: MainSheetProps) {
	return (
		<div className="grow w-full h-full bg-white/65 stroke-1 stroke-black/5 rounded-3xl backdrop-blur-[60px] shadow-[0px 16px 30px -3px rgba(106, 106, 106, 0.06)] space-y-4 p-4 flex flex-col">
			{title && (
				<header>
					<h1 className="text-sm font-bold uppercase text-center leading-6">
						{title}
					</h1>
				</header>
			)}
			<motion.div
				className="flex items-center justify-center"
				initial={{ scale: 0.8, opacity: 0.5 }}
				animate={{ scale: 1, opacity: 1, translateY: 0 }}
				transition={{
					duration: 0.5,
					type: "spring",
					visualDuration: 0.4,
					bounce: 0.5,
				}}
			>
				<div>
					<Image
						src={imgSrc}
						alt={imgAlt ?? "Image"}
						height={256}
						width={256}
					/>
				</div>
			</motion.div>
			<div className="grow flex flex-col">{content}</div>
		</div>
	);
}

export default MainSheet;
