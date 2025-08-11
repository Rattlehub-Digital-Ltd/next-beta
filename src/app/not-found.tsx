import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
			<div className="text-center">
				<h1 className="text-lg font-semibold">Oops!</h1>
				<div>
					<p className="mt-4 text-xs font-semibold text-left text-orange-400">
						404
					</p>
					<h2 className="font-mono text-3xl font-bold">Page Not Found</h2>
				</div>
			</div>
			<div className="shadow-xl">
				<Image
					src="/textures-abstract-texture-brush-stain-background.png"
					alt=""
					height={256}
					width={256}
				/>
			</div>
			<div className="space-y-1 text-sm text-center max-w-xs">
				<p className="font-medium">
					We couldn't find the page you were looking for.
				</p>
				<div className="inline">
					Go back to{" "}
					<Link href={"/dashboard"} className="underline underline-offset-1">
						Homepage
					</Link>
				</div>
			</div>
		</div>
	);
}
