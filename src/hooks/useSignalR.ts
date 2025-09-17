// hooks/useSignalR.ts

import {
	HttpTransportType,
	type HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";
import useAxios from "./use-axios";

interface Message {
	sender: string;
	content: string;
	sentTime: Date;
}

const useSignalR = (hubUrl: string) => {
	const { accessToken } = useAxios();
	const [connection, setConnection] = useState<HubConnection | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!accessToken || !hubUrl) return;

		const newConnection = new HubConnectionBuilder()
			.withUrl(hubUrl, {
				accessTokenFactory: () => accessToken as string,
				transport: HttpTransportType.LongPolling,
				withCredentials: false,
				skipNegotiation: false,
				headers: {
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.withAutomaticReconnect() // Optional: Automatically reconnects if the connection is lost
			.configureLogging(LogLevel.Information) // Optional: Configure logging
			.build();

		setConnection(newConnection);
	}, [hubUrl, accessToken]);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(() => {
					console.log("SignalR connection established.");

					// Register a handler for a specific hub method, e.g., "ReceiveMessage"
					connection.on("ReceiveMessage", (sender, content, sentTime) => {
						const message: Message = { sender, content, sentTime };
						setMessages((prevMessages) => [...prevMessages, message]);
						console.log(message, "hey");
					});
				})
				.catch((error) => console.error("SignalR connection failed: ", error));

			// Clean up the connection when the component unmounts
			return () => {
				connection.stop();
			};
		}
	}, [connection]);

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
