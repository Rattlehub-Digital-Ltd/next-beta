/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
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
	headers: async () => {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
