import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../apiServices";

export function useUsers(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ['users', page, limit],
        queryFn: () => fetchUsers(page, limit),
        placeholderData: keepPreviousData,
    });
}
