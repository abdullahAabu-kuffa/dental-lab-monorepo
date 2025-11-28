import { apiFetch } from "../lib/apiClient";
import { useAuthStore } from "../store/auth.store";
//import onlogout from auth store

export async function logoutRequest() {
  const onlogout = useAuthStore.getState().onLogout;
  const res = await apiFetch("/api/auth/logout", {
    method: "POST",
    retryOn401: false,
    credentials: "include",
  });
  onlogout();

  if (!res.ok && res.status !== 401) {
    throw new Error("Logout failed");
  }
}
