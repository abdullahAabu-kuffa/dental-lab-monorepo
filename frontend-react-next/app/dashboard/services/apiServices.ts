import axios from "axios";

axios.defaults.baseURL = 'http://192.168.1.12:3001/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibXVzdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3NjM2NzI4MjksImV4cCI6MTc2Mzc1OTIyOX0.MTPIqsoF7CDPGikFURnxZpbvQCpwim8yltSue8WzoNU';

export const changeUserStatus = async (userId: number, action: "approve" | "reject") => {
    const res = await axios.put(`/admin/users/${userId}/status?action=${action}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data);
    return res.data;
};


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
};