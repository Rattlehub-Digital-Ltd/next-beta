import { NextResponse } from "next/server";

export function middleware() {
	const response = NextResponse.next();

	// Add security headers
	response.headers.set("X-DNS-Prefetch-Control", "on");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("X-Frame-Options", "SAMEORIGIN");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("Referrer-Policy", "origin-when-cross-origin");
	response.headers.set(
		"Content-Security-Policy",
		"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;",
	);
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
	matcher: "/:path*",
};
