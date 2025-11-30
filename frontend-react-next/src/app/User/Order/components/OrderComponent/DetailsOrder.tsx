"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Order } from "@/types";
import {
	getStatusColors,
	getUrgencyColors,
} from "../../../../design-system/orderStyles";

interface DetailsOrderProps {
	order: Order;
}

export const DetailsOrder: React.FC<DetailsOrderProps> = ({ order }) => {
	const statusColors = getStatusColors(order.status);
	const urgencyColors = getUrgencyColors(order.urgency);

	return (
		<div className="space-y-6">
			{/* Order Details Card */}
			<motion.div
				className="bg-linear-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				{/* Header */}
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-linear-to-br from-purple-500 to-violet-600 rounded-xl">
						<Package className="w-5 h-5 text-white" />
					</div>
					<h3 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
						Order Details
					</h3>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
					{/* Left Column - Main Order Details */}
					<div className="lg:col-span-2 space-y-5">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Order ID
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									#{order.id}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Patient Name
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									{order.patientName ||
										order?.options?.patientName ||
										"Unknown Patient"}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Order Type
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									{order.orderType}
								</p>
							</div>

							{/* Status - stacked vertical */}
							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Status
								</label>
								<div className="mt-1 flex flex-col gap-1">
									<p
										className={`text-sm font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusColors.badge}`}
									>
										<span
											className={`w-2 h-2 rounded-full ${statusColors.dot}`}
										></span>
										{order.status}
									</p>
								</div>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Date
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									{order?.options?.date || order.date || "Not specified"}
								</p>
							</div>

							{/* Urgency - stacked vertical */}
							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Urgency
								</label>
								<div className="mt-1 flex flex-col gap-1">
									<p className="text-sm font-bold flex items-center gap-2">
										<span
											className={`w-3 h-3 rounded-full ${urgencyColors.dot}`}
										></span>
										<span className={urgencyColors.text}>{order.urgency}</span>
									</p>
								</div>
							</div>
						</div>

						<div className="group">
							<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
								Material
							</label>
							<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
								{order?.options?.material || order.material || "Not specified"}
							</p>
						</div>

						<div className="group">
							<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
								Notes
							</label>
							<p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
								{order?.options?.notes || order.notes || "No notes available"}
							</p>
						</div>
					</div>

					{/* Right Column - Timestamps & Shipping */}
					<div className="space-y-4">
						<h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
							Order Timeline
						</h4>
						<div className="space-y-4">
							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Created At
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									{order.createdAt
										? new Date(order.createdAt).toLocaleDateString()
										: "Not specified"}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Last Updated
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									{order.updatedAt
										? new Date(order.updatedAt).toLocaleDateString()
										: "Not specified"}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									Lab
								</label>
								<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
									{order.lab}
								</p>
							</div>
						</div>

						<div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-4">
							<h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
								Shipping Info
							</h4>
							<div className="space-y-4">
								<div className="group">
									<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
										Shipping Carrier
									</label>
									<p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
										{order.shippingCarrier}
									</p>
								</div>
								<div className="group">
									<label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
										Tracking Number
									</label>
									<p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 font-mono">
										{order.trackingNumber}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
