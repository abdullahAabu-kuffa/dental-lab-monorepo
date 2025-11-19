"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from '../../../../src/utils/UnifiedIcons';
import { FORM_SECTIONS, SECTION_DESCRIPTIONS } from '../../../../src/config/UserData/formFieldsData';
import { FormField } from '../../../../src/types';

interface OrderFormProps {
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
  onFormDataChange?: (formData: Record<string, unknown>) => void;
  onContinueToUpload?: () => void;
}

export default function OrderForm({ onSubmit, isSubmitting, onFormDataChange, onContinueToUpload }: OrderFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleChange = (fieldId: string, value: string | boolean) => {
    const newFormData = { ...formData, [fieldId]: value };
    setFormData(newFormData);
    if (onFormDataChange) {
      onFormDataChange(newFormData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, String(value)));
    onSubmit(data);
  };

  const handleContinueClick = () => {
    if (onContinueToUpload) {
      onContinueToUpload();
    }
  };

  const renderField = (field: FormField & { price?: number }) => {
    const isText = field.type === 'text';
    return (
      <div
        key={field.id}
        className={isText ? 'space-y-2' : 'flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'}
      >
        {isText ? (
          <>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={formData[field.id] as string || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441]"
            />
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3 flex-1">
              <input
                type="checkbox"
                id={field.id}
                checked={formData[field.id] as boolean || false}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                className="w-4 h-4 text-[#E4B441] border-gray-300 rounded focus:ring-[#E4B441]"
              />
              <label htmlFor={field.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                {field.label}
              </label>
            </div>
            {field.price && (
              <span className="text-sm font-semibold text-[#E4B441] bg-[#E4B441]/10 px-2 py-1 rounded">
                ${field.price}
              </span>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
        {FORM_SECTIONS.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                <p className="text-sm text-gray-500">{SECTION_DESCRIPTIONS[section.title]}</p>
              </div>
            </div>
            
            <div className={`grid ${section.fields.length === 2 ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
              {section.fields.map(renderField)}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 pt-4"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Save as Draft
          </button>
          
          <button
            type="button"
            onClick={handleContinueClick}
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white font-semibold rounded-lg hover:from-[#FFD700] hover:to-[#E4B441] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              <span>Continue to File Upload</span>
            </div>
          </button>
        </motion.div>
      </form>
    </div>
  );
}
