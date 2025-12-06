"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle, FileText } from "@/utils/UnifiedIcons";
import { useNavigation, animations } from "@/utils/pageUtils";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import PaymentSummary from "../components/FormComponent/PaymentSummary";
import { calculateSelectedServices } from "@/utils/pricingService";
import { useOrderStore } from "@/store/createOrderStore";
import Swal from "sweetalert2";
import { useCreateOrder, useUploadFile } from "@/lib/orders";
import { useLoading } from "@/contexts/LoadingContext";
import { useTranslations } from "next-intl";

export default function UploadPage() {
	const { navigateToForm, navigateToHome } = useNavigation();
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [note, setnNote] = useState("");
	const { formData } = useOrderStore();
	const uploadMutation = useUploadFile();
	const orderMutation = useCreateOrder();
	const { setLoading } = useLoading();
	const { selectedServices, totalAmount } = calculateSelectedServices(formData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const t = useTranslations();

	console.log(formData, totalAmount, selectedServices);

	const handleSubmitOrder = async () => {
		setIsSubmitting(true);
		setLoading(true);

		// 1) Alert تأكيد
		const confirm = await Swal.fire({
			title: t("confirmYourOrder"),
			html: `
		  <div style="text-align:left; font-size:15px; line-height:1.5;">
		    <strong>${t("selectedServices")}</strong>
		    <ul>
		      ${selectedServices
						?.map(
							(m) =>
								`<li>• ${m.label} — <span style="color:#e4b441;">$${m.price}</span></li>`
						)
						.join("")}
		    </ul>

		    <br/>
		    <strong>${t("totalAmount")}</strong>
		    <span style="color:#e4b441; font-weight:600;">$${totalAmount}</span>
		    <br/><br/>
		    <strong>${t("patientName")}</strong> ${formData?.patientName || "-"} <br/>
		    <strong>${t("age")}</strong> ${formData?.date || "-"} <br/>
		    <strong>${t("notes")}</strong> ${note || t("noNotes")}
		  </div>
		`,
			icon: "info",
			showCancelButton: true,
			confirmButtonText: t("confirmOrder"),
			cancelButtonText: t("cancel"),
			confirmButtonColor: "#E4B441",
			cancelButtonColor: "#aaa",
			width: window.innerWidth < 640 ? "95%" : "500px",
		});

		if (!confirm.isConfirmed) {
			setIsSubmitting(false);
			setLoading(false);
			Swal.fire({
				icon: "info",
				title: t("orderCancelled"),
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}

		if (!uploadedFiles.length) {
			setIsSubmitting(false);
			setLoading(false);
			Swal.fire({
				icon: "warning",
				title: t("noFilesSelected"),
				text: t("pleaseUploadAtLeastOneFile"),
			});
			return;
		}

		try {
			const fileIds = [];
			for (const file of uploadedFiles) {
				const resp = await uploadMutation.mutateAsync(file);
				fileIds.push(resp?.id);
			}

			await orderMutation.mutateAsync({
				...formData,
				fileIds,
				totalPrice: totalAmount,
				options: {
					patientName: formData?.patientName,
					age: formData?.date,
					note,
					selectedServices,
				},
			});

			Swal.fire({
				icon: "success",
				title: t("orderCreatedSuccessfully"),
				showConfirmButton: false,
				timer: 1500,
			});

			navigateToHome();
		} catch (err) {
			console.error("Error submitting order:", err);
			Swal.fire({
				icon: "error",
				title: t("submissionFailed"),
				text: t("anErrorOccurred"),
			});
		} finally {
			setIsSubmitting(false);
			setLoading(false);
		}
	};

	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const handlePayNow = async () => {
		setIsProcessingPayment(true);

		try {
			const orderData = {
				...formData,
				paymentStatus: "paid",
				paymentAmount: totalAmount,
				paymentDate: new Date().toISOString(),
			};

			console.log("Processing payment:", orderData);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			navigateToHome();
		} catch (err) {
			console.error("Payment Error:", err);
		} finally {
			setIsProcessingPayment(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					{...animations.fadeInUp}
					className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-4 sm:p-6 mb-4 sm:mb-6"
				>
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
						<div className="flex items-center gap-2 sm:gap-3">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-r from-[#E4B441] to-[#D4A431] rounded-full flex items-center justify-center shrink-0">
								<Upload className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
									{t("uploadFilesAndNotes")}
								</h1>
								<p className="text-xs sm:text-sm text-gray-600">
									{t("uploadDocumentsAndAddSpecialInstructions")}
								</p>
							</div>
						</div>

						<button
							onClick={() => navigateToForm()}
							className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							{t("backToForm")}
						</button>
					</div>
				</motion.div>

				{/* Responsive Layout: Stack on mobile, Side-by-side on desktop */}
				<div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
					{/* Upload Form */}
					<div className="flex-1 min-w-0 space-y-4 sm:space-y-6 order-2 lg:order-1">
						{/* File Upload Section */}
						<motion.div
							{...animations.fadeInUp}
							transition={{ delay: 0.1 }}
							className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-4 sm:p-6"
						>
							<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
									<Upload className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
								</div>
								<div className="min-w-0 flex-1">
									<h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
										{t("uploadFiles")}
									</h2>
									<p className="text-xs sm:text-sm text-gray-500 truncate">
										{t("uploadDocumentsXRaysOrPhotos")}
									</p>
								</div>
							</div>

							<div
								className="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-[#E4B441] hover:bg-gray-50 transition-colors"
								onDragOver={(e) => {
									e.preventDefault();
								}}
								onDrop={(e) => {
									e.preventDefault();
									const files = Array.from(e.dataTransfer.files).slice(0, 5);
									setUploadedFiles(files);
								}}
								onClick={() => {
									const input = document.createElement("input");
									input.type = "file";
									input.multiple = true;
									input.accept = "image/*,.pdf,.dcm,.dicom";
									input.onchange = (e) => {
										const files = Array.from(
											(e.target as HTMLInputElement).files || []
										).slice(0, 5);
										setUploadedFiles(files);
									};
									input.click();
								}}
							>
								<Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
								<p className="text-sm sm:text-base text-gray-600 mb-2">
									{t("dragAndDropFilesHereOrClickToBrowse")}
								</p>
								<p className="text-xs sm:text-sm text-gray-500">
									{t("supportedFormats")}
								</p>
							</div>

							{/* Uploaded Files List */}
							{uploadedFiles.length > 0 && (
								<div className="mt-4 space-y-2">
									<p className="text-sm font-medium text-gray-700">
										{t("uploadedFiles")} ({uploadedFiles.length}):
									</p>
									{uploadedFiles.map((file, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
										>
											<span className="text-xs sm:text-sm text-gray-700 truncate flex-1">
												{file.name}
											</span>
											<button
												onClick={(e) => {
													e.stopPropagation();
													setUploadedFiles(
														uploadedFiles.filter((_, i) => i !== index)
													);
												}}
												className="ml-2 text-red-500 hover:text-red-700 text-xs sm:text-sm shrink-0"
											>
												{t("remove")}
											</button>
										</div>
									))}
								</div>
							)}
						</motion.div>

						{/* Notes Section */}
						<motion.div
							{...animations.fadeInUp}
							transition={{ delay: 0.2 }}
							className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-4 sm:p-6"
						>
							<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shrink-0">
									<FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
								</div>
								<div className="min-w-0 flex-1">
									<h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
										{t("notes")}
									</h2>
									<p className="text-xs sm:text-sm text-gray-500 truncate">
										{t("addAnySpecialInstructionsOrNotes")}
									</p>
								</div>
							</div>

							<textarea
								placeholder={t("writeYourNotesHere")}
								rows={6}
								value={note}
								onChange={(e) => setnNote(e.target.value)}
								className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E4B441] focus:border-[#E4B441] resize-none"
							/>
						</motion.div>

						{/* Action Buttons */}
						<motion.div
							{...animations.fadeInUp}
							transition={{ delay: 0.3 }}
							className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
						>
							<button
								onClick={() => navigateToForm()}
								className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-50 transition-all"
							>
								{t("backToForm")}
							</button>

							<button
								disabled={isSubmitting}
								onClick={() => {
									handleSubmitOrder();
								}}
								className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-linear-to-r from-[#E4B441] to-[#D4A431] text-white text-sm sm:text-base font-semibold rounded-lg hover:from-[#FFD700] hover:to-[#E4B441] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<div className="flex items-center justify-center gap-2">
									<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
									<span>
										{isSubmitting ? t("submitting") : t("submitOrder")}
									</span>
								</div>
							</button>
						</motion.div>
					</div>

					{/* Payment Summary - Sticky on desktop, normal on mobile */}
					<div className="w-full lg:w-80 xl:w-96 shrink-0 order-1 lg:order-2">
						<div className="lg:sticky lg:top-6">
							<motion.div {...animations.fadeInUp} transition={{ delay: 0.4 }}>
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
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
