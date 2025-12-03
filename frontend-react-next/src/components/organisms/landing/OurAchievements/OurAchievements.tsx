"use client";
import React from "react";
import Link from "next/link";
import { Smile, CheckCircle } from "../../../../utils/UnifiedIcons";
import StatCard from "../../../atoms/StatCard/StatCard";
import Button from "../../../atoms/Button/Button";
import { HeroHeading, HeroSubtitle } from "@/app/[locale]/design-system";
import ScrollAnimation from "@/app/[locale]/design-system/components/ScrollAnimation";
//import DentalBackground from "../../../atoms/MedicalBackground/MedicalBackgroundLight";

// import { STATS } from "../../../../config/LandingData/OurAchievements";
import { useTranslations } from "next-intl";

const StatsSection: React.FC = () => {
	const t = useTranslations();
	return (
		<section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
			{/* Background Components */}

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				{/* Section Title */}
				<ScrollAnimation
					animation="fadeInFromLeft"
					className="text-center mb-20"
				>
					<HeroHeading
						primaryText={t("ourAchievements").split(" ")[0] + " "}
						gradientText={t("ourAchievements").split(" ")[1]}
						variant="white"
					/>
					<HeroSubtitle text={t("achievementsSubtitle")} variant="white" />
				</ScrollAnimation>

				{/* Stats Grid */}
				{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center mb-16">
					{STATS.map((stat, index) => (
						<ScrollAnimation
							key={index}
							animation="scaleAndFadeIn"
							delay={0.3 + index * 0.1}
						>
							<StatCard stat={stat} index={index} />
						</ScrollAnimation>
					))}
				</div> */}

				{/* CTA Section */}
				<ScrollAnimation
					animation="fadeInFromBottom"
					delay={0.6}
					className="text-center"
				>
					<p className="text-white text-2xl font-semibold mb-6 flex items-center justify-center gap-3">
						<CheckCircle className="w-8 h-8 text-[#D4AF37]" />
						{t("readyToGoDigital")}
						<Smile className="w-8 h-8 text-[#D4AF37]" />
					</p>
					<Link href="/dashboard">
						<Button variant="primary">{t("startYourDigitalJourney")}</Button>
					</Link>
				</ScrollAnimation>
			</div>
		</section>
	);
};

export default StatsSection;
