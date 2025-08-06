import { Badge } from "lucide-react";

export default function Changelog() {
	return (
		<div>
			{/* Changelog Entry 2 */}
			<div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
				<div className="text-muted-foreground mt-1 text-sm md:text-right">
					Jly 15, 2025
				</div>
				<div className="grid gap-4">
					<h2 className="text-2xl font-bold">Version 4.2.88</h2>
					<div className="flex flex-wrap gap-2">
						<Badge className="bg-purple-500/20 text-purple-600 hover:bg-purple-500/30">
							Improvements
						</Badge>
						<Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/30">
							Bug Fixes
						</Badge>
					</div>
					<div className="grid gap-2">
						<h3 className="text-lg font-semibold">Improvements</h3>
						<ul className="text-muted-foreground list-disc space-y-1 pl-5">
							<li>Enhanced dashboard loading performance.</li>
							<li>New filtering options for user management.</li>
						</ul>
					</div>
					<div className="grid gap-2">
						<h3 className="text-lg font-semibold">Bugfixes</h3>
						<ul className="text-muted-foreground list-disc space-y-1 pl-5">
							<li>Fixed an issue with report generation for large datasets.</li>
							<li>Resolved minor UI glitches on mobile devices.</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Separator */}
			<hr className="border-t" />

			{/* Changelog Entry 3 */}
			<div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
				<div className="text-muted-foreground mt-1 text-sm md:text-right">
					August 08, 2025
				</div>
				<div className="grid gap-4">
					<h2 className="text-2xl font-bold">Version 4.2.85</h2>
					<div className="flex flex-wrap gap-2">
						<Badge className="bg-purple-500/20 text-purple-600 hover:bg-purple-500/30">
							New Features
						</Badge>
					</div>
					<div className="grid gap-2">
						<h3 className="text-lg font-semibold">New Features</h3>
						<ul className="text-muted-foreground list-disc space-y-1 pl-5">
							<li>Introduced dark mode support across the application.</li>
							<li>Added customizable notification preferences.</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
