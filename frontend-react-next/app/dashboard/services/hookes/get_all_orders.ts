"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrders } from "../apiServices";

export const useGetAllOrders = (page: number) => {
    // const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["orders", page],
        queryFn: () => getAllOrders({ page }), 

    });
};