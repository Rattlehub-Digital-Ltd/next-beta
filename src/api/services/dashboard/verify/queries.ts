import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { verifyEndpoints } from "./endpoints";

export const useVerifyEmail = () => {
	const { client } = useAxios();

	return useQuery({
		queryKey: ["verify"],
		queryFn: async () => {
			const { data } = await client.post(verifyEndpoints.verifyEmail());
			return data;
		},
		enabled: false,
	});
};
