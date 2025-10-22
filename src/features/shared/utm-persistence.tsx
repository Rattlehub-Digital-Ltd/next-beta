"use client";

import { useEffect } from "react";

function UTMPersistence() {
	useEffect(() => {
		if (!window || !window.location || !sessionStorage) return;

		const value = window.location.search;

		try {
			const urlParams = new URLSearchParams(value ?? window.location.search);

			const keys = [
				"utm_source",
				"utm_medium",
				"utm_campaign",
				"utm_term",
				"utm_content",
			];
			keys.forEach((key) => {
				const value = urlParams.get(key);
				if (value) {
					sessionStorage.setItem(key, value);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return undefined;
}

export default UTMPersistence;
