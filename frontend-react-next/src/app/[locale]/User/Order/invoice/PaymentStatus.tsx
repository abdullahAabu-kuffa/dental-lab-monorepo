"use client";

import React from "react";
import { Wallet, CreditCard } from "lucide-react";
import { Invoice } from "@/app/[locale]/dashboard/interfaces/users";

interface PaymentStatusProps {
	order: Invoice;
	onPay?: () => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
	order,
	onPay,
}) => {
	const isPaid = order.status === "PAID";

	return (
		<div className="bg-gray-50 rounded-2xl p-6 space-y-6 max-w-xl mx-auto">
			{isPaid ? (
				<div className="text-center space-y-3">
					<div className="flex justify-center">
						<Wallet className="h-12 w-12 text-green-500" />
					</div>
					<h2 className="text-green-500 text-xl font-bold">
						Payment Successful!
					</h2>
					<p className="text-gray-600">
						Your order has been placed and payment confirmed.
					</p>
					<p className="text-gray-400 text-sm">
						Transaction ID: {order.transactionId || "N/A"}
					</p>
				</div>
			) : (
				<div className="text-center space-y-4">
					{/* Payment Amount Display */}
					<div className="bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
						<div className="flex items-center justify-center space-x-2 mb-2">
							<CreditCard className="h-6 w-6 text-blue-600" />
							<span className="text-blue-800 font-semibold text-lg">
								Payment Required
							</span>
						</div>
						<div className="text-3xl font-bold text-blue-900 mb-2">
							{order.totalPrice.toLocaleString("en-US", {
								style: "currency",
								currency: "EGP",
							})}
						</div>
						<p className="text-blue-600 text-sm">
							Secure payment powered by our platform
						</p>
					</div>

					{/* Pay Now Button */}
					<button
						onClick={onPay}
						className="group relative w-full bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
					>
						<div className="flex items-center justify-center space-x-3">
							<CreditCard className="h-5 w-5 group-hover:animate-bounce" />
							<span className="text-lg">Pay Now</span>
						</div>
						<div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
					</button>

					{/* Payment Security Text */}
					<div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
						<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
							<div className="w-2 h-2 bg-white rounded-full"></div>
						</div>
						<span>256-bit SSL encryption</span>
					</div>
				</div>
			)}

			{/* Order & Payment Details */}
			<div className="bg-white rounded-2xl p-6 shadow space-y-4">
				<h3 className="text-lg font-semibold">Order & Payment Details</h3>
				<div className="grid grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
					<span className="font-medium">Order ID</span>
					<span>#{order.id}</span>

					<span className="font-medium">Total Amount</span>
					<span>
						{order.totalPrice.toLocaleString("en-US", {
							style: "currency",
							currency: "EGP",
						})}
					</span>

					<span className="font-medium">Payment Method</span>
					<span>{order.paymentMethod || "-"}</span>

					<span className="font-medium">Date of Payment</span>
					<span>
						{order.paidAt
							? new Intl.DateTimeFormat("en-GB", {
									day: "2-digit",
									month: "short",
									year: "numeric",
							  }).format(new Date(order.paidAt))
							: "-"}
					</span>

					<span className="font-medium">Payment Status</span>
					<span
						className={`px-2 py-1 rounded-full text-sm font-semibold ${
							isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
						}`}
					>
						{isPaid ? "Successful" : "Pending"}
					</span>
				</div>
			</div>
		</div>
	);
};
