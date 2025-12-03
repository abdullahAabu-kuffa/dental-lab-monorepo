"use client";

import EventsGrid from "../../../molecules/EventsGrid/EventsGrid";
import {
	HeroHeading,
	HeroSubtitle,
	componentStyles,
} from "@/app/[locale]/design-system";
import ScrollAnimation from "@/app/[locale]/design-system/components/ScrollAnimation";
import { EVENTS } from "../../../../config/LandingData/events.data";
import { useTranslations } from "next-intl";

const EventsSection: React.FC = () => {
	const t = useTranslations();
	return (
		<section
			id="events"
			className={`relative ${componentStyles.layout.spacingSection} ${componentStyles.background.sectionDark}`}
		>
			<div className={componentStyles.layout.containerDefault}>
				<ScrollAnimation
					animation="fadeInFromLeft"
					className="text-center mb-16"
				>
					<HeroHeading
						primaryText={t("upcomingEventsSpeakers").split(" & ")[0] + " & "}
						gradientText={t("upcomingEventsSpeakers").split(" & ")[1]}
						variant="white"
					/>
					<HeroSubtitle text={t("meetIndustryLeaders")} variant="white" />
				</ScrollAnimation>

				<ScrollAnimation animation="fadeInFromBottom" delay={0.2}>
					<EventsGrid events={EVENTS} />
				</ScrollAnimation>
			</div>
		</section>
	);
};

export default EventsSection;
