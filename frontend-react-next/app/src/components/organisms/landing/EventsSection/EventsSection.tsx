import EventsGrid from '../../../molecules/EventsGrid/EventsGrid';
import HeroHeading from '../../../molecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSubtitle/HeroSubtitle';
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
            gradientColors="linear-gradient(to right, #D4AF37, #F4E4A6)"
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
