import axios from "axios";

axios.defaults.baseURL = 'http://192.168.11.174:3001/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc2MzU2NDgxMCwiZXhwIjoxNzYzNTY1NzEwfQ.jZGeaYDhmYEmbbYBkejKBYb6X3juEMQEv3b508WPiUk';

export const changeUserStatus = async (userId: number, action: "approve" | "reject") => {
    const res = await axios.put(`/admin/users/${userId}/status?action=${action}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
