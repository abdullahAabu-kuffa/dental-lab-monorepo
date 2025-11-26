"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Settings, ChevronDown, FileText, Package, Calendar, FilePlus } from "lucide-react";

interface ListProps {
  username?: string;
  email?: string;
  onLogout?: () => void;
  onEvent?: (type: string) => void; // callback for events
}

interface ProfileIconProps {
  size?: "sm" | "md" | "lg";
  username: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ size = "md", username }) => {
  const initial = username ? username.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-orange-600",
    "bg-teal-600",
  ];

  const colorIndex = username ? username.charCodeAt(0) % colors.length : 0;
  const bgColor = colors[colorIndex];

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <div
      className={`${sizes[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold shadow-md`}
    >
      {initial}
    </div>
  );
};

interface DropdownMenuProps {
  username: string;
  email: string;
  onLogout?: () => void;
  onClose: () => void;
  onEvent?: (type: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  username,
  email,
  onLogout,
  onClose,
  onEvent,
}) => {
  const handleClick = (type: string) => {
    onEvent?.(type);
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl borderoverflow-hidden z-50">
      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <ProfileIcon size="lg" username={username} />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{username}</h3>
            <p className="text-sm text-gray-500 truncate">{email}</p>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="py-2">
        <Link
          href="/User/Order/orders-list"
          onClick={() => handleClick("order")}
          className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
        >
          <Package className="w-5 h-5" />
          <span>My Order</span>
        </Link>

        <Link
          href="/User/Order/Setting"
          onClick={() => handleClick("settings")}
          className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        <Link
          href="/User/Order/invoice"
          onClick={() => handleClick("invoice")}
          className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
        >
          <FileText className="w-5 h-5" />
          <span>Invoice</span>
        </Link>

        <Link
          href="/User/Order/Event"
          onClick={() => handleClick("event")}
          className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
        >
          <Calendar className="w-5 h-5" />
          <span>Event</span>
        </Link>

        {/* ADD ORDER */}
        <Link
          href="/User/Order/Form"
          onClick={() => handleClick("add-order")}
          className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
        >
          <FilePlus className="w-5 h-5" />
          <span>Add Order</span>
        </Link>

        {/* Logout */}
        <button
          onClick={() => {
            handleClick("logout");
            onLogout?.();
          }}
          className="w-full px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-3 transition-colors font-medium"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const List: React.FC<ListProps> = ({
  username = "User",
  email = "user@example.com",
  onLogout,
  onEvent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded transition"
      >
        <ProfileIcon size="md" username={username} />
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <DropdownMenu
          username={username}
          email={email}
          onLogout={onLogout}
          onClose={() => setIsOpen(false)}
          onEvent={onEvent}
        />
      )}
    </div>
  );
};

export default List;
