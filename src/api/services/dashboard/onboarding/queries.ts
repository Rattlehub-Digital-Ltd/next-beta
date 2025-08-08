"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { onboardingEndpoints } from "./endpoints";
import type { IsOnboardedStatus } from "./types";

export const useGetOnboarding = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["onboarding status"],
		queryFn: async () => {
			const { data } = await client.get<IsOnboardedStatus>(
				onboardingEndpoints.getOnboardingStatus(),
			);

			return data;
		},
	});
};
