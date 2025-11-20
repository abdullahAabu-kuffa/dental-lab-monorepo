import axios from "axios";
import { FetchUsersResponse } from "../interfaces/users";
import { getToken } from "@/app/src/lib/apiClient";

axios.defaults.baseURL = 'http://192.168.11.174:3001/api';
const token = getToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsI…kwOH0.CmiR5-jo7Y4ceR2gPVzDaCFmro-eOKQR2_o1I4GuCco";
console.log(token);
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