import { cn } from "@/lib/utils";

type HeaderProps = {
	title: string;
	description: string;
	className?: string;
	content?: React.ReactNode;
};

function Header({ title, description, className, content }: HeaderProps) {
	return (
		<header className={cn("space-y-1 px-3", className)}>
			<h1 className="text-xl font-extrabold">{title}</h1>
			<p className="text-sm text-pretty leading-5 text-[#616161]">
				{description}
			</p>
			<div>{content}</div>
		</header>
	);
}

export default Header;
