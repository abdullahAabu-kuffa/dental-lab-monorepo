import { create } from "zustand";

const REFRESH_INTERVAL = 13 * 60 * 1000;// 13 minutes

export type User = {
  fullName: string;
  userId: number;
  email: string;
  role: "CLIENT" | "OWNER" | "ADMIN";
  isVerified: boolean;
  isActive: boolean;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  intervalId: ReturnType<typeof setInterval> | null;
  initialized: boolean;
  isLoading: boolean;

  onLoginSuccess: (user: User) => Promise<void>;
  onLogout: () => void;
  initializeAuth: () => Promise<void>;
  startAutoRefresh: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  intervalId: null,
  initialized: false,
  isLoading: true,

  onLoginSuccess: async (user) => {
    set({ isLoading: true });
    try {
     
      set({
        isAuthenticated: true,
        user,
        isLoading: false,
      });

      get().startAutoRefresh();
    } catch {
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  },

  onLogout: () => {
    const currentId = get().intervalId;
    if (currentId) clearInterval(currentId);

    set({
      isAuthenticated: false,
      user: null,
      intervalId: null,
      isLoading: false,
    });
  },

  initializeAuth: async () => {
    if (get().initialized) return;
    set({ initialized: true, isLoading: true });

    try {
      const res = await fetch("/app-api/refreshToken", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return;
      }

      const sessionRes = await fetch("/app-api/session", {
        credentials: "include",
      });

      if (!sessionRes.ok) {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return;
      }

      const user = (await sessionRes.json()) as User;

      set({
        isAuthenticated: true,
        user,
        isLoading: false,
      });

      get().startAutoRefresh();
    } catch {
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  },

  startAutoRefresh: () => {
    const old = get().intervalId;
    if (old) clearInterval(old);

    const id = setInterval(async () => {
      const res = await fetch("/app-api/refreshToken", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        get().onLogout();
      }
    }, REFRESH_INTERVAL);

    set({ intervalId: id });
  },
}));
