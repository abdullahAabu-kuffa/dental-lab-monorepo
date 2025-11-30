"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../apiServices";

export const useGetAllOrders = (page: number) => {
    return useQuery({
        queryKey: ["orders", page],
        queryFn: () => getAllOrders({ page }), 
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    })
};