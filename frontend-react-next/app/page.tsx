// React Components

import HeroSec from "./src/components/organisms/landing/HeroSecH/HeroSec";
import ServicesSection from "./src/components/organisms/landing/ServicesSection/ServicesSection";
// import StatsSection from "./src/components/organisms/landing/OurAchievements/OurAchievements";
import WorkflowSection from "./src/components/organisms/landing/WorkflowSection/WorkflowSection";
import ManufacturingProcessSection from "./src/components/organisms/landing/ManufacturingProcessSection/ManufacturingProcessSection";
import ChooseMaterialSection from "./src/components/organisms/landing/ChooseMaterialSection/ChooseMaterialSection";
import EducationalResourcesSection from "./src/components/organisms/landing/EducationalResourcesSection/EducationalResourcesSection";
import EventsSection from "./src/components/organisms/landing/EventsSection/EventsSection";

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
