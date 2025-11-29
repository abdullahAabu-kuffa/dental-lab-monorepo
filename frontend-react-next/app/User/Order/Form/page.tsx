"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import OrderForm from "../components/FormComponent/OrderForm";
import PaymentSummary from "../components/FormComponent/PaymentSummary";
import { useNavigation, animations } from "../../../src/utils/pageUtils";
import { calculateSelectedServices } from "../../../src/utils/pricingService";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useOrderStore } from "@/app/src/store/createOrderStore";
import { useAuth } from "@/app/src/hooks/useAuth";

export default function NewOrderPage() {
	const { navigateToUpload } = useNavigation();
	const { formData, setFormData } = useOrderStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const router = useRouter();
	const { user, loading: userLoading } = useAuth();
	
	const handleFormDataChange = (newFormData: Record<string, unknown>) => {
		setFormData(newFormData);
	};

	const handlePayNow = async () => {
		setIsProcessingPayment(true);
		try {
			const { totalAmount } = calculateSelectedServices(formData);
			const orderData = {
				...formData,
				paymentStatus: "paid",
				paymentAmount: totalAmount,
				paymentDate: new Date().toISOString(),
			};

			console.log("Processing payment:", orderData);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			navigateToUpload();
		} catch (err) {
			console.error("Payment Error:", err);
		} finally {
			setIsProcessingPayment(false);
		}
	};

	useEffect(() => {
		if (!userLoading && user && !user.isActive) {
			Swal.fire({
				icon: "info",
				title: "Account Not Active",
				text: "You cannot create orders until your account is activated. Activation may take 1-2 days.",
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: false,
			}).then(() => {
				router.replace("/");
			});
		}
	}, [user, userLoading, router]);

	const { selectedServices, totalAmount } = calculateSelectedServices(formData);
  
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6">
			<div className="max-w-7xl mx-auto">
				<motion.div
					{...animations.fadeInUp}
					className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-4 sm:p-6 mb-4 sm:mb-6"
				>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
						Create New Order
					</h1>
					<p className="text-sm sm:text-base text-gray-600">
						Fill in the details to create a new dental order
					</p>
				</motion.div>

				{/* Responsive Layout: Stack on mobile, Side-by-side on desktop */}
				<div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
					{/* Form */}
					<div className="flex-1 min-w-0 order-2 lg:order-1">
						<OrderForm
							onSubmit={() => {}}
							isSubmitting={isSubmitting}
							onFormDataChange={handleFormDataChange}
							onContinueToUpload={() => navigateToUpload()}
						/>
					</div>

					{/* Payment Summary - Sticky on desktop, normal on mobile */}
					<div className="w-full lg:w-80 xl:w-96 flex-shrink-0 order-1 lg:order-2">
						<div className="lg:sticky lg:top-6">
							<PaymentSummary
								title="Order Summary"
								subtitle="Selected services"
								icon={<ShoppingCart className="w-5 h-5 text-white" />}
								selectedItems={selectedServices}
								totalAmount={totalAmount}
								buttonLabel="Pay Now"
								onAction={handlePayNow}
								disabled={isProcessingPayment}
								maxHeight="max-h-60 sm:max-h-80 lg:max-h-96"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}