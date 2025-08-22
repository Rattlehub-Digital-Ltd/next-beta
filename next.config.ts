/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	allowedDevOrigins: [
		"local-origin.dev",
		"*.local-origin.dev",
		"*.localhost",
		"nextdotapp.b2clogin.com",
		"nextdotapp.onmicrosoft.com",
		"dev-wmhvsl21tz6qvxhl.ca.auth0.com",
		"auth.nextdot.ai",
		"dev-api.nextdot.ai",
		"app-api-guardian-rhlegacy-qa-001-preview.azurewebsites.net",
	],
	images: {
		// Add your image domains here
		remotePatterns: [
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "deadline.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "static.wikia.nocookie.net",
				port: "",
			},
		],
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{
						key: "Access-Control-Allow-Origin",
						value: process.env.NEXT_PUBLIC_APP_URL || "",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
					{
						key: "Vary",
						value: "Origin",
					},
				],
			},
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
