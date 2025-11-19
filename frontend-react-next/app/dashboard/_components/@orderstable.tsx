"use client";
import React, {  useState } from "react";
import { Search, View } from "lucide-react";
import { FcCancel } from "react-icons/fc";
import { MdDone } from "react-icons/md";
import OrderModal from "./@ordermodal";
import Spinner from "./@spinner";
import { ApiOrder, Order } from "../interfaces/orders";
import { useGetAllOrders } from "../services/hookes/get_all_orders";
import { useChangeOrderStatus } from "../services/hookes/change_order_status";
import ConfirmModal from "./@confirmmodel";

const ACTION_MAP: Record<string, "COMPLETED" | "CANCELLED"> = {
  approve: "COMPLETED",
  reject: "CANCELLED",
};  

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const filters = ["All", "Pending", "In Progress", "Completed", "CANCELLED"];

const OrdersTable = ({ overview }: { overview?: boolean }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate } = useChangeOrderStatus();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [action, setAction] = useState("");

  const goNext = () => currentPage < pages && setCurrentPage(currentPage + 1);
  const goPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const { data, isLoading, error, isError } = useGetAllOrders(currentPage);
  const pages = data?.data?.totalPages || 1;
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-red-500 flex justify-center align-middle">
        {(error as Error).message}
      </h1>
    );
  }

  const apiOrders = data.data.orders ?? [];

  const mappedOrders: Order[] = (apiOrders as ApiOrder[]).map((o) => ({
    id: String(o.id),
    type: o.type ?? "Unknown",
    date: o.createdAt.split("T")[0],
    status:
      o.status === "PENDING"
        ? "Pending"
        : o.status === "IN_PROGRESS"
        ? "In Progress"
        : o.status === "COMPLETED"
        ? "Completed"
        : "Rejected",
    price: `${o.totalPrice} EGP`,
    approvedBy: o.approvedBy,
    createdAt: o.createdAt,
    options: o.options,
    user: o.user,
  }));

  const filteredOrders = mappedOrders.filter((order) => {
    const matchSearch = order.user.fullName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter = filter === "All" || order.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mx-6">
      <h2 className="text-lg font-semibold mb-4">All Orders</h2>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by Order Type..."
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
            onClick={() => setFilter(f)}
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
            {filteredOrders.map((order, idx) => (
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
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">{order.price}</td>

                <td className="px-4 py-3 flex gap-1 text-center">
                  {!overview && order.status === "Pending" && (
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

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4 mr-2 mb-4">
          <button
            onClick={goPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40 border-yellow-200 border-2"
          >
            Previous
          </button>

          <span className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-yellow-200 hover:text-white">
            {currentPage}
          </span>

          <button
            onClick={goNext}
            disabled={currentPage === pages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40 border-yellow-200 border-2"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}

      {showModal && (
        <ConfirmModal
          message="Are you Sure?"
          onConfirm={() =>
            mutate(
              {
                orderId,
                action: ACTION_MAP[action],
              },
              { onSuccess: () => setShowModal(false) }
            )
          }
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default OrdersTable;
