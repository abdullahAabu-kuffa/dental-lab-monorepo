"use client";

import React from "react";
import { Service } from "@/config/LandingData/services.data";
import { gradients } from "@/app/design-system/gradients";

interface ServiceCardProps {
	service: Service;
	delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
	const IconComponent = service.icon.component;

	return (
		<div className="relative group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
			{/* Background gradient on hover */}
			<div
				className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
				style={{
					background: gradients.gold,
				}}
			/>

			{/* Icon */}
			<div className="relative mb-4">
				<div className="w-12 h-12 rounded-full bg-linear-to-r from-[#E4B441] to-[#D4AF37] flex items-center justify-center shadow-md">
					<IconComponent className="w-6 h-6 text-white" />
				</div>
			</div>

			{/* Title */}
			<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
				{service.title}
			</h3>

			{/* Description */}
			<p className="text-gray-600 mb-4 leading-relaxed">
				{service.description}
			</p>

			{/* Features */}
			<ul className="space-y-2">
				{service.features.map((feature, index) => (
					<li key={index} className="flex items-center text-sm text-gray-500">
						<div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-3" />
						{feature}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ServiceCard;
