"use client";
import React from "react";
import { motion } from "framer-motion";
import { motionVariants, componentStyles, welcomePageAnimations } from "../../design-system";
import { User, Crown } from "../../src/utils/UnifiedIcons";
import { USER_PROCESS_STEPS } from "../../src/config/UserData/orderDataService";
import { WelcomePageProps } from "../../src/types";
import { useNavigation } from "../../src/utils/pageUtils";
import { useAuth } from "@/app/src/hooks/useAuth";

const PROCESS_STEPS = USER_PROCESS_STEPS;

const WelcomePage: React.FC<WelcomePageProps> = ({
  onStartOrder,
  onViewOrders,
  onNewOrder,
  onTrackOrder,
  onShowOrdersTable,
}) => {
  const { navigateToForm, navigateToOrdersList } = useNavigation();
  const { user, loading, isAuthenticated } = useAuth();

  const handleNewOrder = () => {
    navigateToForm();
    onNewOrder?.();
  };

  const handleStartOrder = () => {
    navigateToForm();
    onStartOrder?.();
  };

  const handleViewOrders = () => {
    navigateToOrdersList();
    onViewOrders?.();
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="relative w-full p-6 space-y-16">
        <motion.div
          {...welcomePageAnimations.mainContainer}
          className="w-full flex flex-col md:flex-row items-start gap-12"
        >
          {/* Left Column: Text & Buttons */}
          <motion.div className="flex-1 text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome back,
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              {user?.data.user.fullName}
            </h2>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your personalized dental lab management system is ready to streamline your practice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartOrder}
                className={`group relative overflow-hidden ${componentStyles.buttons.primary} rounded-xl`}
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5" />
                  <span>Start New Order</span>
                </div>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <button
                onClick={handleViewOrders}
                className={`group relative overflow-hidden ${componentStyles.buttons.whiteBlackHover} rounded-xl`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <span>View My Orders</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#E4B441]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Steps / Icons */}
          <motion.div className="flex-1 space-y-12">
            {/* First Section - First 3 Icons */}
            <div className="p-6 space-y-4 bg-white  ">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>1-Choose Material & Upload File</h3>
              <p className="text-gray-600 text-center mb-6 text-lg">Select from our premium materials and upload your case file.</p>
              <div className="flex justify-center gap-8 relative">
                {/* Connecting line behind icons */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 h-[5px] bg-gradient-to-r from-[#E4B441] to-[#D4AF37] rounded-full"></div>
                {PROCESS_STEPS.slice(0, 3).map((process, index) => (
                  <motion.div
                    key={index}
                    className="text-center group cursor-pointer relative z-10"
                    variants={motionVariants.processStep(index)}
                  >
                    <div className="mx-auto rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-green-500">
                      <process.icon className="text-white w-8 h-8" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mt-3">{process.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
            ,
            {/* Second Section - Remaining Icons */}
            <div className="p-6 space-y-4 bg-white ">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>2-Track Your Order Online</h3>
              <p className="text-gray-600 text-center mb-6 text-lg">Follow your dental case from upload to delivery — every stage, visible in real-time.</p>
              <div className="flex justify-center gap-8 relative">
                {/* Connecting line behind icons */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 h-[5px] bg-gradient-to-r from-[#E4B441] to-[#D4AF37] rounded-full"></div>
                {PROCESS_STEPS.slice(3).map((process, index) => (
                  <motion.div
                    key={index + 3}
                    className="text-center group cursor-pointer relative z-10"
                    variants={motionVariants.processStep(index + 3)}
                  >
                    <div className="mx-auto rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-cyan-500">
                      <process.icon className="text-white w-8 h-8" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mt-3">{process.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer note */}
        <motion.div className="text-center mt-8" {...welcomePageAnimations.footerNote}>
          <p className="text-gray-600 mb-4 text-lg">
            All updates appear live in your client dashboard — giving you full transparency and control over your cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;

