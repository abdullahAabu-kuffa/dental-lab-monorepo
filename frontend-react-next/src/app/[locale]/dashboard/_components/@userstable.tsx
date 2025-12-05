"use client";
import React, { useState } from "react";
import { Search, View } from "lucide-react";
import { User } from "../interfaces/users";
import UserDetails from "./@userdetails";


const statusColors = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  // Rejected: "bg-red-100 text-red-700",
};

const filters = ["All", "Pending", "Approved"];

interface UsersTableProps {
  users: User[];
}


const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredusers = Array.isArray(users)
    ? users.filter((user) => {
      const matchSearch = user.fullName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchFilter = filter === 'All' || filter === (user.isActive ? 'Approved' : "Pending");
      return matchSearch && matchFilter;
    }) : [];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mx-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>
{/* Search + Filter Row */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

  {/* Search */}
  <div className="w-full md:w-1/2 relative">
    <Search className="absolute left-3 top-3 text-gray-400 w-6 h-6" />
    <input
      type="text"
      placeholder="Search by User Name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>

  {/* Filters */}
  <div className="w-full md:w-1/2 flex flex-wrap md:justify-end gap-2">
    {filters.map((f) => (
      <button
        key={f}
        onClick={() => setFilter(f)}
        className={`px-4 py-2 rounded-full text-base font-medium transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-md ${
          filter === f
            ? "bg-blue-500 text-white shadow"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {f}
      </button>
    ))}
  </div>
</div>


      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="text-left px-4 py-3">Id</th>
              <th className="text-left px-4 py-3">Full Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Clinic Name</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Registration Date</th>
              <th className="text-center px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredusers) ? filteredusers.map((user, idx) => (
              <tr
                key={idx}
                className={`border-t border-gray-100 hover:bg-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <td className="px-4 py-3 text-gray-600">{user.id}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {user.fullName}
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 text-gray-600">{user.role}</td>
                <td className="px-4 py-3 text-gray-600">{user.clinicName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? statusColors["Approved"] : statusColors["Pending"]}`}
                  >
                    {user.isActive ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3">{(new Date(user.createdAt)).toLocaleDateString()}</td>
                <td className="px-4 py-3 flex gap-1 text-center">
                  {!user.isActive && (
                    <>
                      {/* <button
                        onClick={() => { setUserId(user.id); setShowModal(true); }}
                        className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-green-300 ${statusColors["Approved"]}`}
                      >
                        <div className="flex items-center gap-1">
                          <MdDone size={16} />
                          <span>Approve</span>
                        </div>
                      </button> */}
                      {/* <button
                        className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-red-300 ${statusColors["Rejected"]}`}
                      >
                        <div className="flex items-center gap-1">
                          <FcCancel size={16} />
                          <span>Reject</span>
                        </div>
                      </button> */}
                    </>
                  )}
                  <button
                    onClick={() => setSelectedUser(user)}

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
            )) : (
              <tr>
                <td rowSpan={6}>No users available</td>
              </tr>

            )}
          </tbody>
        </table>
        {selectedUser && (
          <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
       
      </div>

    </div>
  );
};

export default UsersTable;
