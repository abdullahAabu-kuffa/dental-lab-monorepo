"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

interface Order {
  id: string;
  type: string;
  date: string;
  status: "Pending" | "In Progress" | "Completed" | "Rejected";
  price: string;
}

const orders: Order[] = [
  {
    id: "#DDL-0124",
    type: "Zirconia Crown",
    date: "2024-07-22",
    status: "Completed",
    price: "2,500 EGP",
  },
  {
    id: "#DDL-0123",
    type: "PFM Bridge",
    date: "2024-07-21",
    status: "Pending",
    price: "1,800 EGP",
  },
  {
    id: "#DDL-0122",
    type: "E-max Veneers",
    date: "2024-07-20",
    status: "In Progress",
    price: "4,200 EGP",
  },
  {
    id: "#DDL-0121",
    type: "Clear Aligners",
    date: "2024-07-19",
    status: "Completed",
    price: "3,100 EGP",
  },
  {
    id: "#DDL-0120",
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

const filters = ["All", "Pending", "In Progress", "Completed", "Rejected"];

const OrdersTable = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || order.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mx-6">
      <h2 className="text-lg font-semibold mb-4">All Your Orders</h2>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
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
                className={`border-t border-gray-100 ${
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
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <p>Showing 1 to 5 of 124 results</p>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            ‹
          </button>
          <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-700">
            1
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            3
          </button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            25
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
