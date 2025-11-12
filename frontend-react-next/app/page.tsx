// React Components
import Navbar from "./src/components/organisms/Navbar/Navbar";
import HeroSec from "./src/components/organisms/landing/HeroSec 1/HeroSec";
import ServicesSection from "./src/components/organisms/landing/ServicesSection/ServicesSection";
import WorkflowSection from "./src/components/organisms/landing/WorkflowSection/WorkflowSection";
import ChooseMaterialSection from "./src/components/organisms/landing/ChooseMaterialSection/ChooseMaterialSection";
import ManufacturingProcessSection from "./src/components/organisms/landing/ManufacturingProcessSection/ManufacturingProcessSection";
import StatsSection from "./src/components/organisms/landing/StatsSection/StatsSection";
import EventsSection from "./src/components/organisms/landing/EventsSection/EventsSection";
import ContactSection from "./src/components/organisms/landing/ContactSection/ContactSection";
import Footer from "./src/components/organisms/Footer/Footer";



export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSec />
      <ServicesSection />
      <WorkflowSection />
      <ChooseMaterialSection />
      <ManufacturingProcessSection />
      <StatsSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
