"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Calendar, User, AlertCircle, CheckCircle, LucideIcon } from '../../../src/utils/UserIcons';
import { getFormSections, FormField } from '../../../src/config/UserData/formFieldsData';
import { componentStyles } from '../../../design-system';

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  onCancel?: () => void;
}

interface FormInputProps {
  icon: LucideIcon;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}

interface FormSectionProps {
  title: string;
  fields: FormField[];
}

export default function NewOrderForm({ onSubmit, onCancel }: Props) {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ 
    type: null, msg: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    if (!data.get('patientName')?.toString().trim()) {
      setStatus({ type: 'error', msg: 'Patient name required' });
      return;
    }

    try {
      setLoading(true);
      await onSubmit(data);
      setStatus({ type: 'success', msg: 'Order submitted successfully!' });
      setTimeout(() => {
        form.reset();
        onCancel?.();
      }, 2000);
    } catch {
      setStatus({ type: 'error', msg: 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl border"
    >
      <div className={`${componentStyles.background.sectionDark} p-4 rounded-t-xl`}>
        <h2 className="text-xl font-bold text-white">Create New Order</h2>
      </div>

      {status.type && (
        <StatusMessage type={status.type} message={status.msg} />
      )}

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput icon={User} label="Patient Name" name="patientName" required />
          <FormInput icon={Calendar} label="Date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
        </div>

        {/* Service Sections */}
        {getFormSections().slice(1).map((section, i) => (
          <FormSection key={i} title={section.title} fields={section.fields} />
        ))}

      

        {/* Notes */}
        <div>
          <label className="block text-sm font-bold mb-2">Notes</label>
          <textarea name="notes" rows={3} className="w-full px-3 py-2 border rounded-lg resize-none" placeholder="Special instructions..." />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          {onCancel && (
            <button type="button" onClick={onCancel} disabled={loading} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100">
              Cancel
            </button>
          )}
          <button type="submit" disabled={loading} className={`flex-1 ${componentStyles.buttons.primary}`}>
            {loading ? 'Submitting...' : 'Next to uploded files'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

const StatusMessage = ({ type, message }: { type: 'success' | 'error'; message: string }) => (
  <div className={`m-4 p-3 rounded flex gap-2 ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
    {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
    <span className="text-sm">{message}</span>
  </div>
);

const FormInput = ({ icon: Icon, label, name, type = 'text', required = false, defaultValue }: FormInputProps) => (
  <div>
    <label className="block text-sm font-bold mb-2">{label} {required && '*'}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input type={type} name={name} required={required} defaultValue={defaultValue} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E4B441]" />
    </div>
  </div>
);

const FormSection = ({ title, fields }: FormSectionProps) => (
  <div>
    <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">{title}</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {fields.map((field: FormField) => (
        <label key={field.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input type="checkbox" name={field.id} className="w-4 h-4 text-[#E4B441] rounded" />
          <span className="text-sm">{field.label}</span>
        </label>
      ))}
    </div>
  </div>
);