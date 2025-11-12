'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../../types/components';
import Button from '../Button/Button';

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0 }) => {
  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
      initial={{ opacity: 0, y: 100, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.35,
        ease: "easeOut"
      }}
      whileHover={{
        y: -5,
        rotateY: 3,
        transition: { duration: 0.15 }
      }}
    >
      <div className="relative">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.15 }}
        />
        <motion.div
          className="absolute top-4 left-4 bg-[#D4AF37] text-black font-semibold text-sm px-3 py-1 rounded-md shadow"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (index * 0.08) + 0.15, duration: 0.2, type: "spring" }}
        >
          {event.date}
        </motion.div>
      </div>
      <div className="p-6">
        <motion.h3
          className="text-2xl font-bold mb-2 group-hover:text-[#D4AF37] transition"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (index * 0.08) + 0.2, duration: 0.25 }}
        >
          {event.title}
        </motion.h3>
        <motion.p
          className="text-gray-400 text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (index * 0.08) + 0.25, duration: 0.2 }}
        >
          {event.description}
        </motion.p>
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (index * 0.08) + 0.3, duration: 0.15 }}
        >
          <Button variant="primary" className="px-6 py-2">
            Reserve Seat
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventCard;