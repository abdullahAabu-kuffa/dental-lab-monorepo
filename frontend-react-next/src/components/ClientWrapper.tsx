// app/src/components/ClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { LoadingProvider } from "../contexts/LoadingContext";
import { usePageLoading } from "../hooks/usePageLoading";
import GlobalLoader from "../components/GlobalLoader";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  usePageLoading(); 

  return (
    <LoadingProvider>
      <GlobalLoader />
      {children}
    </LoadingProvider>
  );
}
