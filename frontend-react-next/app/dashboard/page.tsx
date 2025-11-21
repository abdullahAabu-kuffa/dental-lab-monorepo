"use client";
import React, { useEffect } from "react";
import { Users, ShoppingCart, Clock, DollarSign } from "lucide-react";
import StatsCard from "./_components/@statecard";
import Link from "next/link";
import OrdersTable from "./_components/@orderstable";
import { useGetProfileInfo } from "./services/hookes/get_profile_info";
import { useUsers } from "./services/hookes/fetch_all_users";
import { Pagination } from "./interfaces/users";
import { useGetAllOrders } from "./services/hookes/get_all_orders";

const Dashboard = () => {
  const { data: me } = useGetProfileInfo();
  useEffect(() => {
    if (me) {
      if (me?.data?.user?.role !== "ADMIN") window.location.href = "/User";
    }
  }, [me]);

  const { data: usersData } = useUsers(0, 0);
  const pagination: Pagination | undefined = usersData?.data?.pagination;
  const total = pagination?.total || 0;

  const { data: ordersData } = useGetAllOrders(1);
  const ordersTotal = ordersData?.data?.orders.length || 0;
  const pendingNumberOrders = ordersData?.data?.orders.filter((order: { status: string; }) => order.status === "PENDING").length || 0;
  const totalRevenue = ordersData?.data?.orders.reduce((acc: number, order: { totalPrice: number; }) => acc + order.totalPrice, 0) || 0;

  return (
    <div className="bg-[F5F7FA]">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">
          Monitor system performance and key metrics
        </p>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mx-6">
            <Link href="/dashboard/users">
              <StatsCard
                title="Total Users"
                value={total}
                growth="+12% this month"
                icon={<Users size={24} />}
                fromColor="from-blue-500"
                toColor="to-blue-600"
              />
            </Link>
            <Link href="/dashboard/orders">
              <StatsCard
                title="Total Orders"
                value={ordersTotal}
                growth="+8% this month"
                icon={<ShoppingCart size={24} />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />
            </Link>
            <StatsCard
              title="Pending Approvals"
              value={pendingNumberOrders}
              growth="Requires attention"
              icon={<Clock size={24} />}
              fromColor="from-red-500"
              toColor="to-red-600"
            />
            <StatsCard
              title="Total Revenue"
              value={totalRevenue}
              growth="+15% this month"
              icon={<DollarSign size={24} />}
              fromColor="from-yellow-500"
              toColor="to-yellow-600"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 mx-6">
        <OrdersTable overview={true} />
      </div>
    </div>
  );
};

export default Dashboard;
