"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { View } from "lucide-react";
import { FcCancel } from "react-icons/fc";
import { MdDone } from "react-icons/md";
import OrderModal from "./@ordermodal";

interface Order {
  id: string;
  type: string;
  date: string;
  status: "Pending" | "In Progress" | "Completed"| "Rejected";
  price: string;
}

const orders: Order[] = [
  {
    id: "DDL-0124",
    type: "Zirconia Crown",
    date: "2024-07-22",
    status: "Completed",
    price: "2,500 EGP",
  },
  {
    id: "DDL-0123",
    type: "PFM Bridge",
    date: "2024-07-21",
    status: "Pending",
    price: "1,800 EGP",
  },
  {
    id: "DDL-0122",
    type: "E-max Veneers",
    date: "2024-07-20",
    status: "In Progress",
    price: "4,200 EGP",
  },
  {
    id: "DDL-0121",
    type: "Clear Aligners",
    date: "2024-07-19",
    status: "Completed",
    price: "3,100 EGP",
  },
  {
    id: "DDL-0120",
    type: "Denture Repair",
    date: "2024-07-18",
    status: "Rejected",
    price: "950 EGP",
  },
];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const filters = ["All", "Pending", "In Progress", "Completed" , "Rejected"];

const OrdersTable = ({ overview }: { overview?: boolean }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.type.toLowerCase().includes(search.toLowerCase());
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
              <th className="text-left px-4 py-3">Type</th>
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
                <td className="px-4 py-3">{order.type}</td>
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
                        className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-green-300 ${statusColors["Completed"]}`}
                      >
                        <div className="flex items-center gap-1">
                          <MdDone size={16} />
                          <span>Approve</span>
                        </div>
                      </button>
                      <button
                        className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-red-300 ${statusColors["Rejected"]}`}
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
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-300`}
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderModal selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
      )}
    </div>
  );
};

export default OrdersTable;
