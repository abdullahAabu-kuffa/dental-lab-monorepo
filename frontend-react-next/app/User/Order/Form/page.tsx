"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from '../../../src/utils/UnifiedIcons';
import OrderForm from '../components/OrderForm';
import PaymentSummary from '../components/PaymentSummary';
import { NEW_ORDER_FORM_FIELDS } from '../../../src/config/UserData/formFieldsData';

export default function NewOrderFormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const calculateSelectedServices = () => {
    const selectedServices: Array<{ label: string; price: number }> = [];
    let total = 0;

    Object.entries(formData).forEach(([key, value]) => {
      if (value === true) {
        const field = NEW_ORDER_FORM_FIELDS.find(f => f.id === key && f.price);
        if (field) {
          selectedServices.push({
            label: field.label,
            price: field.price!
          });
          total += field.price!;
        }
      }
    });

    return { selectedServices, totalAmount: total };
  };

  const handleFormDataChange = (newFormData: Record<string, unknown>) => {
    setFormData(newFormData);
  };

  const handlePayNow = async () => {
    setIsProcessingPayment(true);
    try {
      const orderData: Record<string, unknown> = {
        ...formData,
        paymentStatus: 'paid',
        paymentAmount: calculateSelectedServices().totalAmount,
        paymentDate: new Date().toISOString()
      };

      console.log('Processing payment for order:', orderData);

      await new Promise(resolve => setTimeout(resolve, 2000));

      router.push('/User/Order/Upload');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleContinueToUpload = () => {
    router.push('/User/Order/Upload');
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const orderData: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        orderData[key] = value;
      }

      console.log('Order data:', orderData);

      await new Promise(resolve => setTimeout(resolve, 1500));

      router.push('/User/Order/Upload');

    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { selectedServices, totalAmount } = calculateSelectedServices();

  return (
    <div className="flex gap-8 max-w-7xl ml-[30px] p-12">
      {/* Form Section */}
      <div className="flex-1 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">New Dental Order</h1>
                <p className="text-gray-600">Fill out all sections below to create your order</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/User/Order')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </button>
          </div>
        </motion.div>

        <OrderForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
          onFormDataChange={handleFormDataChange}
          onContinueToUpload={handleContinueToUpload}
        />
      </div>

      {/* Payment Summary Section */}
      <div className="w-96 flex-shrink-0">
        <PaymentSummary 
          selectedServices={selectedServices}
          totalAmount={totalAmount}
          onPayNow={handlePayNow}
        />
      </div>
    </div>
  );
}
