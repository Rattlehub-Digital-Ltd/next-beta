import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">
					404 - Page Not Found
				</h1>
				<p className="text-gray-600 mb-6">
					Sorry, the page you are looking for does not exist.
				</p>
				<Link href="/">
					<span className="text-blue-500 hover:underline">
						Go back to the homepage
					</span>
				</Link>
			</div>
		</div>
	);
}
