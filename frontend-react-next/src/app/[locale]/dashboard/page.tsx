"use client";
import React, { useEffect, useState } from "react";
import { Users, ShoppingCart } from "lucide-react";
import StatsCard from "./_components/@statecard";
import Link from "next/link";
import OrdersTable from "./_components/@orderstable";
import { useGetProfileInfo } from "./services/hookes/get_profile_info";
import { useGetAllOrders } from "./services/hookes/get_all_orders";
import ErrorMessage from "./_components/@displayerrors";
import { useUsers } from "./services/hookes/fetch_all_users";
import { Pagination } from "./_components/@pagination";
import { useLoading } from "@/contexts/LoadingContext";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const goNext = () => currentPage < pages && setCurrentPage(currentPage + 1);
  const goPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const { data: me } = useGetProfileInfo();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (me) {
      if (me?.data?.user?.role !== "ADMIN") window.location.href = "/User";
    }
  }, [me]);

  const { data, isLoading, isError, error } = useGetAllOrders(currentPage);
  const pages = data?.data?.totalPages || 1;
  const { data: users } = useUsers(currentPage, 10);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isError) return <ErrorMessage message={error.message} />;

  const totalOrders = data?.data?.totalOrders || 0;
  const totalUsers = users?.data?.pagination?.total || 0;

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          {/* Responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* Title Section */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mb-4 md:mb-6">
                Monitor system performance and key metrics
              </p>
            </div>

            {/* Cards Section */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
              <Link href="/dashboard/users" className="w-full">
                <StatsCard
                  title="Total Users"
                  value={totalUsers}
                  growth="+12% this month"
                  icon={<Users size={24} />}
                  fromColor="from-blue-500"
                  toColor="to-blue-600"
                />
              </Link>

              <Link href="/dashboard/orders" className="w-full">
                <StatsCard
                  title="Total Orders"
                  value={totalOrders}
                  growth="+8% this month"
                  icon={<ShoppingCart size={24} />}
                  fromColor="from-green-500"
                  toColor="to-green-600"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-4 md:mx-6">
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
