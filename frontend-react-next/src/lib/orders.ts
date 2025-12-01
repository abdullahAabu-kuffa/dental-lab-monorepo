// lib/orders.ts
"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  ApiOrder,
} from "@/app/dashboard/interfaces/orders";
async function fetchOrders(page = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?page=${page}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to fetch orders");
  }
  return res.json();
}

export function useOrders(page = 1) {
  return useQuery<ApiOrder[], Error>({
    queryKey: ["orders", page],
    queryFn: async () => {
      const res = await fetchOrders(page);
      return res.data.orders;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export async function fetchCreateOrder(body: object) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
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
  return data.data.id;
}



export function useUploadFile(
  options?: UseMutationOptions<{ id: string }, Error, File>) {
  const queryClient = useQueryClient();

  return useMutation<{ id: string }, Error, File>({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess: (data, Error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      if (options?.onSuccess) options.onSuccess(data,Error, variables, context);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
}
