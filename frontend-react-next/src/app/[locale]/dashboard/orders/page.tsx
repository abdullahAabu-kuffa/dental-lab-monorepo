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
  // const { data:orderData} = useOrders(currentPage);
  console.log(data);
  // console.log(data);

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
      <h1 className="text-red-500 flex justify-center align-middle">
        {(error as Error).message}
      </h1>
    );
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Cards Section */}
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Title */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Orders Management
              </h1>
              <p className="text-gray-600 mb-4 md:mb-0">
                Review and approve or reject Orders
              </p>
            </div>

            {/* Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <StatsCard
              title="Total Orders"
              value={totalOrders}
              growth="+12% this month"
              icon={<Users size={24} />}
              fromColor="from-blue-500"
              toColor="to-blue-600"
            />

            <StatsCard
              title="Completed Orders"
              value={completedOrders}
              growth="+8 from yesterday"
              icon={<MdDone size={24} />}
              fromColor="from-green-500"
              toColor="to-green-600"
            />
            <StatsCard
              title="Rejected Orders"
              value={rejectedOrders}
              growth="Same as yesterday"
              icon={<FcCancel size={24} />}
              fromColor="from-red-500"
              toColor="to-red-600"
            />
            <StatsCard
              title="Pending Orders"
              value={pendingOrders}
              growth="Awaiting review"
              icon={<PersonStandingIcon size={24} />}
              fromColor="from-yellow-500"
              toColor="to-yellow-600"
            />
          </div>
        </div>
      </div>
      </div>
      <div className="mt-5 mx-4 md:mx-6">
        {/* Additional users content can go here */}
        <OrdersTable overview={false} currentPage={currentPage} />
        <Pagination
          page={currentPage}
          totalPages={pages}
          onNext={goNext}
          onPrevious={goPrevious}
        />
      </div>
    </div>
  );
};

export default Orders;
