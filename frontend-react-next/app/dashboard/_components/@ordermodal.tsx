import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./@spinner";

interface Order {
  id: string;
  approvedBy: string;
  createdAt: string;
  type: string;
  date: string;
  options: [];
  status: "Pending" | "In Progress" | "Completed" | "Rejected";
  price: string;
  user: {
    clinicAddress: string;
    clinicName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
}

interface OrderModalProps {
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
}

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Completed": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
  "Cancelled": "bg-gray-100 text-gray-800",
};

type OptionValue = string | number | boolean | null;

const OrderModal = ({ selectedOrder, setSelectedOrder }: OrderModalProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", selectedOrder?.id],
    enabled: !!selectedOrder?.id,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/api/orders/${selectedOrder?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM1NjM2NjQsImV4cCI6MTc2MzY1MDA2NH0.Iuu_f9jLfxGS05CYPbEmnLb-xTuDwiwsleaDWUXGyUU`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch order");

      return res.json();
    },
  });

  const mappedOrder = useMemo(() => {
    if (!data) return null;

    // Fix options extraction
    const opts = data.data.options?.data ?? data.data.options ?? {};

    return {
      id: data.data.id,
      status:
        data.data.status === "PENDING"
          ? "Pending"
          : data.data.status === "IN_PROGRESS"
          ? "In Progress"
          : data.data.status === "COMPLETED"
          ? "Completed"
          : "Rejected",
      price: `${data.data.totalPrice} EGP`,
      options: opts as Record<string, OptionValue>,
    };
  }, [data]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="p-6 text-red-600">Failed to load order details</div>
        ) : (
          mappedOrder && (
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Order Details
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Order ID: {mappedOrder.id}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Status */}
              <span
                className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                  statusColors[mappedOrder.status as keyof typeof statusColors]
                }`}
              >
                {mappedOrder.status}
              </span>

              {/* Order Info */}
              <div className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Order Type
                    </p>
                    <p className="text-gray-800 font-medium">
                      {selectedOrder?.type}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Submission Date
                    </p>
                    <p className="text-gray-800 font-medium">
                      {selectedOrder?.date}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Total Price
                  </p>
                  <p className="text-2xl text-gray-800 font-bold">
                    {mappedOrder.price}
                  </p>
                </div>

                {/* Options */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Order Options
                  </h4>

                  {Object.keys(mappedOrder.options).length === 0 ? (
                    <p className="text-gray-500 text-sm">No options added</p>
                  ) : (
                    Object.entries(mappedOrder.options).map(
                      ([key, value]: [string, OptionValue]) => {
                        const label = key
                          .replace(/_/g, " ")
                          .replace(/([A-Z])/g, " $1")
                          .replace(/\b\w/g, (c) => c.toUpperCase());

                        const display =
                          typeof value === "boolean"
                            ? value
                              ? "Yes"
                              : "No"
                            : value ?? "—";

                        return (
                          <div
                            key={key}
                            className="flex justify-between bg-gray-50 p-3 rounded-lg mb-2"
                          >
                            <span className="text-gray-700">{label}</span>
                            <span className="font-medium">{display}</span>
                          </div>
                        );
                      }
                    )
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>

                <Link
                  href={`/dashboard/${selectedOrder?.id}`}
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  More Details
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrderModal;
