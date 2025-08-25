import { Icon } from "@iconify/react";
import { appConfig } from "@/config/app.config";

export default function Changelog() {
	return (
		<div className="py-12 space-y-6">
			<div>
				<p className="font-extrabold text-lg px-2">Changelog</p>
			</div>
			<header className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-center text-white shadow-lg md:p-16 lg:p-20">
				<div className="relative z-10 mx-auto max-w-4xl space-y-4">
					<h1 className="text-lg font-bold">What&apos;s new?</h1>
					<p className="text-sm text-balance opacity-90">
						A rundown of the latest {appConfig.name} feature releases, product
						enhancements, design updates and important bug fixes.
					</p>
				</div>
			</header>
			<div className="space-y-6 px-4">
				{/* Changelog Entry 2 */}
				<div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
					<div className="text-muted-foreground mt-1 text-sm md:text-right">
						July 15, 2025
					</div>
					<div className="grid gap-4">
						<h2 className="text-sm font-semibold">Version 4.2.88</h2>
						<div className="flex flex-wrap gap-2">
							<Icon icon="fluent-color:warning-24" className="!h-6 !w-6" />
							<Icon
								icon="fluent-color:clipboard-text-edit-24"
								className="!h-6 !w-6"
							/>
						</div>
						<div className="grid gap-2">
							<h3 className="text-sm font-semibold">Improvements</h3>
							<ul className="text-muted-foreground text-[13px] list-disc space-y-1 pl-4">
								<li>Enhanced dashboard loading performance.</li>
								<li>New filtering options for user management.</li>
							</ul>
						</div>
						<div className="grid gap-2">
							<h3 className="text-sm font-semibold">Bug Fixes</h3>
							<ul className="text-muted-foreground text-[13px] list-disc space-y-1 pl-4">
								<li>
									Fixed an issue with report generation for large datasets.
								</li>
								<li>Resolved minor UI glitches on mobile devices.</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Separator */}
				<hr className="border-t border-black/10" />

				{/* Changelog Entry 3 */}
				<div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
					<div className="text-muted-foreground mt-1 text-sm md:text-right">
						August 08, 2025
					</div>
					<div className="grid gap-4">
						<h2 className="text-sm font-semibold">Version 4.2.85</h2>
						<div className="flex flex-wrap gap-2">
							<Icon
								icon="fluent-color:text-bullet-list-square-sparkle-24"
								className="!h-6 !w-6"
							/>
						</div>
						<div className="grid gap-2">
							<h3 className="text-sm font-semibold">New Features</h3>
							<ul className="text-muted-foreground text-[13px] list-disc space-y-1 pl-5">
								<li>Introduced dark mode support across the application.</li>
								<li>Added customizable notification preferences.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
