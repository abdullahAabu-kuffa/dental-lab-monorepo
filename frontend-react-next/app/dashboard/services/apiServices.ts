import { getAccessToken } from "@/app/src/auth/tokenStore";
import axios from "axios";
import { FetchUsersResponse } from "../interfaces/users";

axios.defaults.baseURL = "http://localhost:3001/api";

const token =
  getAccessToken() ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjM5MzUxNzMsImV4cCI6MTc2NDAyMTU3M30.MF89id0dvFIbbs7w9tBQVNsIhonQzEOx1xSt-EYGyKM";

console.log(token);

const authHeader = {
  Authorization: `Bearer ${token}`,
};

/* ===========================================
   GET ALL ORDERS
=========================================== */
export const getAllOrders = async ({ page }: { page: number }) => {
  const res = await axios.get(`/orders`, {
    params: { page },
    headers: authHeader,
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
    { headers: authHeader }
  );
  return res.data;
};

/* ===========================================
   GET LOGGED-IN USER
=========================================== */
export const getMe = async () => {
  const res = await axios.get(`/users/me`, {
    headers: authHeader,
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
      headers: authHeader,
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
    headers: authHeader,
  });
  return response.data;
};

/* ===========================================
   DELETE USER
=========================================== */
export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`/users/${userId}`, {
    headers: authHeader,
  });
  return response.data;
};
