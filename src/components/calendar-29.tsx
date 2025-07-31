"use client";

import * as React from "react";
import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react";

function formatDate(date: Date | undefined) {
	if (!date) {
		return "";
	}

	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

export default function Calendar29() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("In 2 days");
	const [date, setDate] = React.useState<Date | undefined>(
		parseDate(value) || undefined,
	);
	const [month, setMonth] = React.useState<Date | undefined>(date);

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				Schedule Date
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={value}
					placeholder="Tomorrow or next week"
					className="bg-background pr-10"
					onChange={(e) => {
						setValue(e.target.value);
						const date = parseDate(e.target.value);
						if (date) {
							setDate(date);
							setMonth(date);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-picker"
							variant="ghost"
							className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
						>
							<CalendarIcon className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="end">
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={(date) => {
								setDate(date);
								setValue(formatDate(date));
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="text-muted-foreground px-1 text-sm">
				We will send you a reminder email on
				<br />
				<br />
				<div className="flex">
					<div className="flex items-center space-x-2 py-2 text-indigo-600 text-sm rounded-lg px-2 bg-indigo-100">
						<Icon
							icon="fluent:calendar-clock-24-filled"
							height={18}
							width={18}
						/>
						<span className="font-medium">{formatDate(date)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
