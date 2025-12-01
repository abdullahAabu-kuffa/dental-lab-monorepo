"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAVBAR_CONFIG } from "../../../config/LandingData/navigation";
import NavMobileMenu from "../../molecules/NavMobileMenu/NavMobileMenu";

// Auth
import { logoutRequest } from "../../../services/auth";
import { useAuth } from "@/hooks/useAuth";

// Notifications
import NotificationBell from "../../molecules/notificationBell";
import NotificationsMenu from "../notificationMenu";

import Swal from "sweetalert2";
import List from "../list";
import { motion } from "framer-motion";
// import { useAuthStore } from "@/app/src/store/auth.store";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const [unread, setUnread] = useState(0);

	const pathname = usePathname();
	const router = useRouter();
	const { user: clientDashboardResponse, loading, isAuthenticated } = useAuth();
	const user = clientDashboardResponse?.data?.user;
	// const { user, loading, isAuthenticated } = useAuthStore(s => ({
	// 	user: s.user,
	// 	loading: s.isLoading,
	// 	isAuthenticated: s.isAuthenticated
	// }));
	// 	const user = useAuthStore((s) => s.user);
	// const loading = useAuthStore((s) => s.isLoading);
	// const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	//   console.log(user);

	// Notification toggle
	function toggleMenu() {
		setOpen((prev) => !prev);
	}

	// Scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Logout
	async function handleLogout() {
		try {
			await logoutRequest();
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			router.push("/");
			router.refresh();
			// window.location.reload();
		}
	}

	// Orders page authority
	function handleOrdersClick(e: React.MouseEvent<HTMLAnchorElement>) {
		if (loading) {
			e.preventDefault();
			return;
		}
		if (!isAuthenticated) return;
		if (user && !user.isActive) {
			e.preventDefault();
			Swal.fire({
				icon: "info",
				title: "Account Not Active Yet",
				html: `
        Your account is not yet activated.<br/>
        You won't be able to place orders until activation is complete.<br/>
        Activation usually takes 1-2 business days.
        `,
				confirmButtonText: "OK",
				confirmButtonColor: "#d4a431",
			});
		}
	}

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
						? "bg-linear-to-r from-[#1C1C1C] to-[#2A2A2A] shadow-xl"
						: "bg-linear-to-r from-[#1C1C1C]/95 to-[#2A2A2A]/95 backdrop-blur-sm"
					}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<div className="shrink-0">
							<Link href="/" className="flex items-center gap-3">
								<Image
									src={NAVBAR_CONFIG.logo.src}
									alt={NAVBAR_CONFIG.logo.alt}
									className={`w-32 h-20 sm:w-40 sm:h-24 md:${NAVBAR_CONFIG.logo.width} md:${NAVBAR_CONFIG.logo.height} filter brightness-110 contrast-125`}
									width={100}
									height={100}
									style={{
										filter:
											"brightness(1.1) contrast(1.25) drop-shadow(0 0 1px rgba(212, 175, 55, 0.3))",
									}}
								/>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-8">
							{NAVBAR_CONFIG.links.map((link, index) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={index}
										href={link.href}
										onClick={
											link.name == "Order" ? handleOrdersClick : undefined
										}
										className={`font-semibold text-base transition-all duration-200 relative group ${isActive
												? "text-[#FFD700] border-b-2 border-[#E4B441]"
												: "text-[#CABEB2] hover:text-[#FFD700]"
											}`}
									>
										{link.name}
										<span
											className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#E4B441] to-[#D4A431] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
												}`}
										/>
									</Link>
								);
							})}
						</div>

						{/* Notification Part */}
						<motion.div
							style={{ display: "flex", gap: "16px", alignItems: "center" }}
							initial={{ opacity: 0, y: -15, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
						>
							{loading ? (
								<div className="relative min-w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
							) : user ? (
								<div className="relative min-w-10">
									<NotificationBell unreadCount={unread} onClick={toggleMenu} />
									<NotificationsMenu
										isOpen={open}
										onUnreadChange={setUnread}
										onClose={() => setOpen(false)}
									/>
								</div>
							) : (
								<div className="min-w-10 h-10" />
							)}
						</motion.div>

						{/* Desktop Auth Section */}
						<motion.div
							className="hidden md:flex items-center gap-3"
							initial={{ opacity: 0, y: -15, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
						>
							{loading ? (
								<div className="flex gap-3">
									<div className="w-20 h-6 bg-gray-700 rounded-md animate-pulse" />
									<div className="w-24 h-6 bg-gray-700 rounded-md animate-pulse" />
								</div>
							) : user ? (
								<>
									<span className="text-[#CABEB2] text-sm font-medium min-w-[120px]">
										{user.fullName}
									</span>
									<List />
								</>
							) : (
								<>
									<Link
										href={NAVBAR_CONFIG.authButtons.login.href}
										className="px-4 py-2 rounded-lg border border-[#E4B441] text-[#E4B441] font-semibold text-sm min-w-20 transition-all duration-200 hover:bg-[#E4B441] hover:text-white"
									>
										{NAVBAR_CONFIG.authButtons.login.text}
									</Link>

									<Link
										href={NAVBAR_CONFIG.authButtons.register.href}
										className="px-4 py-2 rounded-lg bg-linear-to-r from-[#E4B441] to-[#D4A431] text-white font-bold text-sm min-w-[90px] transition-all duration-200 hover:from-[#FFD700] hover:to-[#E4B441] shadow-lg hover:shadow-xl"
									>
										{NAVBAR_CONFIG.authButtons.register.text}
									</Link>
								</>
							)}
						</motion.div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden p-2 rounded-lg bg-linear-to-r from-[#E4B441] to-[#D4A431] text-white hover:from-[#FFD700] hover:to-[#E4B441] transition-all"
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				<NavMobileMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
					user={user}
					loading={loading}
					onLogout={handleLogout}
				/>
			</nav>

			{/* Spacer */}
			<div className="h-20"></div>
		</>
	);
};

export default Navbar;
