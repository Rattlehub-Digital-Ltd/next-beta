"use client";

import {
	HttpTransportType,
	type HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useGetOnboarding } from "@/api/services/dashboard/onboarding/queries";
import type { IsOnboardedStatus } from "@/api/services/dashboard/onboarding/types";
import useAxios from "./use-axios";

const useSignalR = (hubUrl: string) => {
	const { data: onboardingStatus, isLoading } = useGetOnboarding();

	const { accessToken } = useAxios();
	const [connection, setConnection] = useState<HubConnection | null>(null);
	const [messages, setMessages] = useState<IsOnboardedStatus[]>([]);

	useEffect(() => {
		if (
			!accessToken ||
			!hubUrl ||
			!onboardingStatus ||
			onboardingStatus?.isEmailVerified ||
			isLoading
		)
			return;

		const newConnection = new HubConnectionBuilder()
			.withUrl(hubUrl, {
				accessTokenFactory: () => accessToken,
				transport: HttpTransportType.LongPolling,
				withCredentials: false,
			})
			.withAutomaticReconnect() // Optional: Automatically reconnects if the connection is lost
			.configureLogging(LogLevel.Information) // Optional: Configure logging
			.build();

		setConnection(newConnection);
	}, [hubUrl, accessToken, onboardingStatus, isLoading]);

	useEffect(() => {
		if (!onboardingStatus || onboardingStatus?.isEmailVerified || isLoading)
			return;

		if (connection) {
			connection
				.start()
				.then(() => {
					console.log("SignalR connection established.");

					// Register a handler for a specific hub method, e.g., "ReceiveMessage"
					connection.on("ReceiveMessage", (message) => {
						setMessages((prevMessages) => [...prevMessages, message]);
					});
				})
				.catch((error) => console.log("SignalR connection failed: ", error));

			// Clean up the connection when the component unmounts
			// return () => {
			// 	connection.stop();
			// };
		}
	}, [connection, onboardingStatus, isLoading]);

	// Method to invoke a hub method, e.g., "SendMessage"
	const sendMessage = (sender: string, content: string) => {
		if (connection && connection.state === "Connected") {
			connection.invoke("SendMessage", sender, content).catch((err) => {
				console.error("Failed to send message: ", err);
			});
		} else {
			console.warn("SignalR connection is not yet established.");
		}
	};

	return { messages, sendMessage };
};

export default useSignalR;
