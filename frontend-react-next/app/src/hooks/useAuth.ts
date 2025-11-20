"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../lib/apiClient";

type UserRole = "CLIENT" | "ADMIN" | "OTHER";

interface User {
    id: number;
    email: string;
    role: UserRole;
    isVerified: boolean;
    isActive: boolean;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await apiFetch("/api/users/me", {
                    method: "GET",
                    retryOn401: true,
                });

                if (res.status === 401) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                if (!res.ok) {
                    throw new Error("Failed to fetch user");
                }

                const json = await res.json();
                const apiUser = json?.data?.user;

                if (apiUser) {
                    const mappedUser: User = {
                        id: apiUser.id,
                        email: apiUser.email,
                        role: apiUser.role,
                        isVerified: apiUser.isVerified,
                        isActive: apiUser.isActive,
                    };

                    setUser(mappedUser);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("useAuth error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return { user, loading };
}
