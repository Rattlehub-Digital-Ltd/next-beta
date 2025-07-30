type HeaderProps = {
	title: string;
	description: string;
	content?: React.ReactNode;
};

function Header({ title, description, content }: HeaderProps) {
	return (
		<header className="space-y-1">
			<h1 className="text-xl font-extrabold">{title}</h1>
			<p className="text-sm text-pretty leading-4 text-[#616161]">
				{description}
			</p>
			<div>{content}</div>
		</header>
	);
}

export default Header;
