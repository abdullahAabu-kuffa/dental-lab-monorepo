import React from "react";
import Link from "next/link";
interface Order {
  id: string;
  type: string;
  date: string;
  status: "Pending" | "In Progress" | "Completed" | "Rejected";
  price: string;
}

interface OrderModalProps {
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
}
const OrderModal = ({ selectedOrder, setSelectedOrder }: OrderModalProps) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {selectedOrder?.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                  statusColors[
                    selectedOrder?.status as keyof typeof statusColors
                  ]
                }`}
              >
                {selectedOrder?.status}
              </span>
            </div>

            {/* Order Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Order Type
                  </p>
                  <p className="text-gray-800 font-medium">
                    {selectedOrder?.type}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Date Submitted
                  </p>
                  <p className="text-gray-800 font-medium">
                    {selectedOrder?.date}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Total Price
                </p>
                <p className="text-2xl text-gray-800 font-bold">
                  {selectedOrder?.price}
                </p>
              </div>

              {/* Additional Details Section */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Additional Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient Name:</span>
                    <span className="text-gray-800 font-medium">
                      John Smith
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="text-gray-800 font-medium">
                      Dr. Sarah Ahmed
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lab Technician:</span>
                    <span className="text-gray-800 font-medium">
                      Mohammed Ali
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Delivery:</span>
                    <span className="text-gray-800 font-medium">
                      2024-07-25
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Notes
                </h4>
                <p className="text-gray-600 text-sm">
                  Special attention required for shade matching. Patient prefers
                  natural translucency.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
              <Link
                href={`/dashboard/${selectedOrder?.id}`}
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
