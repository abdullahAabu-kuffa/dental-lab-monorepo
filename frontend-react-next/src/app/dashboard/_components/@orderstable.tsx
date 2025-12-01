"use client";
import React, { useEffect, useState } from "react";
import { Search, View } from "lucide-react";
import { FcCancel } from "react-icons/fc";
import { MdDone } from "react-icons/md";
import OrderModal from "./@ordermodal";
import { ApiOrder, Order } from "../interfaces/orders";
import { useGetAllOrders } from "../services/hookes/get_all_orders";
import { useChangeOrderStatus } from "../services/hookes/change_order_status";
import ConfirmModal from "./@confirmmodel";
import { useLoading } from "@/contexts/LoadingContext";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../_components/@loading";
import ErrorMessage from "./@displayerrors";

const ACTION_MAP: Record<string, "IN_PROGRESS" | "CANCELLED"> = {
  approve: "IN_PROGRESS",
  reject: "CANCELLED",
};

const statusColors = {
  CANCELLED: "bg-gray-100 text-gray-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
};

const filters = ["All", "pending", "in_progress", "completed", "cancelled"];

const OrdersTable = ({
  overview,
  currentPage,
}: {
  overview?: boolean;
  currentPage: number;
}) => {
  const { setLoading } = useLoading();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { mutate } = useChangeOrderStatus();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [action, setAction] = useState("");
  const { data, isLoading, error, isError, refetch } = useGetAllOrders(
    currentPage,
    search,
    filter
  );
  const apiOrders = data?.data?.orders ?? [];
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["orders", currentPage, search, filter],
    });
    setLoading(isLoading);
  }, [isLoading, setLoading, currentPage, search, filter, queryClient]);

  if (isError) {
    return (
      <h1 className="text-red-500 flex justify-center align-middle">
        {(error as Error).message}
      </h1>
    );
  }

  const mappedOrders: Order[] = (apiOrders as ApiOrder[]).map((o) => ({
    id: Number(o.id),
    userId: o.user.id,
    type: o.type ?? "Unknown",
    date: o.createdAt.split("T")[0],
    status: o.status === "CANCELLED" ? "REJECTED" : o.status,
    price: `${o.totalPrice} EGP`,
    approvedBy: o.approvedBy,
    createdAt: o.createdAt,
    options: o.options,
    user: o.user,
  }));
  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-sm mx-6">
        <h2 className="text-lg font-semibold mb-4">All Orders</h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Customer Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-end gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                if (f === "CANCELLED") {
                  setFilter("Rejected");
                } else {
                  setFilter(f);
                }
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorMessage message={(error as Error).message} />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="text-left px-4 py-3">Order ID</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Date Submitted</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Total Price</th>
                  <th className="text-left px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {mappedOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`border-t border-gray-100 hover:bg-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {order.id}
                    </td>
                    <td className="px-4 py-3">{order.user.fullName}</td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "COMPLETED"
                            ? statusColors["COMPLETED"]
                            : order.status === "CANCELLED"
                            ? statusColors["CANCELLED"]
                            : order.status === "IN_PROGRESS"
                            ? statusColors["IN_PROGRESS"]
                            : statusColors["PENDING"]
                        }`}
                      >
                        {order.status === "COMPLETED"
                          ? "Completed"
                          : order.status === "CANCELLED"
                          ? "Cancelled"
                          : order.status === "IN_PROGRESS"
                          ? "In Progress"
                          : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.price}</td>

                    <td className="px-4 py-3 flex gap-1 text-center">
                      {!overview && order.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => {
                              setAction("approve");
                              setOrderId(Number(order.id));
                              setShowModal(true);
                            }}
                            className="px-2 py-1 text-xs font-medium rounded-full hover:bg-green-300 bg-green-100 text-green-700"
                          >
                            <div className="flex items-center gap-1">
                              <MdDone size={16} />
                              <span>Approve</span>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setAction("reject");
                              setOrderId(Number(order.id));
                              setShowModal(true);
                            }}
                            className="px-2 py-1 text-xs font-medium rounded-full hover:bg-red-300 bg-red-100 text-red-700"
                          >
                            <div className="flex items-center gap-1">
                              <FcCancel size={16} />
                              <span>Reject</span>
                            </div>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-300"
                      >
                        <div className="flex items-center gap-1">
                          <View size={16} />
                          <span>Details</span>
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedOrder && (
          <OrderModal
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        )}

        {showModal && (
          <ConfirmModal
            isLoading={isLoading}
            message="Are you Sure?"
            onConfirm={() =>
              mutate(
                {
                  orderId,
                  action: ACTION_MAP[action],
                },
                {
                  onSuccess: () => {
                    setShowModal(false);
                    refetch();
                    refetch();
                  },
                }
              )
            }
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default OrdersTable;
