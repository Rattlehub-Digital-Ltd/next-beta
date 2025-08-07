export type FamilyType = {
	displayName: string;
	itemType: string;
};

export type FamilyResponse = {
	data: FamilyType[];
};

export type DocumentLocation = {
	location: string;
	documents: [
		{
			id: string;
			displayName: string;
			affectedOwner: string;
			isApplicable: boolean;
		},
	];
};

export type DocumentLocationResponse = {
	data: DocumentLocation[];
};

export type EstatePlanType = {
	id: string;
	displayName: string;
	affectedOwner: string;
	isApplicable: boolean;
};

export type EstatePlanResponse = {
	data: EstatePlanType[];
};

export type LifeFileDocument = {
	id: string;
	displayName: string;
	affectedOwner: string;
	isApplicable: boolean;
};

export type LifeFileDocumentResponse = {
	data: LifeFileDocument[];
};
