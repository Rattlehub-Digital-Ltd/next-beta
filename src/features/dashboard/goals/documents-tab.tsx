import DocumentItem from "@/features/shared/document-item";

export default function DocumentsTab() {
	return (
		<div className="grid grid-cols-2 gap-4 pt-4 px-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65">
			{data.map((item) => (
				<DocumentItem
					key={item.id}
					className={item.isApplicable ? "bg-[#ECFDF5] ring-[#00C7BE]/80" : ""}
					color={item.isApplicable ? "#00C7BE" : ""}
					item={item}
				/>
			))}
		</div>
	);
}

const data = [
	{
		id: "77d47f87-d023-4a67-a428-008ee3fda1aa|3314a04b-90a8-497b-b9e7-19a7e8e7b19e|6296961441451087373|6090f220-cc11-45de-8743-d300a8507a98",
		displayName: "Living Will",
		affectedOwner: "Will",
		isApplicable: false,
	},
	{
		id: "7c9997b3-a46b-400d-befd-296b9973d749|c34974e9-886e-4a8f-9614-39e7161c9cfb|-7843828243909758360|6090f220-cc11-45de-8743-d300a8507a98",
		displayName: "International Will",
		affectedOwner: "Will",
		isApplicable: true,
	},
	{
		id: "58535cfc-4ec8-4c37-ac97-569cf787a5e1|182e7bf9-37e0-4196-a3ec-9f41eaef2e5c|-5455365256916527053|6090f220-cc11-45de-8743-d300a8507a98",
		displayName: "Local Will",
		affectedOwner: "Will",
		isApplicable: true,
	},
	{
		id: "9c73f422-11b3-4bf3-a6b0-575a69381929|fdde6b44-06f2-4665-8176-f85a174ee53b|-5690643141544927913|6090f220-cc11-45de-8743-d300a8507a98",
		displayName: "Power Of Attorney",
		affectedOwner: "Will",
		isApplicable: false,
	},
];
