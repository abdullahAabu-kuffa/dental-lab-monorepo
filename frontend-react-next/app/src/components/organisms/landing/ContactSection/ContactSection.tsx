'use client';
import React from "react";
import Button from "../../../atoms/Button/Button";
import { CONTACT_INFO } from "../../../../config/LandingData/contact.data";
import { getIcon } from "../../../../utils/UnifiedIcons";
import { HeroHeading, HeroSubtitle, componentStyles } from "../../../../../design-system";
import ScrollAnimation from '../../../../../design-system/components/ScrollAnimation';

const ContactSection: React.FC = () => {
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
								const IconComponent = getIcon(info.icon, info.icon === 'map' ? 'environment' : 'social');
								return (
									<ScrollAnimation 
										key={index}
										variant="fadeInFromLeft"
										delay={0.2 + (index * 0.1)}
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

					<ScrollAnimation variant="fadeInFromRight" delay={0.2} className="bg-gray-50 rounded-2xl p-8">
						<form className="space-y-6">
							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Full Name
								</label>
								<input
									type="text"
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition"
									placeholder="Dr. Ahmed Mohamed"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Email
								</label>
								<input
									type="email"
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition"
									placeholder="ahmed@clinic.com"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Phone
								</label>
								<input
									type="tel"
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition"
									placeholder="+20 123 456 7890"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold mb-2 text-gray-900">
									Message
								</label>
								<textarea
									rows={4}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition resize-none"
									placeholder="Tell us about your needs..."
								></textarea>
							</div>

							<Button variant="primary" onClick={() => {}} className="w-full">
								Send Message
							</Button>
						</form>
					</ScrollAnimation>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
