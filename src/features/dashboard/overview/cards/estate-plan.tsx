import DocumentItem from "@/features/shared/document-item";
import GoalProgressBar from "@/features/shared/goal-progress-bar";
import Header from "../header";

export default function EstatePlan() {
	return (
		<div className="w-full h-full bg-[#FFFFFF]/65 p-4 border border-[#EBEDED] rounded-3xl backdrop-blur-[60px] shadow-[0px_12px_30px_0px rgba(106, 106, 106, 0.06)] space-y-8 flex flex-col">
			<Header
				title="Estate Plan"
				description="Keep track of all the required documents for this life event, for you and your family."
				color="teal"
			/>
			<GoalProgressBar title="Estate plan is 45% complete" progress="w-[45%]" />
			<div className="grid grid-cols-2 gap-4">
				{data.map((item) => (
					<DocumentItem
						key={item.id}
						className={
							item.isApplicable ? "bg-[#ECFDF5] ring-[#00C7BE]/80" : ""
						}
						color={item.isApplicable ? "#00C7BE" : ""}
						item={item}
					/>
				))}
			</div>
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
		isApplicable: false,
	},
	{
		id: "9c73f422-11b3-4bf3-a6b0-575a69381929|fdde6b44-06f2-4665-8176-f85a174ee53b|-5690643141544927913|6090f220-cc11-45de-8743-d300a8507a98",
		displayName: "Power Of Attorney",
		affectedOwner: "Will",
		isApplicable: true,
	},
	{
		id: "58b70aa0-32f2-49f5-a8a8-f72e1f3977a0|c519403b-c0fd-4927-b519-c5b3b15fbf85|8710999409527789052|dd997fa8-313a-46d9-a94a-756f33e85831",
		displayName: "Registration Certificate",
		affectedOwner: "Business",
		isApplicable: false,
	},
	{
		id: "ca9e1785-46cb-4203-a487-610618082168|4fffe5a2-b7b9-4118-aa82-2472b23dcd7b|1817417646667977446|dae601e4-1d6d-4fdc-99d7-3382a56561df",
		displayName: "Monthly Bill",
		affectedOwner: "Account",
		isApplicable: false,
	},
];
