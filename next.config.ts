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
				source: "/src/app/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
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
				],
			},
		];
	},
};

module.exports = nextConfig;
