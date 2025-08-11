"use client";

import { createContext } from "react";
import { identify, track } from "./analytics";

type AnalyticsContextType = {
	track: (eventName: string, payload?: Record<string, any>) => void;
	identify: (userId: string, traits?: Record<string, any>) => void;
};

export const AnalyticsContext = createContext<AnalyticsContextType>({
	track: () => {},
	identify: () => {},
});

export const AnalyticsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<AnalyticsContext.Provider value={{ track, identify }}>
			{children}
		</AnalyticsContext.Provider>
	);
};
