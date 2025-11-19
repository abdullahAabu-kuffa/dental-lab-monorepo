// lib/orders.ts
import { useQuery } from "@tanstack/react-query";
const Token = process.env.TOKEN;
export async function fetchOrders() {
  const res = await fetch("http://localhost:3001/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM0ODk1NjYsImV4cCI6MTc2MzQ5MTM2Nn0.ge_lHuJ-Ng5UDYenj78wDmWM0HzQFtjM5HP1yRk4NHI`
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch orders");
  }

  const data = await res.json();
  return data; 
}


export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5, 
    refetchOnWindowFocus: true,     
  });
}
