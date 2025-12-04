'use client';

import React from 'react';
import EventCard from '../components/EventCard';
import { staticEvents } from '../staticData/eventsData';
import { useRouter } from 'next/navigation';

const EventPage: React.FC = () => {
  const router = useRouter();

  const handleContactUs = () => {
    router.push('/contact');
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming Events & Scientific Days
          </h1>
         
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Event Type</option>
                <option>Workshop</option>
                <option>Symposium</option>
                <option>Masterclass</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Status</option>
                <option>Upcoming</option>
                <option>Registered</option>
                <option>Event Ended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {staticEvents.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index}
            />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Host Your Own Event?
            </h2>
            <p className="text-gray-600 mb-6">
              Partner with Avanté Dental Lab to organize educational events 
              and reach dental professionals in your region.
            </p>
            <button
              onClick={handleContactUs}
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;