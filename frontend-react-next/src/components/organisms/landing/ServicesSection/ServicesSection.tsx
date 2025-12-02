"use client";

import React from "react";
import { SERVICES } from "../../../../config/LandingData/services.data";
import ServiceIcon from "../../../molecules/ServiceIcon/ServiceIcon";
import { HeroHeading, HeroSubtitle } from "@/app/[locale]/design-system";
import { ScrollAnimation } from "@/app/[locale]/design-system";
export default function ServicesSection() {
	return (
		<section className="py-24 bg-[#F5F5F5]">
			<div className="max-w-7xl mx-auto px-6">
				{/* Section Header */}
				<ScrollAnimation
					animation="fadeInFromLeft"
					className="text-center mb-20"
				>
					<HeroHeading
						primaryText=""
						gradientText="Our Services"
						variant="black"
					/>
					<HeroSubtitle
						text="Premium dental restorations crafted with precision and care"
						variant="black"
					/>
				</ScrollAnimation>

				{/* Services Grid - 4 cards in one row */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{SERVICES.map((service, index) => {
						return (
							<ScrollAnimation
								key={service.id}
								animation="fadeInFromBottom"
								delay={0.2 + index * 0.1}
								className="relative bg-[#E8E8E8] rounded-2xl p-3 hover:shadow-lg hover:scale-105 hover:border-[#D4AF37] transition-all duration-300 border-2 border-[#D4AF37] cursor-pointer overflow-hidden group min-h-[220px] flex flex-col justify-start items-center"
							>
								{/* Golden Glow Effect */}
								<div className="absolute inset-0 bg-linear-to-br from-[#E4B441]/20 via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

								{/* Icon */}
								<ServiceIcon
									iconName={service.icon.name}
									className="mb-1 relative z-10"
								/>

								{/* Title */}
								<h3 className="text-lg font-bold text-black text-center mb-1 font-sans relative z-10">
									{service.title}
								</h3>

								{/* Description */}
								<p className="text-[#4A4A4A] text-sm leading-snug text-center font-sans relative z-10">
									{service.description}
								</p>
							</ScrollAnimation>
						);
					})}
				</div>
			</div>
		</section>
	);
}
