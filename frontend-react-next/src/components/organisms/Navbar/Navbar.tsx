"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import Image from "next/image";
import { NAVBAR_CONFIG } from "../../../config/LandingData/navigation";
import NavMobileMenu from "../../molecules/NavMobileMenu/NavMobileMenu";

// Auth
import { logoutRequest } from "../../../services/auth";
import { useAuthStore } from "@/store/auth.store";


// Notifications
import NotificationBell from "../../molecules/notificationBell";
import NotificationsMenu from "../notificationMenu";

// Misc
import Swal from "sweetalert2";
import List from "../list";
import { motion } from "framer-motion";

// Language switcher
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const [unread, setUnread] = useState(0);

	const pathname = usePathname();
	const router = useRouter();
	const user = useAuthStore((s) => s.user);
	const loading = useAuthStore((s) => s.isLoading);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	// Notification toggle
	function toggleMenu() {
		setOpen((prev) => !prev);
	}

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
	if (pathname.includes("/dashboard") || pathname.includes("/login") || pathname.includes("/register")) {
		return null;
	}
	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
					isScrolled
						? "bg-gradient-to-r from-gray-900/80 to-gray-800/100 shadow-2xl backdrop-blur-md"
						: "bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm"
				}`}
			>
				<div className="w-full px-4 sm:px-6">
					<div className="flex items-center justify-between h-16 sm:h-20 w-full">
						{/* Logo */}
						<div className="shrink-0">
							<Link href="/" className="flex items-center gap-3">
								<Image
									src={NAVBAR_CONFIG.logo.src}
									alt={NAVBAR_CONFIG.logo.alt}
									className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 filter brightness-110 contrast-125"
									width={100}
									height={100}
									style={{
										filter:
											"brightness(1.1) contrast(1.25) drop-shadow(0 0 1px rgba(212, 175, 55, 0.3))",
									}}
								/>
							</Link>
						</div>

						{/* Desktop Navigation (Center) - Now hidden at 1023px and below */}
						<div className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-6 mx-4">
							{NAVBAR_CONFIG.links.map((link, index) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={index}
										href={link.href}
										onClick={
											link.name === "Order" ? handleOrdersClick : undefined
										}
										className={`font-semibold text-sm xl:text-base transition-all duration-200 relative group whitespace-nowrap ${
											isActive
												? "text-[#FFD700] border-b-2 border-[#E4B441]"
												: "text-[#CABEB2] hover:text-[#FFD700]"
										}`}
									>
										{link.name}
										<span
											className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#E4B441] to-[#D4A431] transition-all duration-300 ${
												isActive ? "w-full" : "w-0 group-hover:w-full"
											}`}
										/>
									</Link>
								);
							})}
						</div>

						{/* Right side elements */}
						<div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
							{/* Language Switcher - Now hidden at 1023px and below */}
							<div className="hidden md:flex">
								<LanguageSwitcher label="en" />
							</div>

							{/* Auth Section */}
							<motion.div
								className="flex items-center gap-2 lg:gap-3 flex-row-reverse"
								initial={{ opacity: 0, y: -15, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.7, ease: "easeOut" }}
							>
								{loading ? (
									<div className="hidden md:flex gap-2 lg:gap-3">
										<div className="w-16 lg:w-20 h-5 lg:h-6 bg-gray-700 rounded-md animate-pulse" />
										<div className="w-20 lg:w-24 h-5 lg:h-6 bg-gray-700 rounded-md animate-pulse" />
									</div>
								) : user ? (
									<>
										<span className="hidden md:block text-[#CABEB2] text-sm lg:text-base xl:text-lg font-medium max-w-[80px] lg:max-w-[100px] xl:max-w-[120px] truncate">
											{user.fullName}
										</span>
										<List />
									</>
								) : (
									<>
										<Link
											href={NAVBAR_CONFIG.authButtons.login.href}
											className="hidden md:block px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg border border-[#E4B441] text-[#E4B441] font-semibold text-xs lg:text-sm whitespace-nowrap transition-all duration-200 hover:bg-[#E4B441] hover:text-white"
										>
											{NAVBAR_CONFIG.authButtons.login.text}
										</Link>
										<Link
											href={NAVBAR_CONFIG.authButtons.register.href}
											className="hidden md:block px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg bg-linear-to-r from-[#E4B441] to-[#D4A431] text-white font-bold text-xs lg:text-sm whitespace-nowrap transition-all duration-200 hover:from-[#FFD700] hover:to-[#E4B441] shadow-lg hover:shadow-xl"
										>
											{NAVBAR_CONFIG.authButtons.register.text}
										</Link>
									</>
								)}
							</motion.div>

							{/* Notifications */}
							<motion.div
								className="flex"
								style={{ display: "flex", gap: "0", alignItems: "center" }}
								initial={{ opacity: 0, y: -15, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.7, ease: "easeOut" }}
							>
								{loading ? (
									<div className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-full animate-pulse" />
								) : user ? (
									<div className="relative">
										<NotificationBell
											unreadCount={unread}
											onClick={toggleMenu}
										/>
										<NotificationsMenu
											isOpen={open}
											onUnreadChange={setUnread}
											onClose={() => setOpen(false)}
										/>
									</div>
								) : null}
							</motion.div>

							{/* Mobile Menu Button - Now visible up to 1023px */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="lg:hidden p-2 rounded-lg bg-linear-to-r from-[#E4B441] to-[#D4A431] text-white hover:from-[#FFD700] hover:to-[#E4B441] transition-all"
								aria-label="Toggle menu"
							>
								{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<NavMobileMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
					user={user}
					loading={loading}
					onLogout={handleLogout}
				/>
			</nav>

			{/* Spacer */}
			<div className="h-16 sm:h-20"></div>
		</>
	);
};
export default Navbar;
