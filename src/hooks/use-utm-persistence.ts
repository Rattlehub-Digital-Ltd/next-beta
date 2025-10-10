"use client";

import { useEffect } from "react";

const useUTMPersistence = (value: string) => {
	useEffect(() => {
		if (!window || !window.location || !sessionStorage) return;

		console.log(window.location.search);

		try {
			const urlParams = new URLSearchParams(value ?? window.location.search);
			console.log("urlParams", urlParams);
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
	}, [value]);
};

export default useUTMPersistence;
