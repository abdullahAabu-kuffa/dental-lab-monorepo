"use client";
import React, { useState } from "react";
import Button from "../../../atoms/Button/Button";
import { CONTACT_INFO } from "../../../../config/LandingData/contact.data";
import { getIcon } from "../../../../utils/UnifiedIcons";
import {
	HeroHeading,
	HeroSubtitle,
	componentStyles,
} from "@/app/[locale]/design-system";
import ScrollAnimation from "@/app/[locale]/design-system/components/ScrollAnimation";

const ContactSection: React.FC = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const [errors, setErrors] = useState<any>({});
	const [submitted, setSubmitted] = useState(false);

	// validation handlers

	const handleChange = (field: string, value: string) => {
		setForm({ ...form, [field]: value });

		setErrors((prev: any) => {
			const newErrors = { ...prev };

			switch (field) {
				case "name":
					if (!value.trim()) newErrors.name = "Name is required.";
					else if (value.length < 3)
						newErrors.name = "Name must be at least 3 characters.";
					else delete newErrors.name;
					break;
				case "email":
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!value.trim()) newErrors.email = "Email is required.";
					else if (!emailRegex.test(value))
						newErrors.email = "Enter a valid email.";
					else delete newErrors.email;
					break;
				case "phone":
					const phoneRegex = /^[0-9]{8,}$/;
					if (!value.trim()) newErrors.phone = "Phone is required.";
					else if (!phoneRegex.test(value))
						newErrors.phone = "Phone must be numbers only ";
					else delete newErrors.phone;
					break;
				case "message":
					if (!value.trim()) newErrors.message = "Message is required.";
					else if (value.length < 10)
						newErrors.message = "Message must be at least 10 characters.";
					else delete newErrors.message;
					break;
			}

			return newErrors;
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Final validation before submission
		const isValid =
			Object.values(form).every((val) => val.trim() !== "") &&
			Object.keys(errors).length === 0;
		if (isValid) {
			setSubmitted(true);
			console.log("Form Submitted Successfully:", form);
		} else {
			setSubmitted(false);
		}
	};

	return (
		<section
			id="contact"
			className={`${componentStyles.layout.spacingSection} bg-white`}
		>
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-16">
					<ScrollAnimation variant="fadeInFromLeft">
						<HeroHeading
							primaryText=""
							gradientText="Get In Touch"
							variant="black"
						/>
						<HeroSubtitle
							text="Have questions? We are here to help you transform your dental practice with digital innovation."
							variant="black"
						/>
						<div className="space-y-6 mt-8">
							{CONTACT_INFO.map((info, index) => {
								const IconComponent = getIcon(
									info.icon,
									info.icon === "map" ? "environment" : "social"
								);
								return (
									<ScrollAnimation
										key={index}
										variant="fadeInFromLeft"
										delay={0.2 + index * 0.1}
										className="flex items-center gap-4"
									>
										<div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
											<IconComponent className="w-6 h-6 text-[#D4AF37]" />
										</div>
										<div>
											<div className="font-semibold text-gray-900">
												{info.title}
											</div>
											{info.link ? (
												<a
													href={info.link}
													className="text-gray-600 hover:text-[#D4AF37] transition"
													target="_blank"
													rel="noopener noreferrer"
												>
													{info.value}
												</a>
											) : (
												<div className="text-gray-600">{info.value}</div>
											)}
										</div>
									</ScrollAnimation>
								);
							})}
						</div>
					</ScrollAnimation>

					<ScrollAnimation
						variant="fadeInFromRight"
						delay={0.2}
						className="bg-gray-50 rounded-2xl p-8"
					>
						<form className="space-y-6" onSubmit={handleSubmit}>
							{/* NAME */}
							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Full Name
								</label>
								<input
									type="text"
									value={form.name}
									onChange={(e) => handleChange("name", e.target.value)}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.name ? "border-red-500" : "border-gray-300"
									} focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition`}
									placeholder="Dr. Ahmed Mohamed"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>

							{/* EMAIL */}
							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Email
								</label>
								<input
									type="email"
									value={form.email}
									onChange={(e) => handleChange("email", e.target.value)}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.email ? "border-red-500" : "border-gray-300"
									} focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition`}
									placeholder="ahmed@clinic.com"
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>

							{/* PHONE */}
							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Phone
								</label>
								<input
									type="tel"
									value={form.phone}
									onChange={(e) => handleChange("phone", e.target.value)}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.phone ? "border-red-500" : "border-gray-300"
									} focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition`}
									placeholder="+20 123 456 7890"
								/>
								{errors.phone && (
									<p className="text-red-500 text-sm mt-1">{errors.phone}</p>
								)}
							</div>

							{/* MESSAGE */}
							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Message
								</label>
								<textarea
									rows={4}
									value={form.message}
									onChange={(e) => handleChange("message", e.target.value)}
									className={`w-full px-4 py-3 rounded-lg border ${
										errors.message ? "border-red-500" : "border-gray-300"
									} focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition resize-none`}
									placeholder="Tell us about your needs..."
								></textarea>
								{errors.message && (
									<p className="text-red-500 text-sm mt-1">{errors.message}</p>
								)}
							</div>

							<Button variant="primary" type="submit" className="w-full">
								Send Message
							</Button>

							{submitted && (
								<p className="text-green-600 font-semibold text-center mt-3">
									Message sent successfully!
								</p>
							)}
						</form>
					</ScrollAnimation>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
