"use client";

import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export const usePageLoading = () => {
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // كل مرة pathname يتغير، نبدأ transition
    startTransition(() => {
      setLoading(true); // يبدأ loader
      // بعد انتهاء transition، نوقف loader
      setLoading(false);
    });
  }, [pathname, setLoading, startTransition]);
};
