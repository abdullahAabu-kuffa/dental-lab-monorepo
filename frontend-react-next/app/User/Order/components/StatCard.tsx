import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatCardData {
  id: number;
  label: string;
  count: number | null;
  icon: LucideIcon;
  color: string;
  bgColor?: string;
  textColor: string;
}

interface StatCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const { label, count, icon: Icon, color, textColor } = data;

  return (
    <div className="w-32 h-20 rounded-lg p-3 transform hover:-translate-y-1 transition-all duration-300 text-left bg-gray-50 border border-gray-100 flex flex-col justify-between cursor-pointer">
      {/* Icon Circle with Gradient */}
      <div className="relative group mx-auto">
        {/* Count Badge */}
        {count !== null && (
          <div className={`absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center z-10 border-2 border-white bg-gradient-to-br ${color}`}>
            <span className="text-xs font-bold text-white">
              {count}
            </span>
          </div>
        )}
        <div className={`relative w-10 h-10 bg-gradient-to-br ${color} rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <h3 className={`text-xs font-bold ${textColor} leading-tight`}>
          {label}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;