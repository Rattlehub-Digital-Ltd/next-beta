"use client";

const RefreshButton = () => {
	return (
		<button
			type="button"
			onClick={() => window.location.reload()}
			className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
		>
			Refresh Page
		</button>
	);
};

export default RefreshButton;
