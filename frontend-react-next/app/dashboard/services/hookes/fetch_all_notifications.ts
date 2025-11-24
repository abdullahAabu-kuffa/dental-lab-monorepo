import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../apiServices";



export function useNotification() {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: () => getNotifications(),
    });
}