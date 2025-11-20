import { PersonStandingIcon, Users } from "lucide-react";
import StatsCard from "../_components/@statecard";
import { MdDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import OrdersTable from "../_components/@orderstable";

const orders = () => {
  return (
    <div className="bg-[F5F7FA]">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-gray-600">
          Review and approve or reject Orders
        </p>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mx-6">
            <StatsCard
              title="Total Orders"
              value={2847}
              growth="+12% this month"
              icon={<Users size={24} />}
              fromColor="from-blue-500"
              toColor="to-blue-600"
            />

            <StatsCard
              title="Approved Today"
              value={156}
              growth="+8 from yesterday"
              icon={<MdDone size={24} />}
              fromColor="from-green-500"
              toColor="to-green-600"
            />
            <StatsCard
              title="Rejected Today"
              value={23}
              growth="Same as yesterday"
              icon={<FcCancel size={24} />}
              fromColor="from-red-500"
              toColor="to-red-600"
            />
            <StatsCard
              title="Pending Registrations"
              value={48562}
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
        <OrdersTable />
      </div>
    </div>
  );
};

export default orders;
