"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Package,  Eye, Settings, CheckCircle } from '../../../src/utils/UserIcons';

import type { Order } from '../types';

interface OrderDetailsPanelProps {
  order: Order;
}

const MANUFACTURING_STEPS = [
  { id: 'received', name: 'Order Received', icon: Package, status: 'completed' },
  { id: 'design', name: 'Design Review', icon: Eye, status: 'completed' },
  { id: 'manufacturing', name: 'Manufacturing', icon: Settings, status: 'in-progress' },
  { id: 'quality', name: 'Quality Check', icon: CheckCircle, status: 'pending' }
];

const OrderDetailsPanel: React.FC<OrderDetailsPanelProps> = ({ order }) => {
  const progress = 60; // Calculate based on order status

  const getStepStatus = (stepStatus: string) => {
    if (stepStatus === 'completed') return 'bg-green-500 text-white';
    if (stepStatus === 'in-progress') return 'bg-blue-500 text-white';
    return 'bg-gray-200 text-gray-400';
  };

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Process Tracking</h1>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600">Order ID:</span>
            <span className="ml-2 font-bold text-blue-600">#{order.id}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Patient:</span>
            <span className="ml-2 font-semibold text-gray-800">{order.patientName}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Type:</span>
            <span className="ml-2 font-semibold text-gray-800">{order.orderType}</span>
          </div>
        </div>
      </motion.div>

      {/* Manufacturing Process */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Manufacturing Process</h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 z-0" />
          <div 
            className="absolute top-8 left-0 h-1 bg-green-500 z-0 transition-all duration-500"
            style={{ width: '50%' }}
          />
          
          {/* Steps */}
          <div className="relative z-10 grid grid-cols-4 gap-4">
            {MANUFACTURING_STEPS.map((step, index) => {
              const Icon = step.icon;
              const statusClass = getStepStatus(step.status);
              
              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${statusClass} shadow-lg relative`}>
                    <Icon className="w-7 h-7" />
                    {step.status === 'in-progress' && (
                      <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping" />
                    )}
                  </div>
                  
                  {/* Step Name */}
                  <h3 className="font-bold text-xs text-gray-800 mb-2">{step.name}</h3>
                  
                  {/* Status Badge */}
                  {step.status === 'completed' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      ✓ Completed
                    </span>
                  )}
                  {step.status === 'in-progress' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      ⚡ In Progress
                    </span>
                  )}
                  {step.status === 'pending' && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                      ⏳ Pending
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Additional Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Material</p>
            <p className="text-lg font-bold text-gray-800">{order.material}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Urgency</p>
            <p className={`text-lg font-bold ${
              order.urgency === 'High' ? 'text-red-600' : 
              order.urgency === 'Medium' ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {order.urgency}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Order Type</p>
            <p className="text-lg font-bold text-gray-800">{order.orderType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-lg font-bold text-green-600">${order.totalAmount}</p>
          </div>
        </div>

        {order.notes && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Notes:</p>
            <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">{order.notes}</p>
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default OrderDetailsPanel;
