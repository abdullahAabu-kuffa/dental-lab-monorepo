'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../../../config/services.data';
import { componentStyles } from '../../../../design-system';
import { gradients } from '../../../../design-system/gradients';

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, delay = 0 }) => {
  const IconComponent = service.icon;

  return (
    <motion.div
      className="relative group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.6,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {/* Background gradient on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{
          background: gradients.gold
        }}
      />
      
      {/* Icon */}
      <div className="relative mb-4">
        <div className={componentStyles.buttons.serviceCard}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
        {service.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {service.description}
      </p>
      
      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feature, index) => (
          <li 
            key={index}
            className="flex items-center text-sm text-gray-500"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServiceCard;