"use client";
import React, { useEffect, useState } from "react";
import { Users, ShoppingCart } from "lucide-react";
import StatsCard from "./_components/@statecard";
import Link from "next/link";
import OrdersTable from "./_components/@orderstable";
import { useGetProfileInfo } from "./services/hookes/get_profile_info";
import { useGetAllOrders } from "./services/hookes/get_all_orders";
import Loading from "./_components/@loading";
import ErrorMessage from "./_components/@displayerrors";
import { useUsers } from "./services/hookes/fetch_all_users";
import { User } from "./interfaces/users";
import { Pagination } from "./_components/@pagination";

const Dashboard = () => {
  // const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const goNext = () => currentPage < pages && setCurrentPage(currentPage + 1);
  const goPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const { data: me } = useGetProfileInfo();
  useEffect(() => {
    if (me) {
      if (me?.data?.user?.role !== "ADMIN") window.location.href = "/User";
    }
  }, [me]);
  const { data, isLoading, isError, error } = useGetAllOrders(currentPage);
  const pages = data?.data?.totalPages || 1;
  const { data: users } = useUsers(currentPage, 10);
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  const totalOrders = data?.data?.totalOrders || 0;
  const totalUsers = users?.data?.pagination?.total || 0;
  return (
    <div className="bg-[F5F7FA]">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">
          Monitor system performance and key metrics
        </p>
        <div>
          <div className="flex flex-wrap justify-center gap-6 mt-12 mx-6">
            <Link
              href="/dashboard/users"
              className="w-full sm:w-[48%] lg:w-[23%] "
            >
              <StatsCard
                title="Total Users"
                value={totalUsers}
                growth="+12% this month"
                icon={<Users size={24} />}
                fromColor="from-blue-500"
                toColor="to-blue-600"
              />
            </Link>
            <Link
              href="/dashboard/orders"
              className="w-full sm:w-[48%] lg:w-[23%] "
            >
              <StatsCard
                title="Total Orders"
                value={totalOrders}
                growth="+8% this month"
                icon={<ShoppingCart size={24} />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />
            </Link>
            {/* <StatsCard
              title="Pending Approvals"
              value={pendingUsersNumber}
              growth="Requires attention"
              icon={<Clock size={24} />}
              fromColor="from-red-500"
              toColor="to-red-600"
            /> */}
            {/* <StatsCard
              title="Total Revenue"
              value={48562}
              growth="+15% this month"
              icon={<DollarSign size={24} />}
              fromColor="from-yellow-500"
              toColor="to-yellow-600"
            /> */}
          </div>
        </div>
      </div>
      <div className="mt-5 mx-6">
        <OrdersTable overview={true} currentPage={currentPage} />
        <Pagination
          onNext={goNext}
          onPrevious={goPrevious}
          page={currentPage}
          totalPages={pages}
        />
      </div>
    </div>
  );
};

export default Dashboard;
