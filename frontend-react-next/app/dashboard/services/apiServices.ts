import { apiFetch } from "@/app/src/lib/apiClient";

export const changeUserStatus = async (
  userId: number,
  action: "approve" | "reject"
) => {
  const res = await apiFetch(`/api/admin/users/${userId}/status?action=${action}`, {
    method: "PUT",
  });
  return res.json();
};

export const getAllOrders = async ({ page }: { page: number }) => {
  const res = await apiFetch(`/api/orders?page=${page}`, {
    method: "GET",
  });
  return res.json();
};

export const changeOrderStatus = async (
  orderId: number,
  action: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
) => {
  const res = await apiFetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: action }),
  });
  return res.json();
};

export const getMe = async () => {
  const res = await apiFetch("/api/users/me", {
    method: "GET",
  });
  return res.json();
};
