import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// src/middleware.ts
// biome-ignore lint/correctness/noUnusedFunctionParameters: true
export function middleware(request: NextRequest) {
	const response = NextResponse.next();
	response.headers.set("X-DNS-Prefetch-Control", "off");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("X-Frame-Options", "SAMEORIGIN");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("Referrer-Policy", "origin-when-cross-origin");
	response.headers.set(
		"Strict-Transport-Security",
		"max-age=31536000; includeSubDomains",
	);
	response.headers.set(
		"Permissions-Policy",
		"camera=(), microphone=(), geolocation=(), interest-cohort=()",
	);

	return response;
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
