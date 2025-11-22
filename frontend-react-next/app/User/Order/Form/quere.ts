"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export async function fetchCreateOrder(body: object) {
  const Token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:3001/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch orders");
  }

  const data = await res.json();
  return data;
}
export function useCreateOrder() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: object) => fetchCreateOrder(body),
    onSuccess:()=> {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
