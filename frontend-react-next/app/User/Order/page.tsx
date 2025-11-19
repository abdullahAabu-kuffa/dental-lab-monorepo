"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { motionVariants, componentStyles, welcomePageAnimations } from '../../design-system';
import { User, Crown } from '../../src/utils/UnifiedIcons';
import { USER_PROCESS_STEPS } from '../../src/config/UserData/UserProcessSteps';
import { WelcomePageProps } from '../../src/types';

const PROCESS_STEPS = USER_PROCESS_STEPS;
const WelcomePage: React.FC<WelcomePageProps> = ({
  onStartOrder,
  onViewOrders,
  onNewOrder,
  onTrackOrder,
  onShowOrdersTable
}) => {
  const router = useRouter();
  const doctorName = "Dr. Ahmed Hassan";
  // Handle New Order - navigate to form page
  const handleNewOrder = () => {
    router.push('/User/Order/Form');
    onNewOrder?.();
  };
  // Handle Start Order (main button)
  const handleStartOrder = () => {
    router.push('/User/Order/Form');
    onStartOrder?.();
  };
  const handleViewOrders = () => {
    // Navigate to orders list page
    router.push('/User/Order/orders-list');
    // Call the original onViewOrders if provided
    onViewOrders?.();
  };
  return (
    <>
      {/* Main Content Area */}
      <motion.div
        {...welcomePageAnimations.mainContainer}
        className="flex-1 max-w-4xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          {...welcomePageAnimations.heroSection}
          className="text-center"
        >
          {/* Welcome Message */}
          <motion.div
            {...welcomePageAnimations.heroMessage}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Welcome back,
            </h1>
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
              {...welcomePageAnimations.heroTitle}
            >
              {doctorName} {/* Display doctor's name */}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              {...welcomePageAnimations.heroText()}
            >
              Your personalized dental lab management system is ready to streamline your practice.
            </motion.p>
          </motion.div>
          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            {...welcomePageAnimations.actionButtons}
          >
            {/* Start New Order Button */}
            <button
              onClick={handleStartOrder}
              className={`group relative overflow-hidden ${componentStyles.buttons.primary} rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5" /> {/* Crown icon */}
                <span>Start New Order</span>
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            {/* View Orders Button */}
            <button
              onClick={handleViewOrders}
              className={`group relative overflow-hidden ${componentStyles.buttons.whiteBlackHover} rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" /> {/* User icon */}
                <span>View My Orders</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#E4B441]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-16 max-w-6xl mx-auto"
        {...welcomePageAnimations.processSection}
      >
        <div className="text-center mb-12">
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            {...welcomePageAnimations.sectionTitle}
          >
            Choose Your Material & Track Your Order Online
          </motion.h3>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            {...welcomePageAnimations.sectionSubtitle}
          >
            Follow your dental case from upload to delivery — every stage, visible in real-time.
          </motion.p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-4">
            {PROCESS_STEPS.map((process, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer relative"
                variants={motionVariants.processStep(index)} // Animate each step individually
              >
                <div className="relative mb-4">
                  <div className={`mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${process.completed
                      ? 'w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500' // Completed step style
                      : 'w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500' // Incomplete step style
                    }`}>
                    <process.icon className={`text-white ${process.completed ? 'w-10 h-10' : 'w-8 h-8'
                      }`} />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-800">{process.title}</h4>
                {/* Horizontal connecting lines for desktop */}
                {index < 7 && (
                  <div className="hidden lg:block absolute top-8 left-full w-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 z-10 transform -translate-x-2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Footer note below the steps */}
        <motion.div
          className="text-center mt-8"
          {...welcomePageAnimations.footerNote}
        >
          <p className="text-gray-600 mb-4">
            All updates appear live in your client dashboard — giving you full transparency and control over your cases.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};
export default WelcomePage; // Export component for use elsewhere
