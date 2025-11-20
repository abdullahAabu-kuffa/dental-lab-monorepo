import { useQuery } from "@tanstack/react-query";
import { getMe } from "../apiServices";

export const useGetProfileInfo = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => getMe(),
    });
}