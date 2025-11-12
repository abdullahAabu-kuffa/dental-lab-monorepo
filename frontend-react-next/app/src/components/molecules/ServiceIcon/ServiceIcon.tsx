'use client';

import React from 'react';
import { Crown, Zap, Smile, Microscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ServiceIconProps {
  iconName: 'crown' | 'tooth' | 'smile' | 'microscope';
  size?: number;
  className?: string;
}

const iconMap = {
  crown: Crown,
  tooth: Zap,
  smile: Smile,
  microscope: Microscope
};

export default function ServiceIcon({ 
  iconName, 
  size = 52, 
  className = "" 
}: ServiceIconProps) {
  const IconComponent: LucideIcon = iconMap[iconName];
  
  return (
    <div className={`flex justify-center ${className}`}>
      <IconComponent
        size={size}
        color="#D4AF37"
        strokeWidth={2}
        fill="none"
      />
    </div>
  );
}