/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	images: {
		domains: ["encrypted-tbn0.gstatic.com"], // Add your image domains here
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
