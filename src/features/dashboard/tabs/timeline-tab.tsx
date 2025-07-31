import ShortUniqueId from "short-unique-id";
import TimelineItem from "./timeline-item";

const uid = new ShortUniqueId({ length: 10 });

export default function TimelineTab() {
	return (
		<div className="flex flex-col pt-8 px-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65">
			{data.map((item, index, arr) => (
				<TimelineItem
					key={uid.randomUUID()}
					item={item}
					lastItem={index === arr.length - 1}
				/>
			))}
		</div>
	);
}

const data = [
	{
		displayName: "Children",
		ownerDisplayName: "You",
		completed: false,
		applicable: true,
		modifiedDate: "2025-07-25T12:35:04Z",
		categories: ["Protection", "Delay", "Cost"],
		description: "Added children",
	},
	{
		displayName: "Monthly Accounts",
		ownerDisplayName: "You",
		completed: false,
		applicable: true,
		modifiedDate: "2025-07-25T12:35:04Z",
		categories: ["Protection", "Delay", "Cost"],
		description: "Added monthly accounts",
	},
	{
		displayName: "Monthly Accounts",
		ownerDisplayName: "You",
		completed: false,
		applicable: true,
		modifiedDate: "2025-07-25T12:35:04Z",
		categories: ["Protection", "Delay", "Cost"],
		description: "Added monthly accounts",
	},
	{
		displayName: "Monthly Accounts",
		ownerDisplayName: "You",
		completed: false,
		applicable: true,
		modifiedDate: "2025-07-25T12:35:04Z",
		categories: ["Protection", "Delay", "Cost"],
		description: "Added monthly accounts",
	},
	{
		displayName: "Monthly Accounts",
		ownerDisplayName: "You",
		completed: false,
		applicable: true,
		modifiedDate: "2025-07-25T12:35:04Z",
		categories: ["Protection", "Delay", "Cost"],
		description: "Added monthly accounts",
	},
];
