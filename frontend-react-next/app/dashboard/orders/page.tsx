"use client";
import { PersonStandingIcon, Users } from "lucide-react";
import StatsCard from "../_components/@statecard";
import { MdDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import OrdersTable from "../_components/@orderstable";
import { useGetProfileInfo } from "../services/hookes/get_profile_info";
import { useEffect, useState } from "react";
import { Pagination } from "../_components/@pagination";
import useOrderStore from "@/stores/orders-store";
import Loading from "../_components/@loading";

const Orders = () => {
  const data = useOrderStore((state) => state.data);
  const isLoading = useOrderStore((state) => state.isLoading);
  const isError = useOrderStore((state) => state.isError);
  const error = useOrderStore((state) => state.error);
  const getOrders = useOrderStore((state) => state.getOrders);
  const { data: me } = useGetProfileInfo();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getOrders(currentPage);
  }, []);
  useEffect(() => {
    if (me) {
      if (me?.data?.user?.role !== "ADMIN") window.location.href = "/User";
    }
  }, [me]);

  // const { data } = useGetAllOrders(currentPage);
  const goNext = () => currentPage < pages && setCurrentPage(currentPage + 1);
  const goPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const pages = data?.data?.totalPages || 1;
  const totalOrders = data?.data?.totalOrders || 0;
  const list = data?.data?.orders ?? [];
  console.log("list", list);
  const pendingOrders = list.filter(
    (order) => order.status === "PENDING"
  ).length;
  const completedOrders = list.filter(
    (order) => order.status === "COMPLETED"
  ).length;
  const rejectedOrders = list.filter(
    (order) => order.status === "CANCELLED"
  ).length;
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <h1 className="text-red-500 flex justify-center align-middle">
        {( error as Error).message}
      </h1>
    );
  return (
    <div className="bg-[F5F7FA]">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-gray-600">Review and approve or reject Orders</p>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mx-6">
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
      <div className="mt-5 mx-6">
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
