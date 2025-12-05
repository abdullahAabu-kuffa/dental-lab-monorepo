/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { PersonStandingIcon, User as UserIcon, Users } from "lucide-react";
import StatsCard from "../_components/@statecard";
import { MdDone } from "react-icons/md";
import UsersTable from "../_components/@userstable";
import { useEffect, useState } from "react";
import { Pagination, User } from "../interfaces/users";
import { Pagination as PaginationUsers } from "../_components/@pagination";
import ErrorMessage from "../_components/@displayerrors";

import { useUsers } from "../services/hookes/fetch_all_users";
import { useLoading } from "@/contexts/LoadingContext";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const { setLoading } = useLoading();
  const limit = 10;

  const { data: response, isLoading, isError, error } = useUsers(page, limit);

  // --- Data Processing and Hooks ---
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isError) return <ErrorMessage message={error.message} />;

  const users: User[] = Array.isArray(response?.data?.users)
    ? response.data.users
    : [];

  const pendingUsersNumber = users.filter((user) => !user.isActive).length;
  const approvedUsersNumber = users.filter((user) => user.isActive).length;

  const pagination: Pagination | undefined = response?.data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const total = pagination?.total || 0;

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  // --- End Data Processing ---

  return (
    // Max width and center alignment for large screens
    <div className="bg-[#F5F7FA] min-h-screen pb-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Cards Section Container */}
        <div className="p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Users Registration Management
              </h1>
              <p className="text-sm md:text-base text-gray-500">
                Review and approve or reject new user registrations
              </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <StatsCard
                title="Total Users"
                value={total}
                growth="this month"
                icon={<Users size={28} className="text-white" />}
                fromColor="from-blue-500"
                toColor="to-blue-600"
              />

              <StatsCard
                title="Approved Registrations"
                value={approvedUsersNumber}
                growth="this month"
                icon={<MdDone size={28} className="text-white" />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />

              <StatsCard
                title="Pending Registrations"
                value={pendingUsersNumber}
                growth="Awaiting review"
                icon={<PersonStandingIcon size={28} className="text-white" />}
                fromColor="from-yellow-500"
                toColor="to-yellow-600"
              />

              <StatsCard
                title="Create New User"
                growth=""
                icon={<UserIcon size={28} className="text-white" />}
                fromColor="from-gray-500"
                toColor="to-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Users Table + Pagination Section */}
        <div className="px-4 md:px-6 mt-2 space-y-4">
          {/* Table Container with horizontal scroll for mobile */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <UsersTable users={users} />
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <PaginationUsers
              page={page}
              totalPages={totalPages}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
