export type Person = {
	firstName: string;
	lastName: string;
	relationship: string;
	image?: string;
};

export type PersonType = "partner" | "child" | "dependent" | "unknown";
