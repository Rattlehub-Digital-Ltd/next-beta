"use client";

import Image from "next/image";
import { useState } from "react";

type OptimizedImageProps = React.ComponentProps<typeof Image>;

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
	const [isLoading, setLoading] = useState(true);

	return (
		<Image
			src={src}
			alt={alt}
			loading="lazy"
			className={`duration-700 ease-in-out ${
				isLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"
			}`}
			onLoadingComplete={() => setLoading(false)}
			{...props}
		/>
	);
}
