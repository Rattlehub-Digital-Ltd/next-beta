"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";
import { useAppStore } from "store/use-app-store";
import Loading from "./loading";

function UTMPersistence() {
	const { getIdTokenClaims, isLoading } = useAuth0();
	const { setIsAdmin } = useAppStore();

	const init = useCallback(async () => {
		const idTokenClaims = await getIdTokenClaims();
		if (idTokenClaims) {
			const role = idTokenClaims?.[
				"https://app.nextdot.ai/roles"
			]?.[0] as string;
			if (role && role.toLowerCase() === "rattlehub-staff") {
				setIsAdmin(true);
			}
		}
	}, [getIdTokenClaims, setIsAdmin]);

	useEffect(() => {
		if (!window || !window.location || !sessionStorage) return;

		const value = window.location.search;

		if (value && value !== "/") {
			sessionStorage.setItem("origin_href", window.location.href);
		}

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

			init();
		} catch (error) {
			console.log(error);
		}
	}, [init]);

	if (isLoading) return <Loading />;

	return undefined;
}

export default UTMPersistence;
