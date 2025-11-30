"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/login",'/register'];
  const hideNavbar = hiddenRoutes.includes(pathname) || pathname.startsWith("/dashboard");

  if (hideNavbar) return null;
  return <Footer />;
}
