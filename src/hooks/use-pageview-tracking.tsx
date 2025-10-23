"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { cioanalytics } from "@/components/Analytics";

function UsePageviewTracking() {
	const pathame = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const fullPath = `${pathame}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
		cioanalytics.page(fullPath);
	}, [pathame, searchParams]);
}

export default UsePageviewTracking;
