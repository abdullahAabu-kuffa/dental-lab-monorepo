import { apiFetch } from "../lib/apiClient";

export async function logoutRequest() {
    localStorage.removeItem("accessToken");

    const res = await apiFetch("/api/auth/logout", {
        method: "POST",
        retryOn401: false,
    });

    if (!res.ok && res.status !== 401) {
        throw new Error("Logout failed");
    }
}
