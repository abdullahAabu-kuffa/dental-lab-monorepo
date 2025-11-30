// React Components

import HeroSec from "@/components/organisms/landing/HeroSecH/HeroSec";
import ServicesSection from "@/components/organisms/landing/ServicesSection/ServicesSection";
// import StatsSection from "@/components/organisms/landing/OurAchievements/OurAchievements";
import WorkflowSection from "@/components/organisms/landing/WorkflowSection/WorkflowSection";
import ManufacturingProcessSection from "@/components/organisms/landing/ManufacturingProcessSection/ManufacturingProcessSection";
import ChooseMaterialSection from "@/components/organisms/landing/ChooseMaterialSection/ChooseMaterialSection";
import EducationalResourcesSection from "@/components/organisms/landing/EducationalResourcesSection/EducationalResourcesSection";
import EventsSection from "@/components/organisms/landing/EventsSection/EventsSection";

export default function Home() {
	return (
		<main>
			<HeroSec />
			<ServicesSection />
			<WorkflowSection />
			<ManufacturingProcessSection />
			<ChooseMaterialSection />
			{/* <StatsSection /> */}
			<EducationalResourcesSection />
			<EventsSection />
		</main>
	);
}
