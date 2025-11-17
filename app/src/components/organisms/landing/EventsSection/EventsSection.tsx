import EventsGrid from '../../../molecules/EventsGrid/EventsGrid';
import { HeroHeading } from '../../../../../design-system';
import { HeroSubtitle } from '../../../../../design-system';
import { EVENTS } from '../../../../config/LandingData/events.data';
import { typography, componentStyles } from '../../../../../design-system';

const EventsSection: React.FC = () => {
  return (
    <section id="events" className={`relative ${componentStyles.layout.spacingSection} ${componentStyles.background.sectionDark}`}>
      <div className={componentStyles.layout.containerDefault}>
        <div className="text-center mb-16">
          <HeroHeading
            primaryText="Upcoming Events & "
            gradientText="Speakers"
            variant="white"
          />
          <HeroSubtitle
            text="Meet industry leaders and innovators shaping the future of digital dentistry"
            variant="white"
          />
        </div>

        <EventsGrid events={EVENTS} />
      </div>
    </section>
  );
};

export default EventsSection;
