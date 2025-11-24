import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../apiServices";

export function useUsers(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ['users', page, limit],
        queryFn: () => fetchUsers(page, limit),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
}
