import DocumentItem from "@/features/shared/document-item";
import Header from "../header";

export default function LifeFileDocuments() {
	return (
		<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<Header
				title="Life File Documents"
				description="All your important family documents"
				color="blue"
			/>

			<div className="grid grid-cols-2 gap-4">
				{data.map((item) => (
					<DocumentItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}

const data = [
	{
		id: "cabd163f-748e-4184-9082-013ca4664206|9c74eaf0-6fe9-4934-bed4-bb64d467d919|-5731904263030511986|94af91e0-a810-4f63-b032-9fc821c7ba56",
		displayName: "Marriage Certificate",
		affectedOwner: "Halle Berry",
		isApplicable: false,
	},
	{
		id: "900f7320-e77f-490e-9131-1654f0057878|db364bc6-e4d6-4483-9c85-896bbeba3cb3|-2271915620798043027|a48b6383-a0d5-4b92-a057-b67b544e3183",
		displayName: "Birth Certificate",
		affectedOwner: "John Wick",
		isApplicable: true,
	},
	{
		id: "9c73f422-11b3-4bf3-a6b0-575a69381929|fdde6b44-06f2-4665-8176-f85a174ee53b|-5690643141544927913|6090f220-cc11-45de-8743-d300a8507a98",
		displayName: "Power Of Attorney",
		affectedOwner: "Will",
		isApplicable: false,
	},
	{
		id: "12b35f4f-8561-4863-893c-facc334ff04c|fe73534f-6d3d-48a3-a7e8-b360ee6a4cba|2677883713899775060|dd997fa8-313a-46d9-a94a-756f33e85831",
		displayName: "Shareholder Agreement",
		affectedOwner: "Business",
		isApplicable: false,
	},
	{
		id: "963da037-48ca-476d-bf98-2d1d2f9a622c|60cb2d4f-c87e-453c-8c25-1b2480fe4cfd|1783124576153214121|94af91e0-a810-4f63-b032-9fc821c7ba56",
		displayName: "Antenuptial Agreement",
		affectedOwner: "Halle Berry",
		isApplicable: true,
	},
	{
		id: "cfa5fef3-583d-4f40-abb2-a645e6b43536|983f4a41-aa15-4ed1-aa1d-fb7c813b201a|2294639619918081772|a48b6383-a0d5-4b92-a057-b67b544e3183",
		displayName: "Identity Document",
		affectedOwner: "John Wick",
		isApplicable: false,
	},
];
