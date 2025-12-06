"use client";

import React, { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { OrderCardInvoices } from "./OrderCardInvoices";
import { DetailsOrder } from "./DetailsOrder";
import { PaymentStatus } from "./PaymentStatus";
import PayPalButton, {
	PayPalOrderDetails,
} from "./PayPalButtonsComponentOptions";
import { Invoice } from "@/app/[locale]/dashboard/interfaces/users";
import { useTranslations } from "next-intl";

export default function PaymentPage() {
	const { user, loading } = useAuth();
	const t = useTranslations();

	// STORE INVOICES LOCALLY
	const [ordersState, setOrdersState] = useState<Invoice[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<Invoice | null>(null);

	const [showModal, setShowModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	// SYNC WHEN USER LOADS
	// useEffect(() => {
	// 	if (user?.data?.user?.invoices) {
	// 		setOrdersState(user.data.user.invoices);
	// 	}
	// }, [user]);

	const handleDetailsClick = (invoice: Invoice) => {
		setSelectedOrder(invoice);
	};

	const handlePayClick = (invoice: Invoice) => {
		setSelectedOrder(invoice);
		setShowModal(true);
	};

	// CONFIRM PAYMENT (CREDIT CARD)
	const handleConfirmPayment = (invoiceId: number) => {
		const updated = ordersState.map((order) =>
			order.id === invoiceId
				? {
						...order,
						status: "PAID",
						paymentMethod: "Credit Card",
						transactionId: "TXN" + Date.now(),
						paidAt: new Date().toISOString(),
				  }
				: order
		);

		setOrdersState(updated);
		setShowModal(false);

		if (selectedOrder?.id === invoiceId) {
			setSelectedOrder(updated.find((o) => o.id === invoiceId) || null);
		}
	};

	// PAYPAL SUCCESS
	const handlePayPalSuccess = (
		details: PayPalOrderDetails,
		invoiceId?: number
	) => {
		if (!invoiceId) return;

		const updated = ordersState.map((order) =>
			order.id === invoiceId
				? {
						...order,
						status: "PAID",
						paymentMethod: "PayPal",
						transactionId: details.id,
						paidAt: new Date().toISOString(),
				  }
				: order
		);

		setOrdersState(updated);
		setShowModal(false);
		setShowSuccessModal(true);

		if (selectedOrder?.id === invoiceId) {
			setSelectedOrder(updated.find((o) => o.id === invoiceId) || null);
		}
	};

	if (loading) return <p>{t("loading")}</p>;

	return (
		<div className="w-full min-h-screen">
			<div className="relative max-w-[1800px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
					{/* LIST */}
					<div className="lg:col-span-4 xl:col-span-3">
						<div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
							{ordersState.map((invoice, index) => (
								<div
									key={invoice.id}
									style={{ animationDelay: `${0.05 * index}ms` }}
								>
									<OrderCardInvoices
										invoices={invoice}
										isSelected={selectedOrder?.id === invoice.id}
										onClick={() => handleDetailsClick(invoice)}
									/>
								</div>
							))}
						</div>
					</div>

					{/* DETAILS */}
					<div className="lg:col-span-8 xl:col-span-9 flex gap-6">
						{selectedOrder ? (
							<>
								<div className="w-1/2">
									<DetailsOrder invoice={selectedOrder} />
								</div>
								<div className="w-1/2">
									<PaymentStatus
										order={selectedOrder}
										onPay={() => handlePayClick(selectedOrder)}
									/>
								</div>
							</>
						) : (
							<div className="w-full bg-white/50 rounded-2xl p-16 text-center border-2 border-dashed border-gray-200">
								<Wallet className="mx-auto h-16 w-16 text-gray-300 mb-4" />
								<p className="text-gray-400 text-lg font-medium">
									{t("selectOrderToViewPaymentDetails")}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* PAYMENT MODAL */}
			{selectedOrder && showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setShowModal(false)}
					></div>

					<div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-5">
						<PayPalButton
							clientId="AfHtv6qaOH3_qbLa-YHx-W7ZTLdnv5SRt5FEtgrxKvqBaWSNHyg39LP1qxpTaqNp6du5zTz8RfqGPDKU"
							amount={selectedOrder.totalPrice.toString()}
							currency="EGP"
							invoiceId={selectedOrder.id}
							onSuccess={handlePayPalSuccess}
							onError={(err) => console.error("PayPal error:", err)}
						/>
					</div>
				</div>
			)}

			{/* SUCCESS MODAL */}
			{showSuccessModal && selectedOrder && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setShowSuccessModal(false)}
					></div>

					<div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-center">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>

						<h2 className="text-2xl font-bold text-gray-900 mb-2">
							{t("paymentSuccessful")}
						</h2>

						<p className="text-gray-600 mb-4">
							{t("paymentCompletedSuccessfully")}
						</p>

						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<p className="text-sm text-gray-500">{t("amountPaid")}</p>
							<p className="text-2xl font-bold text-gray-900">
								{selectedOrder.totalPrice.toLocaleString("en-US", {
									style: "currency",
									currency: "EGP",
								})}
							</p>
						</div>

						<button
							onClick={() => setShowSuccessModal(false)}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
						>
							{t("continue")}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
