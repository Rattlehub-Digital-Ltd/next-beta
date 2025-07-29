import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

function ProfilePictureCard() {
	return (
		<div className="bg-white/67 rounded-3xl p-3 backdrop-blur-[24pxpx] shadow-[0px_16px_30px_-3px rgba(106, 106, 106, 0.06)]">
			<div className="flex items-center gap-4">
				<div className="bg-black/8 rounded-full h-16 w-16 relative flex items-center justify-center shrink-0">
					<Icon
						icon="fluent:person-32-filled"
						style={{ stroke: "#D1D1D1", opacity: 0.35 }}
						height={32}
						width={32}
					/>
				</div>
				<div className="space-y-1.5 grow">
					<p className="text-[11px] text-muted-foreground">
						Max file size: 5MB. Supported formats: JPG, PNG, WebP.
					</p>
					<Button
						className="bg-white text-xs shadow-[0px_0px_2px_0px rgba(0, 0, 0, 0.30)] h-6"
						variant="outline"
						size="sm"
					>
						Change picture
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProfilePictureCard;
