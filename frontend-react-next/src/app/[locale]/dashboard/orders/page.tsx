"use client";
import { PersonStandingIcon, Users } from "lucide-react";
import StatsCard from "../_components/@statecard";
import { MdDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import OrdersTable from "../_components/@orderstable";
import { useEffect, useState } from "react";
import { Pagination } from "../_components/@pagination";
import { useGetAllOrders } from "../services/hookes/get_all_orders";
import { Order } from "../interfaces/orders";
import { useLoading } from "@/contexts/LoadingContext";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useGetAllOrders(currentPage);
  const { setLoading } = useLoading();

  // Logic for stats
  const goNext = () => currentPage < pages && setCurrentPage(currentPage + 1);
  const goPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const pages = data?.data?.totalPages || 1;
  const totalOrders = data?.data?.totalOrders || 0;
  const list = data?.data?.orders ?? [];

  const pendingOrders = list.filter(
    (order: Order) => order.status === "PENDING"
  ).length;
  const completedOrders = list.filter(
    (order: Order) => order.status === "COMPLETED"
  ).length;
  const rejectedOrders = list.filter(
    (order: Order) => order.status === "CANCELLED"
  ).length;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h1 className="text-red-500 text-xl font-semibold">
          {(error as Error).message}
        </h1>
      </div>
    );

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Cards Section */}
        <div className="p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
            {/* Header / Title Area */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Orders Management
              </h1>
              <p className="text-sm md:text-base text-gray-500">
                Review and approve or reject Orders
              </p>
            </div>

            {/* Stats Cards Grid */}
            {/* Responsive: 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              <StatsCard
                title="Total Orders"
                value={totalOrders}
                growth="+12% this month"
                icon={<Users size={24} className="text-white" />}
                fromColor="from-blue-500"
                toColor="to-blue-600"
              />

              <StatsCard
                title="Completed Orders"
                value={completedOrders}
                growth="+8 from yesterday"
                icon={<MdDone size={24} className="text-white" />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />
              <StatsCard
                title="Rejected Orders"
                value={rejectedOrders}
                growth="Same as yesterday"
                icon={<FcCancel size={24} className="text-white" />}
                fromColor="from-red-500"
                toColor="to-red-600"
              />
              <StatsCard
                title="Pending Orders"
                value={pendingOrders}
                growth="Awaiting review"
                icon={<PersonStandingIcon size={24} className="text-white" />}
                fromColor="from-yellow-500"
                toColor="to-yellow-600"
              />
            </div>
          </div>
        </div>

        {/* Table & Pagination Section */}
        <div className="px-4 md:px-6 mt-2 space-y-4">
          {/* Table Container with horizontal scroll for mobile */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <OrdersTable overview={false} currentPage={currentPage} />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Pagination
              page={currentPage}
              totalPages={pages}
              onNext={goNext}
              onPrevious={goPrevious}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
