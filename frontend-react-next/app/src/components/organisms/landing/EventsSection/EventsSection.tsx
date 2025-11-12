import EventsGrid from '../../../molecules/HeroSectionMolecules/EventsGrid/EventsGrid';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';
import { EVENTS } from '../../../../config/events.data';
import { typography, componentStyles } from '../../../../../design-system';

const EventsSection: React.FC = () => {
  return (
    <section id="events" className={`${componentStyles.layout.relative} ${componentStyles.layout.spacingSection} ${componentStyles.background.sectionDark}`}>
      <div className={componentStyles.layout.containerDefault}>
        <div className="text-center mb-16">
          <HeroHeading
            primaryText="Upcoming Events & "
            gradientText="Speakers"
            gradientColors="linear-gradient(to right, #4A90E2, #357ABD, #2E5B8C)"
          />
          <HeroSubtitle
            text="Meet industry leaders and innovators shaping the future of digital dentistry"
          />
        </div>

        <EventsGrid events={EVENTS} />
      </div>
    </section>
  );
};

export default EventsSection;