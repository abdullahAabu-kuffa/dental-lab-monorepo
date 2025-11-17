'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../../../config/LandingData/services.data';
import { componentStyles } from '../../../../design-system';

interface SimpleServiceCardProps {
  service: Service;
  delay?: number;
}

const SimpleServiceCard: React.FC<SimpleServiceCardProps> = ({ service, delay = 0 }) => {
  const renderIcon = () => {
    if (service.iconType === 'fontawesome') {
      return <i className={`${service.icon as string} text-lg`}></i>;
    } else {
      const IconComponent = service.icon as React.ComponentType<{ className?: string }>;
      return <IconComponent className="w-6 h-6 text-white" />;
    }
  };

  return (
    <motion.div
      className="group bg-light rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer border border-gray-200 hover:border-[#D4AF37]/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      {/* Icon with Design System styling */}
      <div className="relative mb-4">
        <div className={componentStyles.buttons.serviceCard}>
          {renderIcon()}
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#C9A961] transition-colors duration-300">
        {service.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

export default SimpleServiceCard;