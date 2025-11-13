'use client';

import React from 'react';
import { TextAreaProps } from '../../../types/order.types';

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  required = false,
  disabled = false,
  error,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const baseClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500
  `;

  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20';

  const finalClasses = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={finalClasses}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextArea;