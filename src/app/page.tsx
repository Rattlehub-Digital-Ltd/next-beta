import Link from "next/link";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<Link
						href="/login"
						className="focus:outline-none rounded-full border border-black/20 h-10 w-40 flex justify-center text-sm items-center px-4"
					>
						Login
					</Link>
					<Link
						href="/login"
						className="focus:outline-none rounded-full border border-black/20 h-10 w-40 flex justify-center text-sm items-center px-4"
					>
						Dashboard
					</Link>
				</div>
			</main>
		</div>
	);
}
