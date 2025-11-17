// Order Process Component for displaying order progress and details
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Package} from 'lucide-react';
import { UnifiedOrder } from '../../../src/config/UserData/unifiedOrders';
import { getStatusConfig, getStepStatusConfig, updateProcessStepStatus, PROCESS_STEPS } from '../../../src/config/UserData/index';

interface OrderProcessProps {
  order: UnifiedOrder;
}

const OrderProcess: React.FC<OrderProcessProps> = ({ order }) => {
  const processSteps = updateProcessStepStatus(PROCESS_STEPS, order.status);

  return (
    <motion.div
      className="w-full max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {order.id}
                </h3>
                <p className="text-sm text-gray-600">
                  {order.patientName} • {order.orderType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(order.status).bg}`}>
                {order.status}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {order.price || `EGP ${order.totalAmount}`}
              </span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Material', value: order.material || 'N/A' },
              { label: 'Tooth', value: order.tooth || 'N/A' },
              { label: 'Date', value: order.date },
              { label: 'Price', value: order.price || `EGP ${order.totalAmount}`, green: true }
            ].map((info, index) => (
              <div key={index} className={`text-center p-3 rounded-lg ${info.green ? 'bg-green-50' : 'bg-blue-50'}`}>
                <p className="text-xs font-medium text-gray-600">{info.label}</p>
                <p className={`text-sm font-semibold ${info.green ? 'text-green-600' : 'text-gray-800'}`}>
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Manufacturing Process
          </h4>
          
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const config = getStepStatusConfig(step.status);
              const IconComponent = config.icon;
              
              return (
                <motion.div
                  key={step.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
                    <IconComponent className={`w-5 h-5 ${step.status === 'active' ? 'animate-pulse' : ''}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">{step.name}</h5>
                    <p className="text-sm text-gray-600">{step.details}</p>
                    {step.timestamp && (
                      <p className="text-xs text-gray-500 mt-1">{step.timestamp}</p>
                    )}
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg}`}>
                    {config.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Started: {order.date}</p>
              <p>Estimated completion: 2-3 days</p>
            </div>
            <div className="flex gap-3">
              {['Contact Lab', 'View Details'].map((action, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    index === 0 
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderProcess;