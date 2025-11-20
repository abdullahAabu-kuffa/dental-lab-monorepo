"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle, FileText } from '../../../src/utils/UnifiedIcons';
import { useNavigation, animations } from '../../../src/utils/pageUtils';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import PaymentSummary from '../components/FormComponent/PaymentSummary';
import { calculateSelectedServices } from '../../../src/utils/pricingService';

export default function UploadPage() {
  const { navigateToForm, navigateToHome } = useNavigation();
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { selectedServices, totalAmount } = calculateSelectedServices(formData);

  const handlePayNow = async () => {
    setIsProcessingPayment(true);

    try {
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

      // Navigate to orders list after successful payment
      navigateToHome();
    } catch (err) {
      console.error("Payment Error:", err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...animations.fadeInUp}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Upload Files & Notes</h1>
                <p className="text-gray-600">Upload documents and add special instructions</p>
              </div>
            </div>
            
            <button
              onClick={() => navigateToForm()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </button>
          </div>
        </motion.div>

        <div className="flex gap-6">
          {/* Upload Form */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* File Upload Section */}
            <motion.div
              {...animations.fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">📎 Upload Files</h2>
                  <p className="text-sm text-gray-500">Upload documents, X-rays, or photos</p>
                </div>
              </div>
              
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#E4B441] hover:bg-gray-50 transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-gray-500">
                  Supported: image/*,.pdf,.dcm,.dicom (Max 5 files)
                </p>
              </div>
            </motion.div>

            {/* Notes Section */}
            <motion.div
              {...animations.fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">📝 Notes</h2>
                  <p className="text-sm text-gray-500">Add any special instructions or notes</p>
                </div>
              </div>
              
              <textarea
                placeholder="Write your notes here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441] resize-none"
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              {...animations.fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4"
            >
              <button
                onClick={() => navigateToForm()}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Back to Form
              </button>
              
              <button
                onClick={() => navigateToHome()}
                className="px-6 py-3 bg-gradient-to-r from-[#E4B441] to-[#D4A431] text-white font-semibold rounded-lg hover:from-[#FFD700] hover:to-[#E4B441] transition-all transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Order</span>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Payment Summary */}
          <div className="w-80 sm:w-96 flex-shrink-0">
            <motion.div
              {...animations.fadeInUp}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}