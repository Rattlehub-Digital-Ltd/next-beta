const BASE_PATH = "/overview";

export const overviewEndpoints = {
	getOverviewLifeFileDocuments: () => `${BASE_PATH}/documents`,
	getOverviewFamily: () => `${BASE_PATH}/family`,
	getOverviewEstatePlan: () => `${BASE_PATH}/estate-plan`,
	getOverviewDocumentLocations: () => `${BASE_PATH}/document-locations`,
} as const;
