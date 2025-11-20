/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { PersonStandingIcon, User as UserIcon, Users } from "lucide-react";
import StatsCard from "../_components/@statecard";
import { MdDone } from "react-icons/md";
import UsersTable from "../_components/@userstable";
import { useState } from "react";
import { Pagination, User } from "../interfaces/users";
import { Pagination as PaginationUsers } from "../_components/@pagination";
import Loading from "../_components/@loading";
import ErrorMessage from "../_components/@displayerrors";
import { useUsers } from "../services/hookes/fetch_all_users";

const usersList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useUsers(page, limit);

  // Handle loading state
  if (isLoading) return <Loading />

  // Handle error state
  if (isError) return <ErrorMessage message={error.message} />;


  const users: User[] = Array.isArray(data?.data?.data?.users)
    ? data.data.data.users
    : [];
  const penddingUsersNumber = users.filter(user => !user.isActive).length;
  const approvedUsersNumber = users.filter(user => user.isActive).length;

  const pagination: Pagination | undefined = data?.data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const total = pagination?.total || 0;


  //Handle page changes
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="bg-[F5F7FA]">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Users Registration Managements</h1>
        <p className="text-gray-600">
          Review and approve or reject new user registrations
        </p>
        <div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mx-6">

            <StatsCard
              title="Total Users"
              value={total}
              growth="this month"
              icon={<Users size={24} />}
              fromColor="from-blue-500"
              toColor="to-blue-600"
            />

            <StatsCard
              title="Approved Registrations"
              value={approvedUsersNumber}
              growth="this month"
              icon={<MdDone size={24} />}
              fromColor="from-green-500"
              toColor="to-green-600"
            />

            <StatsCard
              title="Pending Registrations"
              value={penddingUsersNumber}
              growth="Awaiting review"
              icon={<PersonStandingIcon size={24} />}
              fromColor="from-yellow-500"
              toColor="to-yellow-600"
            />
            <StatsCard
              title="Create New User"
              growth=""
              icon={<UserIcon size={24} />}
              fromColor="from-gray-500"
              toColor="to-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="mx-6">
        {/* Users Table*/}
        <UsersTable users={users} />
        {/*pagination of users */}
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

export default usersList;
