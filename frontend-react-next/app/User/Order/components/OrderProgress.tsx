"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderProgressProps } from '../../../src/types';
// Note: Assuming getProgressSteps, getStepStatusColor, formatDate are available
import { SIZE_CLASSES, getProgressSteps, getStepStatusColor, formatDate } from '../../../src/config/UserData/orderProgressData'; 
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrderProgress: React.FC<OrderProgressProps> = ({
  order,
  showPercentage = true,
  showTimeline = true,
  size = 'md',
  className = ''
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const steps = getProgressSteps(order);
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const activeStep = steps.find(s => s.status === 'active');
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    // 1. زيادة حجم ومسافات الكارت الرئيسية (p-4 -> p-6)
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 ${className} w-full`}> 
      
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3> {/* زيادة حجم العنوان */}
            <p className="text-sm text-gray-500 truncate">{order.patientName}</p>
          </div>
          {showPercentage && (
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#E4B441] to-[#D4AF37] bg-clip-text text-transparent">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-900">Progress</span>
          <span className="text-xs font-medium text-gray-600">{completedSteps}/{steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="bg-gradient-to-r from-[#E4B441] to-[#D4AF37] h-2 rounded-full"
          />
        </div>
      </div>

      {/* Active Step - 2. تحسين حجم ومسافات الخطوة النشطة (p-3 -> p-4) */}
      {activeStep && (
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-3"> {/* زيادة المسافة الفاصلة (gap-2 -> gap-3) */}
              {/* تكبير الأيقونة (w-8 h-8 -> w-10 h-10) */}
              <div className="w-10 h-10 bg-gradient-to-br from-[#E4B441] to-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <activeStep.icon className="w-5 h-5 text-white" /> {/* تكبير الأيقونة الداخلية */}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-amber-900 text-sm mb-0.5"> {/* زيادة حجم النص */}
                  {activeStep.name}
                </h4>
                <p className="text-xs text-amber-700 line-clamp-1">{activeStep.description}</p>
                {activeStep.estimatedCompletion && (
                  <p className="text-xs text-amber-600 mt-1">
                    Est: {formatDate(activeStep.estimatedCompletion)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 3. استبدال التايم لاين بالنمط الأفقي الجديد (Horizontal Stepper) */}
      {showTimeline && (
        <div className="pt-4">
          <h4 className="font-bold text-gray-900 mb-6 text-base">
            Process Timeline
          </h4>
          
          <div className="flex items-start justify-between w-full overflow-x-auto pb-4 gap-4">
            {steps.map((step, index) => {
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";
              const isLastStep = index === steps.length - 1;

              // الألوان المطلوبة: أخضر زاهٍ للمكتمل، أزرق فيروزي للنشط/القادم
              const colorScheme = isCompleted
                ? "from-emerald-400 to-green-600" // الأخضر الزاهي
                : isActive
                ? "from-sky-400 to-cyan-500 animate-pulse" // الأزرق الفيروزي النشط
                : "from-sky-300 to-cyan-400"; // الأزرق الفيروزي للقادم
              
              const iconTextColor = "text-white"; // أيقونة بيضاء لتباين أفضل

              const connectorColor = isCompleted 
                  ? "border-green-400" 
                  : isActive 
                  ? "border-blue-400" 
                  : "border-gray-300";

              return (
                <React.Fragment key={step.id}>
                  {/* Step Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center flex-shrink-0 w-24" // حجم عمود الخطوة
                  >
                    {/* Icon Circle (الحجم w-16 h-16) */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl mb-3 cursor-pointer
                          bg-gradient-to-br ${colorScheme}`}
                    >
                      <step.icon
                          className={`w-7 h-7 ${iconTextColor}`}
                      />
                    </div>

                    {/* Title */}
                    <h5
                      className={`font-semibold text-xs text-center line-clamp-2 ${
                        isCompleted || isActive
                          ? "text-gray-900"
                          : "text-gray-600"
                      }`}
                    >
                      {step.name}
                    </h5>

                    {/* Timestamp below title (اختياري) */}
                    {step.timestamp && isCompleted && (
                      <p className="text-[10px] text-green-600 font-medium mt-0.5">
                        {formatDate(step.timestamp).split(' ')[0]}
                      </p>
                    )}
                  </motion.div>

                  {/* Connecting Line (Dashed) */}
                  {!isLastStep && (
                    <div className="flex-grow h-px mt-8 mx-0">
                      <div className={`border-t-2 border-dashed ${connectorColor}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProgress;