import Link from "next/link";
import { Order } from "../interfaces/orders";

interface OrderModalProps {
  selectedOrder: Order;
  setSelectedOrder: (order: Order | null) => void;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

// const renderOptionValue = (value: unknown): string => {
//   if (value === null || value === undefined) return "—";
//   if (typeof value === "boolean") return value ? "Yes" : "No";
//   if (typeof value === "number" || typeof value === "string")
//     return String(value);
//   if (Array.isArray(value)) {
//     return value.map((v) => renderOptionValue(v)).join(", ");
//   }
//   if (typeof value === "object") {
//     // for nested objects, render each key on its own line
//     return Object.entries(value as Record<string, unknown>)
//       .map(([k, v]) => `${k}: ${renderOptionValue(v)}`)
//       .join("\n");
//   }
//   return String(value);
// };

const OrderModal = ({ selectedOrder, setSelectedOrder }: OrderModalProps) => {

  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-40 p-4">
      {" "}
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {" "}
        <div className="p-6">
          {/* Header */}{" "}
          <div className="flex justify-between items-start mb-6">
            {" "}
            <div>
              {" "}
              <h3 className="text-2xl font-bold text-gray-800">
                Order Details
              </h3>{" "}
              <p className="text-gray-500 text-sm mt-1">
                Order ID: {selectedOrder.id}
              </p>{" "}
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          {/* Status */}
          <span
            className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
              statusColors[selectedOrder.status]
            }`}
          >
            {selectedOrder.status}
          </span>
          {/* Order Info */}
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Customer
                </p>
                <p className="text-gray-800 font-medium">
                  {selectedOrder.user.fullName}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Submission Date
                </p>
                <p className="text-gray-800 font-medium">
                  {selectedOrder.date}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                Total Price
              </p>
              <p className="text-2xl text-gray-800 font-bold">
                {selectedOrder.price}
              </p>
            </div>

            {/* Options */}
            {/* <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Order Options
              </h4>

              <div className="space-y-2">
                {Object.entries(opts).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <p className="text-gray-600 font-medium">{key}:</p>
                    <p className="text-gray-800">{renderOptionValue(value)}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>

            <Link
              href={`/dashboard/${selectedOrder.id}`}
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
