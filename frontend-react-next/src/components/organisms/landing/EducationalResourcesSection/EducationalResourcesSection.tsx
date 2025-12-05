"use client";
import React from "react";
import EducationalResourceCard from "../../../atoms/EducationalResourceCard/EducationalResourceCard";
import Button from "../../../atoms/Button/Button";
import {
	HeroHeading,
	componentStyles,
	HeroSubtitle,
} from "@/app/[locale]/design-system";
import { ScrollAnimation } from "@/app/[locale]/design-system";
import { EDUCATIONAL_RESOURCES } from "@/config/LandingData/educational-resources.data";
import { useTranslations } from "next-intl";

const EducationalResourcesSection: React.FC = () => {
	const t = useTranslations();
	return (
		<section className={`bg-white ${componentStyles.layout.spacingSection}`}>
			<div className="max-w-7xl mx-auto px-6">
				{/* Section Header */}
				<ScrollAnimation
					animation="fadeInFromLeft"
					className="text-center mb-16"
				>
					<HeroHeading
						primaryText=""
						gradientText={t("educationalResources")}
						variant="black"
					/>
					<HeroSubtitle text={t("stayAheadGuides")} variant="black" />
				</ScrollAnimation>

				{/* Resources Grid */}
				<ScrollAnimation
					animation="fadeInFromBottom"
					delay={0.2}
					className="grid md:grid-cols-3 gap-8 mb-12"
				>
					{EDUCATIONAL_RESOURCES.map((resource, index) => (
						<ScrollAnimation
							key={resource.id}
							animation="scaleAndFadeIn"
							delay={0.3 + index * 0.1}
						>
							<EducationalResourceCard resource={resource} />
						</ScrollAnimation>
					))}
				</ScrollAnimation>

				{/* View All Resources Button
				<ScrollAnimation
					animation="fadeInFromBottom"
					delay={0.6}
					className="text-center"
				>
					<Button
						variant="primary"
						onClick={() => (window.location.href = "/resources")}
					>
						{t("viewAllResources")}
					</Button>
				</ScrollAnimation> */}
			</div>
		</section>
	);
};

export default EducationalResourcesSection;
