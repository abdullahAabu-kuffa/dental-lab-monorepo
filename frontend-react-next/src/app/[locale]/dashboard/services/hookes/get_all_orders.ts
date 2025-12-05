"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../apiServices";

export const useGetAllOrders = (page: number,search?: string, filter?: string) => {
    return useQuery({
        queryKey: ["orders", page, search, filter],
        queryFn: () => getAllOrders({ page , search, filter }), 
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    })
};