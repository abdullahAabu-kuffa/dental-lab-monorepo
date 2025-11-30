'use client';

import React from 'react';
import { Crown, Smile, Microscope, Zap, Activity } from '../../../utils/UnifiedIcons';

interface ServiceIconProps {
  iconName: string;
  className?: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ iconName, className = '' }) => {
  const iconNameLower = iconName.toLowerCase();
  
  const renderIcon = () => {
    switch (iconNameLower) {
      case 'crown':
        return <Crown className="w-8 h-8 text-white" />;
      case 'tooth':
        return <Activity className="w-8 h-8 text-white" />;
      case 'smile':
        return <Smile className="w-8 h-8 text-white" />;
      case 'microscope':
        return <Microscope className="w-8 h-8 text-white" />;
      case 'zap':
        return <Zap className="w-8 h-8 text-white" />;

    }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center">
        {renderIcon()}
      </div>
    </div>
  );
};

export default ServiceIcon;