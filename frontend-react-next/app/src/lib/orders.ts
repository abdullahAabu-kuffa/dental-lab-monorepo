// lib/orders.ts
'use client'
import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedOrdersResponse } from "@/app/dashboard/interfaces/orders";
import useOrderStore2 from "../store/orders-store";

async function fetchOrders(page = 1) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoibW9oYW1lZGVtYWRyb3NoZHkxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2Mzk3OTUxMSwiZXhwIjoxNzY0MDY1OTExfQ.DGWyxI6gY7uN7VM26V-ZUeO3Q_yzA8ZOkMiK6DZQilg";
  const res = await fetch(`http://localhost:3001/api/orders?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch orders");
  }
  return res.json();
}

export function useOrders(page = 1) {
  const setData = useOrderStore2((state) => state.setData);

  return useQuery<PaginatedOrdersResponse, Error>({
    queryKey: ["orders", page],
    queryFn: () => fetchOrders(page).then((res) => res.data.data),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

}

// export function useCreateOrder() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (body: object) => {
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoibW9oYW1lZGVtYWRyb3NoZHkxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2Mzk0MzcxNywiZXhwIjoxNzY0MDMwMTE3fQ.opLn_BS9JvKrA7T9_9Bh6dpdc5xai_fPVL83QZxa2h0";
//       const res = await fetch("http://localhost:3001/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
//       if (!res.ok) {
//         const errorData = await res.json().catch(() => null);
//         throw new Error(errorData?.error || "Failed to create order");
//       }
//       return res.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries(["orders"]),
//   });
// }
