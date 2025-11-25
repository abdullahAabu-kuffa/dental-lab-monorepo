// lib/orders.ts
"use client";
import * as React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { PaginatedOrdersResponse } from "@/app/dashboard/interfaces/orders";
import useOrderStore2 from "../store/orders-store";
async function fetchOrders(page = 1) {
  const res = await fetch(`http://localhost:3001/api/orders?page=${page}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch orders");
  }
  return res.json();
}

export function useOrders(page = 1) {
  return useQuery<PaginatedOrdersResponse, Error>({
    queryKey: ["orders", page],
    queryFn: async() => {
      const res = await fetchOrders(page);
      return res.data?.orders ?? [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
}

export async function fetchCreateOrder(body: object) {
  const res = await fetch("http://localhost:3001/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to create order");
  }

  const data = await res.json();
  return data;
}
export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: object) => fetchCreateOrder(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("http://localhost:3001/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.log(
      errorData?.error || "Failed to fetch orders",
      errorData.message
    );
    throw new Error(
      errorData?.error || errorData?.message || "Failed to upload file"
    );
  }

  const data = await res.json();
  return data;
}
export function useUploadFile(
  options?: UseMutationOptions<any, unknown, File>
) {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, File>({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      if (options?.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
}
