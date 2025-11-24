"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetProfileInfo } from "../services/hookes/get_profile_info";
import { useChangeOrderStatus } from "../services/hookes/change_order_status";
import { SelectedService } from "../interfaces/orders";
import { Order } from "../interfaces/users";

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: me } = useGetProfileInfo();

  useEffect(() => {
    if (me && me?.data?.user?.role !== "ADMIN") {
      window.location.href = "/User";
    }
  }, [me]);

  const searchParams = useSearchParams();
  const orderQuery = searchParams.get("order");

  const [order, setOrder] = useState(
    orderQuery ? JSON.parse(orderQuery) : null
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statuses = [
    { label: "Pending", color: "bg-yellow-500/70" },
    { label: "In Progress", color: "bg-blue-500/70" },
    { label: "Completed", color: "bg-green-600/70" },
    { label: "Cancelled", color: "bg-red-500/70" },
  ];

  const { id } = use(params);
  const updateStatus = useChangeOrderStatus();

  const mapBackendStatusToUI = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "IN_PROGRESS":
        return "In Progress";
      case "COMPLETED":
        return "Completed";
      case "CANCELLED":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const mapUIStatusToBackend = (status: string) => {
    switch (status) {
      case "Pending":
        return "PENDING";
      case "In Progress":
        return "IN_PROGRESS";
      case "Completed":
        return "COMPLETED";
      case "Cancelled":
        return "CANCELLED";
      default:
        return "PENDING";
    }
  };

  const handleConfirm = () => {
    if (!selectedStatus) return;

    // Update order status locally first
    setOrder((prev: Order) => ({
      ...prev,
      status: mapUIStatusToBackend(selectedStatus),
    }));

    // Call API
    updateStatus.mutate({
      orderId: Number(id),
      action: mapUIStatusToBackend(selectedStatus),
    });

    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl p-10 animate-fadeIn">
        {/* HEADER */}
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 drop-shadow-xl">
          Order Details
        </h1>

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* ORDER INFO */}
          <div className="rounded-2xl p-6 bg-white/70 shadow-xl border border-gray-300/40">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              General Info
            </h2>

            <p className="text-lg">
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Total Price:</span> {order.price}{" "}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Created:</span>{" "}
              {order.createdAt.split("T")[0]}
            </p>

            {/* STATUS BUTTONS */}
            <div className="mt-6">
              <span className="font-semibold text-gray-900">Status:</span>

              <div className="flex flex-wrap gap-3 mt-3">
                {statuses.map((s) => {
                  const active = mapBackendStatusToUI(order.status) === s.label;
                  return (
                    <button
                      key={s.label}
                      onClick={() => {
                        setSelectedStatus(s.label);
                        setShowConfirm(true);
                      }}
                      className={`
        px-4 py-2 rounded-full font-semibold shadow-md transition
        border border-gray-300
        ${s.color}
        ${
          active
            ? "ring-2 ring-black scale-105"
            : "opacity-70 hover:opacity-100 hover:scale-105"
        }
      `}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {updateStatus.isPending && (
                <p className="text-blue-700 text-sm mt-2">Updating…</p>
              )}
              {updateStatus.isSuccess && (
                <p className="text-green-700 text-sm mt-2">
                  Status updated successfully!
                </p>
              )}
            </div>
          </div>

          {/* CUSTOMER INFO */}
          <div className="rounded-2xl p-6 bg-white/70 shadow-xl border border-gray-300/40">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Customer Info
            </h2>

            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order.user.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.user.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {order.user.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Clinic Address:</span>{" "}
                {order.user.clinicAddress}
              </p>
              <p>
                <span className="font-semibold">Clinic Name:</span>{" "}
                {order.user.clinicName}
              </p>
            </div>
          </div>
        </div>

        {/* ORDER CONTENT */}
        <div className="rounded-2xl p-6 bg-white/70 shadow-xl border border-gray-300/40">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Data</h2>

          <div className="text-xl font-bold mb-3">Patient Info</div>
          <p className="font-semibold">Name: {order.options.patientName}</p>
          <p className="font-semibold mb-6">Age: {order.options.age}</p>

          <div className="text-xl font-bold mb-3">Services</div>

          {order.options.selectedServices.length === 0 ? (
            <p className="text-gray-500">No services found.</p>
          ) : (
            <div className="space-y-2">
              {order.options.selectedServices.map(
                (option: SelectedService, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-100 rounded-xl flex justify-between"
                  >
                    <span className="font-semibold">{option.label}</span>
                    <span className="text-gray-700">{option.price} EGP</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* GO BACK */}
        <button
          onClick={() => history.back()}
          className="w-full mt-12 py-3 text-xl rounded-xl bg-black text-white font-semibold 
                     shadow-xl hover:bg-gray-900 transition"
        >
          Go Back
        </button>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Confirm Status Change
            </h2>

            <p className="text-center text-lg">
              Are you sure you want to change the status to{" "}
              <span className="font-bold">{selectedStatus}</span>?
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
