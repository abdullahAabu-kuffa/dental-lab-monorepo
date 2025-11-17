import React from 'react';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress,
  showPercentage = true,
  height = 'md'
}) => {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="mt-12 max-w-5xl mx-auto">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div 
          className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {showPercentage && (
        <p className="text-center text-sm text-gray-600 mt-2">
          {progress}% Complete
        </p>
      )}
    </div>
  );
};