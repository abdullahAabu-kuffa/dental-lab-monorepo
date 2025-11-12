'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { StatItem } from '../../../types/components';

interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-2xl py-8 border border-white/10 hover:border-[#D4AF37]/40 transition"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.05,
        borderColor: "#D4AF37",
        transition: { duration: 0.15 }
      }}
    >
      <motion.div
        className="text-5xl font-bold mb-3 text-[#D4AF37]"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: (index * 0.1) + 0.15,
          duration: 0.25,
          type: "spring",
          stiffness: 100
        }}
      >
        {stat.number}
      </motion.div>
      <motion.div
        className="text-gray-300 text-sm uppercase tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: (index * 0.1) + 0.25,
          duration: 0.2
        }}
      >
        {stat.label}
      </motion.div>
    </motion.div>
  );
};

export default StatCard;