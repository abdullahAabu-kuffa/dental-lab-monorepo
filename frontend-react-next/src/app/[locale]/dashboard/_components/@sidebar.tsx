"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  Settings,
  Users,
  Menu,
  XIcon,
  ListOrdered,
  LayoutDashboard,
  CalendarDaysIcon,
  ChartArea,
  LogOut
} from "lucide-react";
import { logoutRequest } from "@/services/auth";

const ICONS = {
  LayoutDashboard,
  Settings,
  Users,
  CalendarDaysIcon,
  Bell,
  ListOrdered,
  ChartArea,
  LogOut
};

const links = [
  { name: "Dashboard", to: "/dashboard", icon: "LayoutDashboard" },
  { name: "Users", to: "/dashboard/users", icon: "Users" },
  { name: "Orders", to: "/dashboard/orders", icon: "ListOrdered" },
  { name: "Events", to: "/dashboard/events", icon: "CalendarDaysIcon" },
  { name: "Notifications", to: "/dashboard/notifications", icon: "Bell" },
  { name: "Settings", to: "/dashboard/settings", icon: "Settings" },
  { name: "Analytics", to: "/dashboard/analytics", icon: "ChartArea" },

];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isOpen ? 240 : 70 }}
        transition={{ duration: 0.01 }}
        className={`flex flex-col min-h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 ${
          isOpen ? "z-50" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <XIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => {
            const Icon = ICONS[link.icon as keyof typeof ICONS];
            const isActive = pathname === link.to;

            return (
              <Link
                key={link.name}
                href={link.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-[#a07916] via-[#E4B441] to-[#a07916] shadow-[0_0_10px_#E4B44180]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="font-medium">{link.name}</span>}
              </Link>
            );
          })}
        </nav>
        {/* logout button */}
        <div className="p-3 border-t border-gray-700">
          <button
            onClick={logoutRequest}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-red-800 hover:text-white rounded-lg transition-all duration-200 w-full text-left"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
        {/* Footer */}
        <div className="p-3 border-t border-gray-700 text-sm text-gray-400">
          {isOpen ? "© 2025 MyApp" : "©"}
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
