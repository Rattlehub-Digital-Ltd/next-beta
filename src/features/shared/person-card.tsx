"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Person } from "@/types/person";
// import PersonDrawer from "./person-drawer";
import RemovePersonDrawer from "./remove-person-drawer";

type PersonCardProps = {
	canDelete?: boolean;
	person: Person;
	onDelete: (firstName: string, lastName: string, relationship: string) => void;
};

function PersonCard({ canDelete = true, person, onDelete }: PersonCardProps) {
	const { firstName, lastName, relationship, image: imgSrc } = person;

	return (
		<div className="flex items-center px-1.5 rounded-full h-11 w-full gap-3 bg-white border border-black/5 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
			{imgSrc && imgSrc !== "" && (
				<Avatar>
					<AvatarImage
						className="h-8 w-8"
						style={{ objectFit: "cover" }}
						src={imgSrc}
					/>
					<AvatarFallback>HB</AvatarFallback>
				</Avatar>
			)}
			{!imgSrc || imgSrc === "" ? (
				<div className="h-8 w-8 flex items-center justify-center bg-black/8 text-black/25 rounded-full">
					<Icon icon="fluent:person-32-filled" height={24} width={24} />
				</div>
			) : null}
			<div className="grow text-left">
				<p className="text-xs leading-4 text-[#3C3C43]/80 tracking-[-0.08px] truncate">
					{relationship}
				</p>
				<p className="text-[13px] font-semibold leading-4 truncate">
					{`${firstName} ${lastName}`}
				</p>
			</div>
			<div className="flex items-center gap-2">
				{/* <PersonDrawer person={person}>
					<Button className="h-8 w-8 px-0 py-0 rounded-full bg-black/[0.03] active:bg-black/[0.05]">
						<Icon icon="fluent:edit-20-regular" style={{ stroke: "#6b6b6b" }} />
					</Button>
				</PersonDrawer> */}
				{canDelete && (
					<RemovePersonDrawer
						onDelete={() => onDelete(firstName, lastName, relationship)}
					>
						<Button
							className="h-8 w-8 px-0 py-0 rounded-full bg-[#FEF2F2] text-red-500"
							type="button"
						>
							<Icon
								icon="fluent:delete-20-regular"
								style={{ stroke: "#DC2626" }}
								aria-label={`Delete ${firstName} ${lastName}`}
							/>
						</Button>
					</RemovePersonDrawer>
				)}
			</div>
		</div>
	);
}

export default PersonCard;
