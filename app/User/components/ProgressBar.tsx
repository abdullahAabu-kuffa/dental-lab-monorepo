// app/User/Order/components/ProgressBar.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  showButtons?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  showButtons = true 
}) => {
  return (
    <div className="space-y-4">
      {/* Progress Card */}
      <div className="bg-blue-500 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">Overall Progress</h3>
          <span className="text-white font-bold text-3xl">{percentage}% Complete</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-white rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      {showButtons && (
        <div className="grid grid-cols-2 gap-4">
          <button className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all">
            Contact Support
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all shadow-lg">
            View Order Details
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;