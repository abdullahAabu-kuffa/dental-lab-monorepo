"use client";

import EventsGrid from "../../../molecules/EventsGrid/EventsGrid";
import {
	HeroHeading,
	HeroSubtitle,
	componentStyles,
} from "@/app/design-system";
import ScrollAnimation from "@/app/design-system/components/ScrollAnimation";
import { EVENTS } from "../../../../config/LandingData/events.data";

const EventsSection: React.FC = () => {
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
						primaryText="Upcoming Events & "
						gradientText="Speakers"
						variant="white"
					/>
					<HeroSubtitle
						text="Meet industry leaders and innovators shaping the future of digital dentistry"
						variant="white"
					/>
				</ScrollAnimation>

				<ScrollAnimation animation="fadeInFromBottom" delay={0.2}>
					<EventsGrid events={EVENTS} />
				</ScrollAnimation>
			</div>
		</section>
	);
};

export default EventsSection;
