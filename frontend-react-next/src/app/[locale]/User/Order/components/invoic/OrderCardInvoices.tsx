"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, CheckCircle2, XCircle } from "lucide-react";
import { Order } from "@/types";
import { formatDate } from "@/utils/formatDate";

interface OrderCardInvoicesProps {
	order: Order;
	isSelected?: boolean;
	onClick?: () => void;
}

export const OrderCardInvoices: React.FC<OrderCardInvoicesProps> = ({
	order,
	isSelected = false,
	onClick,
}) => {
	// Use the actual paymentStatus from the order data, default to 'unpaid' if not present
	const paymentStatus = order.paymentStatus || "unpaid";
	const isPaid = paymentStatus === "paid";

	const getCardStyles = () => {
		if (isSelected) {
			if (isPaid) {
				return "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg shadow-green-100/50";
			} else {
				return "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 shadow-lg shadow-red-100/50";
			}
		}
		return "bg-white/80 border border-slate-200/50 hover:bg-white hover:border-slate-300";
	};

	const getIconStyles = () => {
		if (isSelected) {
			if (isPaid) {
				return "bg-green-100 text-green-600";
			} else {
				return "bg-red-100 text-red-600";
			}
		}
		return "bg-slate-100 text-slate-600";
	};

	const getBadgeStyles = () => {
		if (isPaid) {
			return "bg-green-100 text-green-700 border border-green-300/50";
		} else {
			return "bg-red-100 text-red-700 border border-red-300/50";
		}
	};

	return (
		<motion.div
			onClick={onClick}
			className={`flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${getCardStyles()}`}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			{/*  */}
			<div
				className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${getIconStyles()}`}
			>
				<Wallet className="w-6 h-6" />
			</div>

			<div className="flex-1 min-w-0">
				<p
					className={`font-bold text-base truncate ${
						isSelected
							? "text-slate-900"
							: "text-slate-800"
					}`}
				>
					{order.patientName}
				</p>
				<div className="flex items-center gap-2 mt-1">
					<p className="text-xs font-semibold text-slate-500">
						#{order.id}
					</p>
					<span className="text-slate-300">•</span>
					<p className="text-xs text-slate-500">
						{order.orderType}
					</p>
				</div>
			</div>

			<div className="flex flex-col items-end gap-1">
				<span
					className={`text-xs font-bold rounded-lg px-3 py-1.5 border whitespace-nowrap flex items-center gap-1.5 ${getBadgeStyles()}`}
				>
					{isPaid ? (
						<>
							<CheckCircle2 className="w-3.5 h-3.5" />
							Paid
						</>
					) : (
						<>
							<XCircle className="w-3.5 h-3.5" />
							Unpaid
						</>
					)}
				</span>
				<div className="whitespace-nowrap text-xs text-gray-500 mt-1">
					{formatDate(
						typeof order.createdAt === "string"
							? order.createdAt
							: order.createdAt.toISOString()
					)}
				</div>
			</div>
		</motion.div>
	);
};
