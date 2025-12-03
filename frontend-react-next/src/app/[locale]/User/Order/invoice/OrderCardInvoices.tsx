"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, CheckCircle2, XCircle } from "lucide-react";
import { Invoice } from "@/app/[locale]/User/Order/invoice/page";

interface OrderCardInvoicesProps {
	invoices: Invoice;
	isSelected?: boolean;
	onClick?: () => void;
}

export const OrderCardInvoices: React.FC<OrderCardInvoicesProps> = ({
	invoices,
	isSelected = false,
	onClick,
}) => {
	if (!invoices) return null;

	const isPaid = invoices.status === "PAID";

	const getCardStyles = () => {
		if (isSelected) {
			return isPaid
				? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 shadow-lg shadow-green-100/50 dark:shadow-green-900/20"
				: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-300 dark:border-red-700 shadow-lg shadow-red-100/50 dark:shadow-red-900/20";
		}
		return "bg-white/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600";
	};

	const getBadgeStyles = () =>
		isPaid
			? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-300/50 dark:border-green-700/50"
			: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-300/50 dark:border-red-700/50";

	return (
		<motion.div
			onClick={onClick}
			className={`flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${getCardStyles()}`}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<div
				className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
					isSelected
						? isPaid
							? "bg-green-100 text-green-600"
							: "bg-red-100 text-red-600"
						: "bg-slate-100 text-slate-600"
				}`}
			>
				<Wallet className="w-6 h-6" />
			</div>

			<div className="flex-1 min-w-0">
				<p className="font-bold text-base truncate">{`Invoice #${invoices.id}`}</p>
				<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{`Total: $${invoices.totalPrice}`}</p>
			</div>

			<div className="flex flex-col items-end gap-1">
				<span
					className={`text-xs font-bold px-3 py-1.5 rounded-lg ${getBadgeStyles()}`}
				>
					{isPaid ? (
						<>
							<CheckCircle2 className="w-3.5 h-3.5" />
							Paid
						</>
					) : (
						<>
							<XCircle className="w-3.5 h-3.5" />
							Pending
						</>
					)}
				</span>
				<div className="whitespace-nowrap text-xs text-gray-500 mt-1">
					{new Date(invoices.createdAt).toLocaleDateString()}
				</div>
			</div>
		</motion.div>
	);
};
