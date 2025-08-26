"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { onboardingEndpoints } from "./endpoints";
import type {
	EstateChecklistItem,
	IsOnboardedStatus,
	OnboardingDataPayload,
} from "./types";

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

export const useGetSettings = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["onboarding_settings"],
		queryFn: async () => {
			const { data } = await client.get<EstateChecklistItem[]>(
				onboardingEndpoints.getSettings(),
			);

			return data;
		},
	});
};

export const useSubmitOnboardingData = () => {
	const { client } = useAxios();

	return useMutation({
		mutationFn: async ({ payload }: { payload: OnboardingDataPayload }) => {
			const resp = await client.post(onboardingEndpoints.submitData(), payload);
			return resp;
		},
	});
};
