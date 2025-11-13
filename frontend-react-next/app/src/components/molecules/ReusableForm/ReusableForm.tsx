"use client";

import React, { useState } from 'react';

interface FormField {
  id: string;
  type: 'text' | 'checkbox' | 'textarea' | 'file';
  label: string;
  required?: boolean;
}

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  submitButtonText?: string;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
}) => {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {field.type === 'checkbox' ? (
            <input
              type="checkbox"
              checked={formData[field.id] as boolean || false}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.checked }))}
              className="w-4 h-4 text-[#E4B441] border-gray-300 rounded focus:ring-[#E4B441]"
            />
          ) : field.type === 'textarea' ? (
            <textarea
              value={formData[field.id] as string || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441]"
              rows={4}
            />
          ) : field.type === 'file' ? (
            <input
              type="file"
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.files?.[0]?.name || '' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441]"
            />
          ) : (
            <input
              type="text"
              value={formData[field.id] as string || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441]"
            />
          )}
        </div>
      ))}
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white font-semibold rounded-lg hover:from-[#FFD700] hover:to-[#E4B441] transition-all"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default ReusableForm;