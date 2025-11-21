import axios from "axios";
import { FetchUsersResponse } from "../interfaces/users";
import { getToken } from "@/app/src/lib/apiClient";

axios.defaults.baseURL = 'http://localhost:3001/api';
const token = getToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM2NzI4MjksImV4cCI6MTc2Mzc1OTIyOX0.MTPIqsoF7CDPGikFURnxZpbvQCpwim8yltSue8WzoNU";
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