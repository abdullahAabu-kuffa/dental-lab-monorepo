"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import { Order } from "../interfaces/users";
import { useGetProfileInfo } from "../services/hookes/get_profile_info";

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
  }) {
  const { data: me } = useGetProfileInfo();
  useEffect(() => {
    if (me) {
      if (me?.data?.user?.role !== "ADMIN") window.location.href = "/User";
    }
  }, [me]);
  const searchParams = useSearchParams();
  const orderQuery = searchParams.get("order");
  const [order, setOrder] = useState(orderQuery ? JSON.parse(orderQuery) : null);
  const { id } = use(params);
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: async (newStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") => {
      const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM4MDk5ODMsImV4cCI6MTc2Mzg5NjM4M30.I6MUalfg3MHIv0T9eFCI3vDiT-GrTxmmjQS2tlRP3_o`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed updating status");
      return res.json();
    },
    onSuccess: (data) => {
      setOrder((prev: Order) => ({
        ...prev,
        status: data.data.status, 
      }));
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });
  const mapBackendStatusToUI = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "IN_PROGRESS":
        return "In Progress";
      case "COMPLETED":
        return "Completed";
      case "CANCELLED":
        return "REJECTED";
      default:
        return "Pending";
    }
  };

  const mapUIStatusToBackend = (status: string) => {
    switch (status) {
      case "Pending":
        return "PENDING";
      case "In Progress":
        return "IN_PROGRESS";
      case "Completed":
        return "COMPLETED";
      case "REJECTED":
        return "CANCELLED";
      default:
        return "PENDING";
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-2xl shadow-2xl border border-white/20 rounded-3xl p-10 animate-fadeIn">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-black drop-shadow-lg mb-10 text-center">
        Order Details
        </h1>

        {/* Main Info Card */}
        <div className="rounded-2xl p-6 bg-white/30 shadow-xl border border-white/40 mb-8">
          <div className="grid grid-cols-2 gap-6 text-lg text-gray-800">
            <p>
              <span className="font-semibold text-gray-900">Order ID:</span>{" "}
              {order.id}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Total Price:</span>{" "}
              {order.price}
            </p>

            <p>
              <span className="font-semibold text-gray-900">Created At:</span>{" "}
              {order.createdAt.split("T")[0]}
            </p>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 mb-1">Status:</span>
              <select
                className="px-4 py-2 rounded-xl bg-white/40 border border-white/50 shadow-inner 
                           cursor-pointer focus:ring-2 ring-white-400 transition"
                value={mapBackendStatusToUI(order.status)}
                onChange={(e) =>
                  updateStatus.mutate(mapUIStatusToBackend(e.target.value))
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

              {updateStatus.isPending && (
                <p className="text-blue-700 text-sm mt-1">Updating…</p>
              )}
              {updateStatus.isSuccess && (
                <p className="text-emerald-700 text-sm mt-1">
                  Status updated successfully!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Options Card */}
        <div className="rounded-2xl p-6 bg-white/20 shadow-xl border border-white/30 mb-8">
          <h2 className="text-2xl font-bold text-blck mb-4 drop-shadow-md">
            Order Options
          </h2>

          {!order.options?.data ? (
            <p className="text-gray-400">No options available</p>
          ) : (
            <div className="space-y-2 text-black">
              {Object.entries(order.options.data).map(([key, value]) => (
                <div
                  key={key}
                  className="flex py-2 border-b border-white/20"
                >
                  <span className="font-semibold capitalize mr-1">{key}</span>
                  <span>: {String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer Card */}
        <div className="rounded-2xl p-6 bg-white/20 shadow-xl border border-white/30">
          <h2 className="text-2xl font-bold text-black mb-4 drop-shadow-md">
             Customer Information
          </h2>

          <div className="space-y-2 text-black/90">
            <p>
              <span className="font-semibold">Name:</span> {order.user.fullName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {order.user.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Clinic Address:</span>{" "}
              {order.user.clinicAddress}
            </p>
            <p>
              <span className="font-semibold">Clinic Name:</span>{" "}
              {order.user.clinicName}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => history.back()}
          className="w-full mt-10 py-3 text-xl rounded-xl bg-blue-500 text-white font-semibold 
                     shadow-lg hover:bg-blue-600 transition backdrop-blur-lg"
        >
           Go Back
        </button>
      </div>
    </div>
  );
}
