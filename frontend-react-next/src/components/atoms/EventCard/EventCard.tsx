'use client';
import React from 'react';
import { Event } from '../../../types';
import Button from '../Button/Button';

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event}) => {
  return (
    <div
      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition"
        />
        <div
          className="absolute top-4 left-4 bg-[#D4AF37] text-black font-semibold text-sm px-3 py-1 rounded-md shadow"
        >
          {event.date}
        </div>
      </div>
      <div className="p-6">
        <h3
          className="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition"
        >
          {event.title}
        </h3>
        <p
          className="text-gray-400 text-sm mb-4"
        >
          {event.description}
        </p>
        <div
          className="mt-6 flex justify-center"
        >
          {/* <Button variant="primary" className="px-6 py-2">
            Reserve Seat
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default EventCard;