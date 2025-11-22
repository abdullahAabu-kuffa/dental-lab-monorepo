import { getAccessToken } from "@/app/src/auth/tokenStore";

import axios from "axios";
import { FetchUsersResponse } from "../interfaces/users";
axios.defaults.baseURL = 'http://localhost:3001/api';
const token = getAccessToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM4MDk5ODMsImV4cCI6MTc2Mzg5NjM4M30.I6MUalfg3MHIv0T9eFCI3vDiT-GrTxmmjQS2tlRP3_o";
console.log(token);

// this fuction fetches all orders
export const getAllOrders = async ( { page }: { page: number}) => {
    const res = await fetch(
        `http://localhost:3001/api/orders?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    const json = await res.json();
    
    return json;
} 

// change order status
export const changeOrderStatus = async (orderId: number, action: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED") => {
   const res = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
   });
   const json = await res.json();
   return json;
};
// get me info
export const getMe = async () => {
  const res = await fetch(`http://localhost:3001/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
}
export const changeUserStatus = async (userId: number, action: "approve" | "reject") => {
  const res = await axios.put(
    `/users/${userId}/status`,
    {}, // empty body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        action,
      },
    }
  );

  return res.data;
};


export const fetchUsers = async (page: number, limit: number): Promise<FetchUsersResponse> => {
  const response = await axios.get<FetchUsersResponse>(`/users`, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },

  });
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}