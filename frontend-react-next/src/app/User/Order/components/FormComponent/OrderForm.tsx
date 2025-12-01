"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "@/utils/UnifiedIcons";
import {
  FORM_SECTIONS,
  SECTION_DESCRIPTIONS,
} from "@/config/UserData/formFieldsData";
import { FormField } from "@/types";

import toast from "react-hot-toast";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";
import { calculateSelectedServices } from "@/utils/pricingService";
import Swal from "sweetalert2";

interface OrderFormProps {
	onSubmit: (formData: FormData) => void;
	isSubmitting: boolean;
	onFormDataChange?: (formData: Record<string, string|boolean>) => void;
	onContinueToUpload?: () => void;
}

export default function OrderForm({
  onSubmit,
  isSubmitting,
  onFormDataChange,
  onContinueToUpload,
}: OrderFormProps) {
	const [formData, setFormData] = useState<Record<string, string|boolean>>({});

  const { selectedServices, totalAmount } = calculateSelectedServices(formData);

  const validateForm = () => {
    if (!formData.patientName || !formData.age) {
      return {
        title: "Missing Information",
        text: "Please fill in the patient's name and age before continuing.",
        icon: "warning",
        confirmButtonColor: "#E4B441",
      };
    }
    if (!selectedServices || selectedServices.length === 0) {
      return {
        title: "No Materials Selected",
        text: "Please choose at least one material before continuing.",
        icon: "warning",
        confirmButtonColor: "#E4B441",
      };
    }
    return null;
  };

  const handleChange = (fieldId: string, value: string | boolean) => {
    const newFormData = { ...formData, [fieldId]: value };
    setFormData(newFormData);
    if (onFormDataChange) {
      onFormDataChange(newFormData);
    }

    // Real-time validation
    if (fieldId === 'patientName') {
      const strValue = value as string;
      if (!strValue.trim()) {
        setErrors({ ...errors, patientName: 'Name is required.' });
      } else if (strValue.length < 3) {
        setErrors({ ...errors, patientName: 'Name must be at least 3 characters.' });
      } else if (!/^[A-Za-z\s]+$/.test(strValue)) {
        setErrors({ ...errors, patientName: 'Name can only contain letters and spaces.' });
      } else {
        setErrors({ ...errors, patientName: '' });
      }
    } else if (fieldId === 'notes') {
      const strValue = value as string;
      if (strValue.trim() && strValue.length < 10) {
        setErrors({ ...errors, notes: 'Notes must be at least 10 characters.' });
      } else {
        setErrors({ ...errors, notes: '' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, String(value))
    );
    onSubmit(data);
  };
// handle continue date and name validation
  const handleContinueClick = () => {
    if (!formData.patientName || !formData.age) {
      return Swal.fire({
        title: "Missing Information",
        text: "Please fill in the patient's name and age before continuing.",
        icon: "warning",
        confirmButtonColor: "#E4B441",
      });
    }
// handle selected services validation
    if (!selectedServices || selectedServices.length === 0) {
      return Swal.fire({
        title: "No Materials Selected",
        text: "Please choose at least one material before continuing.",
        icon: "warning",
        confirmButtonColor: "#E4B441",
      });
    }

    const materialsList = selectedServices
      .map(
        (item) => `
        <div style="
          display:flex; 
          justify-content:space-between; 
          padding:8px 0; 
          border-bottom:1px solid #f0f0f0;
        ">
          <span style="font-weight:500; color:#444">${item.label}</span>
          <span style="font-weight:600; color:#E4B441">${item.price} EGP</span>
        </div>
      `
      )
      .join("");

    const totalAmount = selectedServices.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    Swal.fire({
      title: "Confirm to Continue",
      html: `
      <div style="
        text-align:left; 
        font-size:15px; 
        color:#444; 
        line-height:1.7;
      ">
        <div style="
          max-height:250px; 
          overflow-y:auto; 
          padding-right:5px;
        ">
          ${materialsList}
        </div>

        <div style="
          margin-top:15px; 
          padding:12px; 
          background:#FFF8E1; 
          border-left:4px solid #E4B441; 
          border-radius:8px; 
          display:flex; 
          justify-content:space-between;
          font-size:16px;
        ">
          <span style="font-weight:600; color:#333">Total Amount:</span>
          <span style="font-weight:700; color:#E4B441">${totalAmount} EGP</span>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",

      background: "#ffffff",
      color: "#333",
      width: "450px",

      confirmButtonColor: "#E4B441",
      cancelButtonColor: "#999",
      buttonsStyling: true,

      customClass: {
        popup: "rounded-xl shadow-xl",
        confirmButton:
          "px-5 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg",
        cancelButton:
          "px-5 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all",
        title: "text-xl font-semibold text-gray-900",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onContinueToUpload?.();
      }
    });
  };

  const [orderLocked, setOrderLocked] = useState(true);
  useNavigationGuard(orderLocked);
  const renderField = (field: FormField & { price?: number }) => {
    const isText = field.type === "text";
    const isSelect = field.type === "select";
    const isTextarea = field.type === "textarea";
    return (
      <div
        key={field.id}
        className={
          isText || isSelect || isTextarea
            ? "space-y-2"
            : "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        }
      >
        {isText ? (
          <>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={(formData[field.id] as string) || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrors({ ...errors, [field.id]: field.validation?.pattern?.message || 'Invalid input' });
              }}
              onInput={() => setErrors({ ...errors, [field.id]: '' })}
              required={field.required}
              pattern={field.validation?.pattern?.value}
              title={field.validation?.pattern?.message}
              minLength={field.validation?.minLength}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441] ${
                errors[field.id] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </>
        ) : isTextarea ? (
          <>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={(formData[field.id] as string) || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onInput={() => setErrors({ ...errors, [field.id]: '' })}
              required={field.required}
              minLength={field.validation?.minLength}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441] ${
                errors[field.id] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </>
        ) : isSelect ? (
          <>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={(formData[field.id] as string) || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441]"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3 flex-1">
              <input
                type="checkbox"
                id={field.id}
                checked={(formData[field.id] as boolean) || false}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                className="w-4 h-4 text-[#E4B441] border-gray-300 rounded focus:ring-[#E4B441]"
              />
              <label
                htmlFor={field.id}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {field.label}
              </label>
            </div>
            {field.price && (
              <span className="text-sm font-semibold text-[#E4B441] bg-[#E4B441]/10 px-2 py-1 rounded">
                {field.price} EGP
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
              <div
                className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {SECTION_DESCRIPTIONS[section.title]}
                </p>
              </div>
            </div>

            <div
              className={`grid ${
                section.fields.length === 2
                  ? "grid-cols-1 md:grid-cols-2 gap-6"
                  : "grid-cols-1 md:grid-cols-2 gap-4"
              }`}
            >
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
            type="button"
            disabled={isSubmitting}
            onClick={() => toast.success("Successfully saved as draft!")}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={() => {
              setOrderLocked(false);
              handleContinueClick();
            }}
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

