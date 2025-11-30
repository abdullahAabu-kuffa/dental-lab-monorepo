"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
	Settings,
	ChevronDown,
	FileText,
	Package,
	Calendar,
	FilePlus,
} from "lucide-react";
import { logoutRequest } from "@/services/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

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
	const router = useRouter();
	const { user, loading, isAuthenticated } = useAuth();

	async function handleLogout() {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You will be logged out from your account.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Logout",
			cancelButtonText: "Cancel",
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
		});

		if (!result.isConfirmed) return;

		Swal.fire({
			title: "Logging out...",
			text: "Please wait",
			allowOutsideClick: false,
			allowEscapeKey: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		try {
			await logoutRequest();
			Swal.fire({
				icon: "success",
				title: "Logged Out",
				text: "You have been logged out successfully.",
				confirmButtonColor: "#3085d6",
			}).then(() => {
				router.replace("/login");
				// window.location.reload();
			});
		} catch (error) {
			console.error("Logout failed:", error);
			Swal.fire({
				icon: "error",
				title: "Logout Failed",
				text: "Something went wrong. Please try again.",
				confirmButtonColor: "#3085d6",
			});
		}
	}

	const handleClick = (type: string) => {
		onEvent?.(type);
		onClose();
	};

	return (
		<AnimatePresence>
			<motion.div
				key="dropdown-menu"
				initial={{ opacity: 0, y: -20, scale: 0.97 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: -20, scale: 0.97 }}
				transition={{ duration: 0.35, ease: "easeInOut" }}
				className="absolute right-0 top-full mt-2 w-72 bg-linear-to-br from-white/90 to-gray-50/90 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden z-50 border border-gray-200"
			>
				{/* User Info */}
				<div className="p-4 border-b border-gray-200">
					<div className="flex items-center gap-3">
						<ProfileIcon size="lg" username={username} />
						<div className="flex-1">
							<h3 className="font-semibold text-gray-900">
								{user?.data.user.fullName}
							</h3>
							<p className="text-sm text-gray-500 truncate">
								{user?.data.user.email}
							</p>
						</div>
					</div>
				</div>

				{/* Menu Options */}
				<div className="py-2 flex flex-col divide-y divide-gray-200">
					{[
						{
							name: "My Order",
							icon: Package,
							link: "/User/Order/orders-list",
							type: "order",
						},
						{
							name: "Settings",
							icon: Settings,
							link: "/User/Order/Setting",
							type: "settings",
						},
						{
							name: "Invoice",
							icon: FileText,
							link: "/User/Order/invoice",
							type: "invoice",
						},
						{
							name: "Event",
							icon: Calendar,
							link: "/User/Order/Event",
							type: "event",
						},
						{
							name: "Add Order",
							icon: FilePlus,
							link: "/User/Order/Form",
							type: "add-order",
						},
					].map((item, index) => (
						<Link
							key={index}
							href={item.link}
							onClick={() => handleClick(item.type)}
							className="w-full px-4 py-3 flex items-center gap-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-linear-to-r hover:from-yellow-100 hover:to-yellow-50 hover:scale-105"
						>
							<item.icon className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" />
							<span>{item.name}</span>
						</Link>
					))}

					{/* Logout */}
					<button
						onClick={() => {
							handleClick("logout");
							handleLogout();
						}}
						className="w-full px-4 py-3 flex items-center gap-3 text-red-600 transition-all duration-200 rounded-lg hover:bg-red-50 hover:scale-105 font-medium"
					>
						<span>Logout</span>
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
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
				className="
  flex items-center gap-3 
  px-3 py-2
  rounded-xl
  transition-all duration-200
  hover:bg-gray-700/60
  hover:text-white
  cursor-pointer
"
			>
				<ProfileIcon size="md" username={username} />
				<ChevronDown
					className={`w-5 h-5 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
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
