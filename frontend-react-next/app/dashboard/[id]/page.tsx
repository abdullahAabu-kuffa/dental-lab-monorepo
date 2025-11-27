"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Added useRouter
import { useGetProfileInfo } from "../services/hookes/get_profile_info";
import { useChangeOrderStatus } from "../services/hookes/change_order_status";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,   // Added
  Clock,         // Added
  Package,       // Added
  AlertCircle,   // Added
} from "lucide-react";

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter(); // For navigation
  const { data: me } = useGetProfileInfo();
  
  // Un-commented and Fixed orderSteps
  const orderSteps = [
    { label: "Pending", icon: Clock },
    { label: "In Progress", icon: Package }, // Changed to match your statuses
    { label: "Completed", icon: CheckCircle },
  ];

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

  const { id } = use(params);
  const updateStatus = useChangeOrderStatus();

  // Status mapping logic
  const statuses = [
    { label: "Pending" },
    { label: "In Progress" },
    { label: "Completed" },
    { label: "Cancelled" },
  ];

  const mapBackendStatusToUI = (status: string) => {
    switch (status) {
      case "PENDING": return "Pending";
      case "IN_PROGRESS": return "In Progress";
      case "COMPLETED": return "Completed";
      case "CANCELLED": return "Cancelled";
      default: return "Pending";
    }
  };

  const mapUIStatusToBackend = (status: string) => {
    switch (status) {
      case "Pending": return "PENDING";
      case "In Progress": return "IN_PROGRESS";
      case "Completed": return "COMPLETED";
      case "Cancelled": return "CANCELLED";
      default: return "PENDING";
    }
  };

  const handleConfirm = () => {
    if (!selectedStatus) return;

    setOrder((prev: any) => ({
      ...prev,
      status: mapUIStatusToBackend(selectedStatus),
    }));

    updateStatus.mutate({
      orderId: Number(id),
      action: mapUIStatusToBackend(selectedStatus),
    });

    setShowConfirm(false);
  };

  // 🎨 Fixed Theme Logic for Tailwind
  // Instead of splitting strings, we return full class names
  const getStatusTheme = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return {
          gradient: "from-emerald-500 to-teal-600",
          stepColor: "bg-emerald-500 border-emerald-500 text-emerald-600",
          ring: "ring-emerald-100",
          buttonActive: "bg-emerald-100 border-emerald-200 text-emerald-700 ring-emerald-200",
          dot: "bg-emerald-500"
        };
      case "cancelled":
        return {
          gradient: "from-red-500 to-rose-600",
          stepColor: "bg-red-500 border-red-500 text-red-600",
          ring: "ring-red-100",
          buttonActive: "bg-red-50 border-red-200 text-red-700 ring-red-200",
          dot: "bg-red-500"
        };
      case "processing":
      case "in_progress": // Fixed to match backend
      case "in progress": 
        return {
          gradient: "from-blue-500 to-indigo-600",
          stepColor: "bg-blue-500 border-blue-500 text-blue-600",
          ring: "ring-blue-100",
          buttonActive: "bg-blue-50 border-blue-200 text-blue-700 ring-blue-200",
          dot: "bg-blue-500"
        };
      default: // Pending
        return {
          gradient: "from-amber-400 to-orange-500",
          stepColor: "bg-amber-500 border-amber-500 text-amber-600",
          ring: "ring-amber-100",
          buttonActive: "bg-amber-50 border-amber-200 text-amber-700 ring-amber-200",
          dot: "bg-amber-500"
        };
    }
  };

  const currentTheme = getStatusTheme(order.status);
  const uiStatus = mapBackendStatusToUI(order.status);

  // Helper to determine step status
  const getStepStatus = (index: number) => {
    const statusOrder = ["Pending", "In Progress", "Completed"];
    // Note: Cancelled is tricky in a linear stepper, usually treated as an edge case
    if (uiStatus === "Cancelled") return index === 0 ? "completed" : "inactive";
    
    const currentIndex = statusOrder.indexOf(uiStatus);
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "inactive";
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12 font-sans">
      {/* HEADER BANNER */}
      <div className={`w-full h-48 bg-gradient-to-r ${currentTheme.gradient} relative overflow-hidden shadow-lg transition-all duration-500`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={16} /> <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8">
            <div className="text-white">
              <p className="text-blue-100 font-medium mb-1">Order ID</p>
              <h1 className="text-4xl font-extrabold tracking-tight">#{order.id}</h1>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/30 text-white flex items-center gap-2 shadow-sm">
              {uiStatus === "Completed" ? <CheckCircle size={20} /> : <Clock size={20} />}
              <span className="font-bold text-lg">{uiStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PROGRESS STEPPER */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-gray-900 font-bold mb-8">Order Progress</h3>
              <div className="relative flex justify-between">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full -z-0"></div>
                
                {orderSteps.map((step, index) => {
                  const stepStatus = getStepStatus(index);
                  const isCompleted = stepStatus === "completed";
                  const isCurrent = stepStatus === "current";

                  return (
                    <div key={index} className="relative z-10 flex flex-col items-center group">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500
                        ${isCompleted 
                          ? `${currentTheme.stepColor.split(' ')[0]} border-transparent text-white scale-110 shadow-lg` // Solid color for completed
                          : isCurrent 
                            ? `bg-white ${currentTheme.stepColor.split(' ')[1]} ${currentTheme.stepColor.split(' ')[2]} animate-pulse ring-4 ${currentTheme.ring}`
                            : "bg-white border-gray-200 text-gray-300"
                        }
                      `}>
                        <step.icon size={18} strokeWidth={2.5} />
                      </div>
                      <span className={`mt-3 text-xs font-bold uppercase tracking-wider transition-colors ${isCompleted || isCurrent ? "text-gray-800" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SERVICES */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.options.selectedServices.map((service: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-blue-600 transition-colors">
                          <Package size={20} />
                        </div>
                        <span className="font-semibold text-gray-700">{service.label}</span>
                      </div>
                      <span className="font-bold text-gray-900 text-lg">{service.price} EGP</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-xl flex flex-col items-end">
                    <span className="text-gray-400 text-sm mb-1">Total Amount</span>
                    <span className="text-3xl font-bold">{order.price} <span className="text-lg text-gray-500 font-medium">EGP</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            
            {/* ACTION CARD */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${currentTheme.gradient}`}></div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Update Status</h2>
              <div className="space-y-2">
                {statuses.map((s) => {
                  const isActive = uiStatus === s.label;
                  return (
                    <button
                      key={s.label}
                      onClick={() => {
                        setSelectedStatus(s.label);
                        setShowConfirm(true);
                      }}
                      disabled={isActive}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all duration-200
                        ${isActive 
                          ? `${currentTheme.buttonActive} ring-1` 
                          : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200 text-gray-600"
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isActive ? `${currentTheme.dot} animate-pulse` : "bg-gray-300"}`}></span>
                        {s.label}
                      </span>
                      {isActive && <CheckCircle size={16} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CUSTOMER CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Customer Info</h3>
                  <p className="text-xs text-gray-500">Personal details</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="text-gray-400" size={18} />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{order.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-900">{order.user.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="text-gray-400 mt-1" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Clinic Address</p>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{order.user.clinicAddress}</p>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">{order.user.clinicName}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* MODAL */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-fadeIn">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Update Status</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Change order status from <span className="font-bold text-gray-800">{uiStatus}</span> to <span className="font-bold text-blue-600">{selectedStatus}</span>?
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-0.5"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}