"use client";
import React, { useState } from "react";
import { Search, View } from "lucide-react";
import { FcCancel } from "react-icons/fc";
import { MdDone } from "react-icons/md";

interface User {
  fullName: string;
  email: string;
  clinicName: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

const users: User[] = [
  {
    fullName: "Dr. John Doe",
    email: "john@example.com",
    clinicName: "Smile Dental Clinic",
    date: "2024-07-22",
    status: "Approved",
  },
  {
    fullName: "Dr. Sarah Ali",
    email: "sarah@example.com",
    clinicName: "Elite Dental Care",
    date: "2024-07-21",
    status: "Pending",
  },
  {
    fullName: "Dr. Ahmed Hassan",
    email: "ahmed@example.com",
    clinicName: "Bright Smile Center",
    date: "2024-07-20",
    status: "Rejected",
  },
  {
    fullName: "Dr. Fatima Youssef",
    email: "fatima@example.com",
    clinicName: "Pearl Dental Studio",
    date: "2024-07-19",
    status: "Approved",
  },
  {
    fullName: "Dr. Omar Khaled",
    email: "omar@example.com",
    clinicName: "Advanced Dental Clinic",
    date: "2024-07-18",
    status: "Pending",
  },
  {
    fullName: "Dr. Lina Mostafa",
    email: "lina@example.com",
    clinicName: "Perfect Smile Dentistry",
    date: "2024-07-17",
    status: "Rejected",
  },
  {
    fullName: "Dr. Karim Nasser",
    email: "karim@example.com",
    clinicName: "White Pearl Dental Center",
    date: "2024-07-16",
    status: "Approved",
  },
  {
    fullName: "Dr. Hala Samir",
    email: "hala@example.com",
    clinicName: "Gentle Touch Dental",
    date: "2024-07-15",
    status: "Pending",
  },
  {
    fullName: "Dr. Tamer Adel",
    email: "tamer@example.com",
    clinicName: "BrightCare Dental Clinic",
    date: "2024-07-14",
    status: "Rejected",
  },
  {
    fullName: "Dr. Nour El-Din",
    email: "nour@example.com",
    clinicName: "Happy Teeth Dental Center",
    date: "2024-07-13",
    status: "Approved",
  },
];

const statusColors = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

const filters = ["All", "Pending", "Approved", "Rejected"];

const UsersTable = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = users.filter((user) => {
    const matchSearch = user.fullName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter = filter === "All" || user.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mx-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by User Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-end gap-2 mb-4">
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
              <th className="text-left px-4 py-3">Full Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Clinic Name</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Registration Date</th>
              <th className="text-center px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr
                key={order.email}
                className={`border-t border-gray-100 hover:bg-gray-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {order.fullName}
                </td>
                <td className="px-4 py-3">{order.email}</td>
                <td className="px-4 py-3 text-gray-600">{order.clinicName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3 flex gap-1 text-center">
                  {order.status == "Pending" && (
                    <>
                      <button
                        className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-green-300 ${statusColors["Approved"]}`}
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
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-300`}
                  >
                    <div className="flex items-center gap-1">
                      <View size={16} />
                      <span>Details</span>
                    </div>
                  </button>
                </td>
                <td className="px-4 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
