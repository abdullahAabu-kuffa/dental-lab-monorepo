"use client";

import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../_components/@spinner";

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // const queryClient = useQueryClient();

  // // Fetch order
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["order", id],
  //   queryFn: async () => {
  //     const res = await fetch(`http://localhost:3000/api/orders/${id}`);
  //     if (!res.ok) throw new Error("Failed to fetch order");
  //     return res.json();
  //   },
  // });

  // Mutation to update order status
  // const updateStatus = useMutation({
  //   mutationFn: async (newStatus: string) => {
  //     const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status: newStatus }),
  //     });

  //     if (!res.ok) throw new Error("Failed to update status");
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["order", id] });
  //   },
  // });

  // if (isLoading) return <div className="p-4">Loading…</div>;
  // if (error)
  //   return <div className="p-4 text-red-600">Error loading order.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">ID:</span> {id}
        </p>
        {/* <p>
          <span className="font-semibold">Type:</span> {data.type}
        </p> */}

        {/* STATUS DROPDOWN */}
        <div>
          <span className="font-semibold">Status:</span>

          <select
            className="ml-2 border rounded-md px-3 py-2 bg-gray-50 cursor-pointer"
            // value={data.status}
            // onChange={(e) => updateStatus.mutate(e.target.value)}
            // disabled={updateStatus.isPending}
          >
            <option value="Received">Received</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* {updateStatus.isPending && (
            <p className="text-blue-500 text-sm mt-1">Updating…</p>
          )}
          {updateStatus.isSuccess && (
            <p className="text-green-600 text-sm mt-1">
              Status updated successfully!
            </p>
          )} */}
        </div>

        <p>{/* <span className="font-semibold">Date:</span> {data.date} */}</p>
        <p>
          {/* <span className="font-semibold">Price:</span> {data.price} */}
        </p>
      </div>

      <button
        onClick={() => history.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back
      </button>
      <div className="mt-5 flex justify-center align-middle">
        <Spinner />
      </div>
    </div>
  );
}
