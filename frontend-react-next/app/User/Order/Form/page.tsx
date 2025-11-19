"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import OrderForm from '../components/FormComponent/OrderForm';
import PaymentSummary from '../components/FormComponent/PaymentSummary';
import { useNavigation,  animations } from '../../../src/utils/pageUtils';
import { calculateSelectedServices } from '../../../src/utils/pricingService';

export default function NewOrderPage() {
  const { navigateToUpload } = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleFormDataChange = (newFormData: Record<string, unknown>) => {
    setFormData(newFormData);
  };

  const handlePayNow = async () => {
    setIsProcessingPayment(true);

    try {
      const { selectedServices, totalAmount } = calculateSelectedServices(formData);

      // Create order data
      const orderData = {
        ...formData,
        paymentStatus: 'paid',
        paymentAmount: totalAmount,
        paymentDate: new Date().toISOString(),
      };

      console.log("Processing payment:", orderData);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to upload page after successful payment
      navigateToUpload();
    } catch (err) {
      console.error("Payment Error:", err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const { selectedServices, totalAmount } = calculateSelectedServices(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          {...animations.fadeInUp}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Order</h1>
          <p className="text-gray-600">Fill in the details to create a new dental order</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Form */}
          <div className="flex-1 min-w-0">
            <OrderForm
              onSubmit={() => {}}
              isSubmitting={isSubmitting}
              onFormDataChange={handleFormDataChange}
              onContinueToUpload={() => navigateToUpload()}
            />
          </div>

          {/* Payment Summary */}
          <div className="w-80 sm:w-96 flex-shrink-0">
            <PaymentSummary
              title="Order Summary"
              subtitle="Selected services"
              icon={<ShoppingCart className="w-5 h-5 text-white" />}
              selectedItems={selectedServices}
              totalAmount={totalAmount}
              buttonLabel="Pay Now"
              onAction={handlePayNow}
              disabled={isProcessingPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
