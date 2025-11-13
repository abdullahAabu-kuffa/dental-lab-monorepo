import React from 'react';

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
  showDivider?: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({ 
  children, 
  className = '', 
  showDivider = true 
}) => {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-md border border-gray-200 ${className}`}>
      <div className="flex gap-3 justify-center">
        {children}
      </div>
      
      {showDivider && (
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-900 to-transparent rounded-full mt-3"></div>
      )}
    </div>
  );
};

export default StatsGrid;