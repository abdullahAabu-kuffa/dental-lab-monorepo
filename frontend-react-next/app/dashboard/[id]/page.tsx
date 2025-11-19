"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../_components/@spinner";

interface OrderResponse {
  data: {
    id: number;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
    createdAt: string;
    totalPrice: number;
    options: { data: Record<string, unknown> };
  };
}

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  // Fetch Order
  const { data, isLoading, isError } = useQuery<OrderResponse>({
    queryKey: ["order", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM1NjM2NjQsImV4cCI6MTc2MzY1MDA2NH0.Iuu_f9jLfxGS05CYPbEmnLb-xTuDwiwsleaDWUXGyUU`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch order");
      const json = await res.json();
      return json;
    },
  });

  // Mutation to update order status
  const updateStatus = useMutation({
    mutationFn: async (newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED") => {
      const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM1NjM2NjQsImV4cCI6MTc2MzY1MDA2NH0.Iuu_f9jLfxGS05CYPbEmnLb-xTuDwiwsleaDWUXGyUU`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });

  const mapBackendStatusToUI = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Received";
      case "IN_PROGRESS":
        return "In Progress";
      case "COMPLETED":
        return "Completed";
      default:
        return "Received";
    }
  };

  const mapUIStatusToBackend = (status: string) => {
    switch (status) {
      case "Received":
        return "PENDING";
      case "In Progress":
        return "IN_PROGRESS";
      case "Completed":
        return "COMPLETED";
      default:
        return "PENDING";
    }
  };

  if (isLoading)
    return (
      <div className="mt-10 flex justify-center align-middle">
        <Spinner />
      </div>
    );

  if (isError || !data)
    return <div className="p-4 text-red-600">Error loading order</div>;

  const backendStatus = data.data.status;
  const uiStatus = mapBackendStatusToUI(backendStatus);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">ID:</span> {data.data.id}
        </p>

        {/* STATUS DROPDOWN */}
        <div>
          <span className="font-semibold">Status:</span>

          <select
            className="ml-2 border rounded-md px-3 py-2 bg-gray-50 cursor-pointer"
            value={uiStatus}
            onChange={(e) =>
              updateStatus.mutate(mapUIStatusToBackend(e.target.value))
            }
            disabled={updateStatus.isPending}
          >
            <option value="Received">Received</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {updateStatus.isPending && (
            <p className="text-blue-500 text-sm mt-1">Updating…</p>
          )}
          {updateStatus.isSuccess && (
            <p className="text-green-600 text-sm mt-1">
              Status updated successfully!
            </p>
          )}
        </div>

        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {data.data.createdAt.split("T")[0]}
        </p>

        <p>
          <span className="font-semibold">Total Price:</span>{" "}
          {data.data.totalPrice} EGP
        </p>
      </div>

      <button
        onClick={() => history.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}
