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
  onShowOrdersTable
}) => {
  const { navigateToForm, navigateToOrdersList } = useNavigation();
  const { user } = useAuth();

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
          className="w-full flex flex-col md:flex-row md:items-center items-start gap-12"
        >
          {/* Left Column */}
          <motion.div className="flex-1 text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Welcome back,
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800" >
              {user?.data?.user?.fullName}
            </h2>
            <p className="text-xl text-black max-w-lg leading-relaxed text-xxl">
              Your personalized dental lab management system is ready to streamline your practice.
              All updates appear live in your client dashboard — giving you full transparency and control over your cases.
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

          {/* Right Column */}
          <motion.div className="flex-1 space-y-12">

            {/* Section 1 */}
            <div className="p-6 space-y-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-left">
                1-Choose Material & Upload File
              </h3>
              <p className="text-gray-600 text-left mb-6 text-lg">
                Select from our premium materials and upload your case file.
              </p>

              <div className="flex gap-12 justify-start relative">
             
                <div className="absolute top-8 left-8 w-1/3 h-[5px] bg-gradient-to-r from-[#E4B441] to-[#D4AF37] rounded-full"></div>

                {PROCESS_STEPS.slice(0, 3).map((process, index) => (
                  <motion.div
                    key={index}
                    className="text-left group cursor-pointer relative z-10 space-y-2"
                    variants={motionVariants.processStep(index)}
                  >
                    <div className="mx-auto rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl bg-gradient-to-br from-emerald-500 to-green-500 transition-all duration-300">
                      <process.icon className="text-white w-8 h-8" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800">{process.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-6 space-y-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-left">
                2-Track Your Order Online
              </h3>
              <p className="text-gray-600 text-left mb-6 text-lg">
                Follow your dental case from upload to delivery — every stage, visible in real-time.
              </p>

              <div className="flex gap-12 justify-start relative">
          
                <div className="absolute top-8 left-8 w-11/12 h-[5px] bg-gradient-to-r from-[#E4B441] to-[#D4AF37] rounded-full"></div>

                {PROCESS_STEPS.slice(3).map((process, index) => (
                  <motion.div
                    key={index + 3}
                    className="text-left group cursor-pointer relative z-10 space-y-2"
                    variants={motionVariants.processStep(index + 3)}
                  >
                    <div className="mx-auto rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 transition-all duration-300">
                      <process.icon className="text-white w-8 h-8" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800">{process.title}</h4>
                  </motion.div>
                ))}
              </div>
              
            </div>

            
     
          </motion.div>
        </motion.div>





      </div>
    </div>
  );
};

export default WelcomePage;
