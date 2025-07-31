import TimelineItem from "./timeline-item";

export default function TimelineTab() {
	return (
		<div className="flex flex-col  p-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65">
			<TimelineItem ownerName="You" />
			<TimelineItem ownerName="Halle Berry" />
			<TimelineItem ownerName="Halle Berry" />
		</div>
	);
}
