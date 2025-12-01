"use client";
import React from "react";
import { motion } from "framer-motion";
import {
	motionVariants,
	componentStyles,
	welcomePageAnimations,
} from "../../design-system";
import { User, Crown } from "@/utils/UnifiedIcons";
import { USER_PROCESS_STEPS } from "@/config/UserData/orderDataService";
import { WelcomePageProps } from "@/types";
import { useNavigation } from "@/utils/pageUtils";
import { useAuth } from "@/hooks/useAuth";

const PROCESS_STEPS = USER_PROCESS_STEPS;

const WelcomePage: React.FC<WelcomePageProps> = ({
	onStartOrder,
	onViewOrders,
	
}) => {
	const { navigateToForm, navigateToOrdersList } = useNavigation();
	const { user } = useAuth();

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
			<div className="relative w-full p-4 sm:p-6 md:p-6 space-y-12 md:space-y-16">
				<motion.div
					{...welcomePageAnimations.mainContainer}
					className="w-full flex flex-col md:flex-row md:items-center items-start gap-6 md:gap-12"
				>
					{/* Left Column */}
					<motion.div className="flex-1 text-left space-y-4 sm:space-y-6">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
							Welcome back,
						</h1>
						<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
							{user?.data?.user?.fullName}
						</h2>
						<p className="text-base sm:text-lg md:text-xl text-black max-w-full md:max-w-lg leading-relaxed">
							Your personalized dental lab management system is ready to
							streamline your practice. All updates appear live in your client
							dashboard — giving you full transparency and control over your
							cases.
						</p>

						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
							<button
								onClick={handleStartOrder}
								className={`group relative overflow-hidden ${componentStyles.buttons.primary} rounded-xl`}
							>
								<div className="flex items-center gap-2 sm:gap-3">
									<Crown className="w-4 h-4 sm:w-5 sm:h-5" />
									<span className="text-sm sm:text-base md:text-lg">
										Start New Order
									</span>
								</div>
								<div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
							</button>

							<button
								onClick={handleViewOrders}
								className={`group relative overflow-hidden ${componentStyles.buttons.whiteBlackHover} rounded-xl`}
							>
								<div className="flex items-center gap-2 sm:gap-3">
									<User className="w-4 h-4 sm:w-5 sm:h-5" />
									<span className="text-sm sm:text-base md:text-lg">
										View My Orders
									</span>
								</div>
								<div className="absolute inset-0 bg-linear-to-r from-[#D4AF37]/10 to-[#E4B441]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
							</button>
						</div>
					</motion.div>

					{/* Right Column */}
					<motion.div className="flex-1 space-y-8 sm:space-y-12">
						{/* Section 1 */}
						<div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg space-y-2 sm:space-y-4">
							<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
								1-Choose Material & Upload File
							</h3>
							<p className="text-sm sm:text-base md:text-lg text-gray-600">
								Select from our premium materials and upload your case file.
							</p>

							<div className="flex gap-6 sm:gap-8 md:gap-12 justify-start relative">
								<div className="absolute top-7 left-6 sm:left-8 md:left-8 w-2/5 h-1 sm:h-[5px] bg-linear-to-r from-[#E4B441] to-[#D4AF37] rounded-full"></div>

								{PROCESS_STEPS.slice(0, 3).map((process, index) => (
									<motion.div
										key={index}
										className="text-left relative z-10 space-y-1 sm:space-y-2"
										variants={motionVariants.processStep(index)}
									>
										<div className="mx-auto rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg bg-linear-to-br from-emerald-500 to-green-500 transition-all duration-300">
											<process.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
										</div>
										<h4 className="text-xs sm:text-sm md:text-sm font-semibold text-gray-800">
											{process.title}
										</h4>
									</motion.div>
								))}
							</div>
						</div>

						{/* Section 2 */}
						<div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg space-y-2 sm:space-y-4">
							<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
								2-Track Your Order Online
							</h3>
							<p className="text-sm sm:text-base md:text-lg text-gray-600">
								Follow your dental case from upload to delivery — every stage,
								visible in real-time.
							</p>

							<div className="flex gap-6 sm:gap-8 md:gap-12 justify-start relative">
								<div className="absolute top-7 left-6 sm:left-8 md:left-8 w-11/12 h-1 sm:h-[5px] bg-linear-to-r from-[#E4B441] to-[#D4AF37] rounded-full"></div>

								{PROCESS_STEPS.slice(3).map((process, index) => (
									<motion.div
										key={index + 3}
										className="text-left relative z-10 space-y-1 sm:space-y-2"
										variants={motionVariants.processStep(index + 3)}
									>
										<div className="mx-auto rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg bg-linear-to-br from-blue-500 to-cyan-500 transition-all duration-300">
											<process.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
										</div>
										<h4 className="text-xs sm:text-sm md:text-sm font-semibold text-gray-800">
											{process.title}
										</h4>
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
