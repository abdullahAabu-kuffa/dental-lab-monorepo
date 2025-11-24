// lib/orders.ts
import { useMutation, useQuery } from "@tanstack/react-query";
const Token = process.env.TOKEN;
export async function fetchOrders() {
    const Token = localStorage.getItem("accessToken");
  const res = await fetch("http://localhost:3001/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Token}`
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


// export function createOrder  (body:object)=> {
//   return useMutation()
// }
