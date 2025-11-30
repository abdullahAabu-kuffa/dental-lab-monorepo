"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/login",'/register'];
  const hideNavbar = hiddenRoutes.includes(pathname) || pathname.startsWith("/dashboard");

  if (hideNavbar) return null;
  return <Navbar />;
}
