"use client";
import { getAccessToken } from "@/app/src/auth/tokenStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export async function fetchCreateOrder(body: object) {
  const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoibW9oYW1lZGVtYWRyb3NoZHkxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MzkyNjcxNywiZXhwIjoxNzY0MDEzMTE3fQ.H41pjpDBVTGBPivYf9H_XQakAxmbAu6V-fydlzVggqg";
  if (!Token) return
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
