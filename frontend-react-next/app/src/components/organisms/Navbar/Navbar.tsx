"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAVBAR_CONFIG } from "../../../config/LandingData/navigation";
import NavMobileMenu from "../../molecules/NavMobileMenu/NavMobileMenu";
import Image from "next/image";
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{/* Navbar */}
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-gradient-to-r from-[#1C1C1C] to-[#2A2A2A] shadow-xl"
						: "bg-gradient-to-r from-[#1C1C1C]/95 to-[#2A2A2A]/95 backdrop-blur-sm"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<div className="flex items-center justify-between h-20">
						{/* Logo Section */}
						<div className="flex-shrink-0">
							<Link href="/" className="flex items-center gap-3">
								<Image
									src={NAVBAR_CONFIG.logo.src}
									alt={NAVBAR_CONFIG.logo.alt}
									className={`${NAVBAR_CONFIG.logo.width} ${NAVBAR_CONFIG.logo.height} filter brightness-110 contrast-125`}
									style={{
										filter:
											"brightness(1.1) contrast(1.25) drop-shadow(0 0 1px rgba(212, 175, 55, 0.3))",
									}}
									width={100}
									height={100}
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
										className={`font-semibold text-base transition-all duration-200 relative group ${
											isActive
												? "text-[#FFD700] border-b-2 border-[#E4B441]"
												: "text-[#CABEB2] hover:text-[#FFD700]"
										}`}
									>
										{link.name}
										<span
											className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#E4B441] to-[#D4A431] transition-all duration-300 ${
												isActive ? "w-full" : "w-0 group-hover:w-full"
											}`}
										></span>
									</Link>
								);
							})}
						</div>

						{/* Auth Buttons */}
						<div className="hidden md:flex items-center gap-3">
							<Link
								href={NAVBAR_CONFIG.authButtons.login.href}
								className="px-4 py-2 rounded-lg border border-[#E4B441] text-[#E4B441] font-semibold text-sm transition-all duration-200 hover:bg-[#E4B441] hover:text-white"
							>
								{NAVBAR_CONFIG.authButtons.login.text}
							</Link>
							<Link
								href={NAVBAR_CONFIG.authButtons.register.href}
								className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white font-bold text-sm transition-all duration-200 hover:from-[#FFD700] hover:to-[#E4B441] shadow-lg hover:shadow-xl"
							>
								{NAVBAR_CONFIG.authButtons.register.text}
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden p-2 rounded-lg bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white hover:from-[#FFD700] hover:to-[#E4B441] transition-all"
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<NavMobileMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
					user={null}
					loading={false}
					onLogout={function (): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</nav>

			{/* Spacer for fixed navbar */}
			<div className="h-20"></div>
		</>
	);
};

export default Navbar;
