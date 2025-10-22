"use client";

import { RedirectType, redirect } from "next/navigation";
import useUTMPersistence from "@/hooks/use-utm-persistence";

export default function Home() {
	useUTMPersistence(window.location.search);
	redirect("/dashboard", RedirectType.replace);
}
