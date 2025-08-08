"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import type { PaginationParams, TimelineData } from "@/types";
import type { ActionsResponse } from "@/types/action-item";
import type { ActivitySummary } from "@/types/activity-summary";
import { dashboardEndpoints } from "./endpoints";

export const useGetActivitySummary = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["activity_summary"],
		queryFn: async () => {
			const { data } = await client.get<ActivitySummary>(
				dashboardEndpoints.getActivitySummary(),
			);

			return data;
		},
	});
};

export const useGetDocuments = (paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["documents", paging],
		queryFn: async () => {
			const { data } = await client.get<ActionsResponse>(
				dashboardEndpoints.getDocuments(paging),
			);

			return data;
		},
	});
};

export const useGetAdaptiveCard = (referer: string, recordId?: string) => {
	const { client } = useAxios();

	const headers: Record<string, string> = {};

	if (recordId) {
		headers["x-record-identifier"] = recordId;
	}

	if (referer && referer.length > 0) {
		headers["x-referer-context"] = referer;
	}

	return useQuery({
		queryKey: ["adaptive_card", referer, recordId],
		queryFn: async () => {
			const { data } = await client.get<ActivitySummary>(
				dashboardEndpoints.getAdaptiveCard(),
				{
					baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}`,
					headers: {
						...headers,
					},
				},
			);

			return data;
		},
	});
};

export const useGetTimeline = (referer: string, paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["timeline", paging],
		queryFn: async () => {
			const { data } = await client.get<TimelineData>(
				dashboardEndpoints.getTimeline(paging),
				{
					headers: {
						"x-referer-context": referer,
					},
				},
			);

			return data;
		},
	});
};
