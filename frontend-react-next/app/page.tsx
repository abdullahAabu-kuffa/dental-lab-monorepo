import Navbar from "./src/components/organisms/Navbar/Navbar";
import HeroSec from "./src/components/organisms/HeroSec 1/HeroSec";
import StatsSection from "./src/components/organisms/StatsSection/StatsSection";
import WorkflowSection from "./src/components/organisms/WorkflowSection/WorkflowSection";
import EventsSection from "./src/components/organisms/EventsSection/EventsSection";
import ManufacturingProcessSection from "./src/components/organisms/ManufacturingProcessSection/ManufacturingProcessSection";
import ContactSection from "./src/components/organisms/ContactSection/ContactSection";
import CTASection from "./src/components/organisms/CTASection/CTASection";
import Footer from "./src/components/organisms/Footer/Footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<HeroSec />
			<StatsSection />
			<WorkflowSection />
			<EventsSection />
			<ManufacturingProcessSection />
			<ContactSection />
			<CTASection />
			<Footer />
		</>
	);
}
