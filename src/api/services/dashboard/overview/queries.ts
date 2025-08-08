"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { overviewEndpoints } from "./endpoints";
import type {
	DocumentLocation,
	EstatePlanType,
	FamilyType,
	LifeFileDocument,
} from "./types";

export const useGetDocumentLocations = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["document_locations"],
		queryFn: async () => {
			const { data } = await client.get<DocumentLocation[]>(
				overviewEndpoints.getOverviewDocumentLocations(),
			);

			return data;
		},
	});
};

export const useGetEstatePlan = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["estate_plan"],
		queryFn: async () => {
			const { data } = await client.get<EstatePlanType[]>(
				overviewEndpoints.getOverviewEstatePlan(),
			);

			return data;
		},
	});
};

export const useGetFamily = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["family"],
		queryFn: async () => {
			const { data } = await client.get<FamilyType[]>(
				overviewEndpoints.getOverviewFamily(),
			);

			return data;
		},
	});
};

export const useGetLifeFileDocuments = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["life_file_documents"],
		queryFn: async () => {
			const { data } = await client.get<LifeFileDocument[]>(
				overviewEndpoints.getOverviewLifeFileDocuments(),
			);

			return data;
		},
	});
};
