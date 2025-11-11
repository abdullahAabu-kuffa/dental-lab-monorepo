import React from 'react';
import { EventsSectionProps } from '../../../types/components';
import EventsGrid from '../../molecules/EventsGrid/EventsGrid';
import { EVENTS } from '../../../config/events.data';

const EventsSection: React.FC<EventsSectionProps> = ({ 
  title = "Upcoming Events & Speakers",
  subtitle = "Meet industry leaders and innovators shaping the future of digital dentistry",
  events = EVENTS 
}) => {
  return (
    <section id="events" className="relative py-24 bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-20">
          <h2
            className="text-5xl font-black mb-4"
            style={{
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(to right, #D4AF37, #CABEB2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            {title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Event Grid */}
        <EventsGrid events={events} />
      </div>
    </section>
  );
};

export default EventsSection;