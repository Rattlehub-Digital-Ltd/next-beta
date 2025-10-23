"use client";

import { AnalyticsBrowser } from "@customerio/cdp-analytics-browser";

export const cioanalytics = AnalyticsBrowser.load({
	writeKey: process.env.NEXT_PUBLIC_CIO_WRITE_KEY || "",
});

export default function Analytics() {
	return null;
}
