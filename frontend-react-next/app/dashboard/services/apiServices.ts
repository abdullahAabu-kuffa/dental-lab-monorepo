import { getAccessToken } from "@/app/src/auth/tokenStore";
import axios from "axios";
import { FetchUsersResponse } from "../interfaces/users";

axios.defaults.baseURL = "http://localhost:3001/api";

const token =
  getAccessToken();

console.log(token);



// /* ===========================================
//    GET ALL ORDERS
// =========================================== */
export const getAllOrders = async ({ page }: { page: number }) => {
  const res = await axios.get(`/orders`, {
    params: { page },
    // headers: authHeader,
    withCredentials: true,
  });
  return res.data;
};

/* ===========================================
   CHANGE ORDER STATUS
=========================================== */
export const changeOrderStatus = async (
  orderId: number,
  action: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
) => {
  const res = await axios.patch(
    `/orders/${orderId}`,
    { status: action },
    // { headers: authHeader }
    { withCredentials: true }
  );
  return res.data;
};

/* ===========================================
   GET LOGGED-IN USER
=========================================== */
export const getMe = async () => {
  const res = await axios.get(`/users/me`, {
    // headers: authHeader,
    withCredentials: true,
  });
  return res.data;
};

/* ===========================================
   CHANGE USER STATUS
=========================================== */
export const changeUserStatus = async (
  userId: number,
  action: "approve" | "reject"
) => {
  const res = await axios.put(
    `/users/${userId}/status`,
    {},
    {
      // headers: authHeader,
      withCredentials: true,
      params: { action },
    }
  );

  return res.data;
};

/* ===========================================
   FETCH USERS
=========================================== */
export const fetchUsers = async (
  page: number,
  limit: number
): Promise<FetchUsersResponse> => {
  const response = await axios.get<FetchUsersResponse>(`/users`, {
    params: { page, limit },
    // headers: authHeader,
    withCredentials: true,
  });
  return response.data;
};

/* ===========================================
   DELETE USER
=========================================== */
export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`/users/${userId}`, {
    // headers: authHeader,
    withCredentials: true,
  });
  return response.data;
}

export const getNotifications = async () => {
  const res = await axios.get('/notifications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
