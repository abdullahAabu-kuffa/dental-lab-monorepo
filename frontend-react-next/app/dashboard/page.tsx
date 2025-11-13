import React from "react";
import { Users,ShoppingCart,Clock,DollarSign } from "lucide-react";
import StatsCard from "./_components/@statecard";
import Link from "next/link";
import OrdersTable from "./_components/@orderstable";

const dashboard = () => {
  return (
    <div className="bg-[F5F7FA]">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">
          Monitor system performance and key metrics
        </p>
        <div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mx-6">
              <Link href="../User">
                <StatsCard
                  title="Total Users"
                  value={2847}
                  growth="+12% this month"
                  icon={<Users size={24} />}
                  fromColor="from-blue-500"
                  toColor="to-blue-600"
                />
              </Link>

              <StatsCard
                title="Active Orders"
                value={156}
                growth="+8% this month"
                icon={<ShoppingCart size={24} />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />
              <StatsCard
                title="Pending Approvals"
                value={23}
                growth="Requires attention"
                icon={<Clock size={24} />}
                fromColor="from-red-500"
                toColor="to-red-600"
              />
              <StatsCard
                title="Total Revenue"
                value={48562}
                growth="+15% this month"
                icon={<DollarSign size={24} />}
                fromColor="from-yellow-500"
                toColor="to-yellow-600"
              />
            </div>
          </div>
      </div>
      <div className="mt-5 mx-6">
        {/* Additional dashboard content can go here */}
        <OrdersTable/>
      </div>
    </div>
  );
};

export default dashboard;
