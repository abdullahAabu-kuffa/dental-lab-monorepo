import React from 'react';
import { Event } from '../../../types/index';
import EventCard from '../../atoms/EventCard/EventCard';

interface EventsGridProps {
  events: Event[];
}

const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  );
};

export default EventsGrid;
export type { EventsGridProps };