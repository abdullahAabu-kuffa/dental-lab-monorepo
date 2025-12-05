import { Order, ApiOrder } from "../types";

/**
 * Transform API order data to match our component expectations
 */
export const transformApiOrder = (apiOrder: ApiOrder): Order => {
  return {
    id: apiOrder.id.toString(),
    patientName: apiOrder.options?.patientName || "Unknown Patient",
    orderType: apiOrder.type || "General",
    status:
      apiOrder.status === "PENDING"
        ? "Pending"
        : apiOrder.status === "IN_PROGRESS"
        ? "In Progress"
        : apiOrder.status === "COMPLETED"
        ? "Completed"
        : apiOrder.status === "CANCELLED"
        ? "Cancelled"
        : "Pending",
    date: apiOrder.date || apiOrder.createdAt,
    totalAmount: parseFloat(apiOrder.totalPrice || "0"),
    urgency: "Medium" as const, // Default value since API doesn't have urgency
    material: apiOrder.options?.selectedServices?.[0]?.label || "Not specified",
    note: `${apiOrder.options.note || "Not specified"}`,
    createdAt: new Date(apiOrder.createdAt),
    updatedAt: new Date(apiOrder.createdAt),
    lab: "Dental Lab", // Default value
    shippingCarrier: "Local Courier", // Default value
    trackingNumber: `TRK${apiOrder.id}EG`, // Generate placeholder
    // Payment fields - default to unpaid since API doesn't have payment info
    paymentStatus: "unpaid" as const,
    paymentMethod: undefined,
    paymentDate: undefined,
    transactionId: undefined,
    stages: {
      orderPlaced: { completed: true, completedAt: apiOrder.createdAt },
      digitalDesign: {
        completed: apiOrder.status !== "PENDING",
        completedAt:
          apiOrder.status !== "PENDING" ? apiOrder.createdAt : "Pending",
      },
      manufacturing: {
        completed: apiOrder.status === "COMPLETED",
        completedAt:
          apiOrder.status === "COMPLETED" ? apiOrder.createdAt : "Pending",
      },
      qualityControl: {
        completed: apiOrder.status === "COMPLETED",
        completedAt:
          apiOrder.status === "COMPLETED" ? apiOrder.createdAt : "Pending",
      },
      shipped: { completed: false, completedAt: "Pending" },
    },
  };
};

/**
 * Transform multiple API orders to component format
 */
export const transformApiOrders = (apiOrders: ApiOrder[]): Order[] => {
  return apiOrders.map(transformApiOrder);
};
