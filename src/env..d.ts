declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_API_URL: string;
		NEXT_PUBLIC_MEASUREMENT_ID: string;
		NEXT_PUBLIC_SITE_ID: string;
		NEXT_PUBLIC_CUSTOMER_IO_API_KEY: string;
		NODE_ENV: "development" | "production" | "test";
	}
}
