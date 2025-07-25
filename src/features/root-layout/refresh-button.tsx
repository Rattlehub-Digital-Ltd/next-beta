"use client";
import { useRouter } from "next/navigation";

const RefreshButton = () => {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.refresh()}
			className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
		>
			Refresh Page
		</button>
	);
};

export default RefreshButton;
