"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerAuthHandlers } from "../lib/apiClient";

interface AuthContextType {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const queryClient = new QueryClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	useEffect(() => {
		registerAuthHandlers(
			() => accessToken,
			(t) => setAccessToken(t)
		);
	}, [accessToken]);
	return (
		<AuthContext.Provider value={{ accessToken, setAccessToken }}>
			{children}
		</AuthContext.Provider>
	);
}
export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuthContext must be used within AuthProvider");
	return context;
}
