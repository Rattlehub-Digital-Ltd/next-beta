"use client";

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryClient";
import useAxios from "@/hooks/use-axios";
import type { PaginationParams, TimelineData } from "@/types";
import type { ActionsResponse } from "@/types/action-item";
import type { ActivitySummary } from "@/types/activity-summary";
import type { Document } from "@/types/document";
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
		queryKey: [...queryKeys.documents.all, paging],
		queryFn: async () => {
			const { data } = await client.get<ActionsResponse>(
				dashboardEndpoints.getDocuments(paging),
			);

			return data;
		},
	});
};

export const useGetGoalDocuments = (goalName: string) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["goal_documents", goalName],
		queryFn: async () => {
			const { data } = await client.get<Document[]>(
				dashboardEndpoints.getGoalDocuments(goalName),
			);

			return data;
		},
	});
};

export const useInfiniteGetDocuments = () => {
	const { client } = useAxios();

	return useInfiniteQuery({
		queryKey: [...queryKeys.documents.all],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await client.get<ActionsResponse>(
				dashboardEndpoints.getInfiniteDocuments(pageParam),
			);

			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const lastBatch = lastPage.totalItems ?? 0;
			if (lastBatch < lastPage.pageSize) return undefined;
			return allPages.length + 1;
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
			// biome-ignore lint/suspicious/noExplicitAny: unknown object
			const { data } = await client.get<any>(
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

export const useAutoAdvanceAdaptiveCard = () => {
	const { client } = useAxios();

	return useMutation({
		mutationFn: async ({
			formData,
			headers,
		}: {
			formData: FormData;
			headers: object;
		}) => {
			// biome-ignore lint/suspicious/noExplicitAny: unknown object
			const card = await client.put<any>(
				dashboardEndpoints.autoAdvanceAdaptiveCard(),
				formData,
				{
					baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL as string}`,
					headers: {
						"Content-Type": "multipart/form-data",
						...headers,
					},
				},
			);

			return { formData, headers, card };
		},
	});
};

export const useInfiniteGetTimeline = (
	referer: string,
	paging: PaginationParams,
) => {
	const { client } = useAxios();

	return useInfiniteQuery({
		queryKey: [
			"timeline",
			referer,
			paging,
			"infinite",
			{ limit: paging.limit },
		],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await client.get<TimelineData>(
				dashboardEndpoints.getInfiniteTimeline(pageParam),
			);

			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const lastBatch = lastPage.totalItems ?? 0;
			if (lastBatch < lastPage.pageSize) return undefined;
			return allPages.length + 1;
		},
	});
};

export const useGetTimeline = (referer: string, paging: PaginationParams) => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["timeline", referer, paging],
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
