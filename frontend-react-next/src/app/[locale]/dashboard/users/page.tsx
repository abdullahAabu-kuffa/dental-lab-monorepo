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

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Cards Section */}
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Title */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Users Registration Management
              </h1>
              <p className="text-gray-600 mb-4 md:mb-0">
                Review and approve or reject new user registrations
              </p>
            </div>

            {/* Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <StatsCard
                title="Total Users"
                value={total}
                growth="this month"
                icon={<Users size={28} />}
                fromColor="from-blue-500"
                toColor="to-blue-600"
              />

              <StatsCard
                title="Approved Registrations"
                value={approvedUsersNumber}
                growth="this month"
                icon={<MdDone size={28} />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />

              <StatsCard
                title="Pending Registrations"
                value={pendingUsersNumber}
                growth="Awaiting review"
                icon={<PersonStandingIcon size={28} />}
                fromColor="from-yellow-500"
                toColor="to-yellow-600"
              />

              <StatsCard
                title="Create New User"
                growth=""
                icon={<UserIcon size={28} />}
                fromColor="from-gray-500"
                toColor="to-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table + Pagination */}
      <div className="mx-4 md:mx-6 mt-5">
        {/* Optional: Add Search + Filter here like OrdersTable */}
        <UsersTable users={users} />

        <PaginationUsers
          page={page}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
};

export default UsersList;
