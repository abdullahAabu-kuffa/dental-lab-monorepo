"use client";

import React from "react";
import { Package, CheckCircle2, XCircle } from "lucide-react";
import { Invoice } from "@/hooks/useAuth";
interface DetailsInvoiceProps {
	invoice: Invoice;
}

export const DetailsOrder: React.FC<DetailsInvoiceProps> = ({ invoice }) => {
	const isPaid = invoice.status === "PAID";
	const statusBadge = isPaid
		? "bg-green-100 text-green-700 border border-green-300/50"
		: "bg-red-100 text-red-700 border border-red-300/50";

	const formatDate = (dateStr: string) =>
		new Date(dateStr).toLocaleDateString();

	return (
		<div className="space-y-6">
			<div className="bg-linear-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/50">
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-linear-to-br from-purple-500 to-violet-600 rounded-xl">
						<Package className="w-5 h-5 text-white" />
					</div>
					<h3 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
						Invoice Details
					</h3>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
					<div className="lg:col-span-2 space-y-5">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div className="group">
								<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
									Invoice ID
								</label>
								<p className="text-sm font-bold text-slate-800 mt-1">
									{invoice.id}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
									Client ID
								</label>
								<p className="text-sm font-bold text-slate-800 mt-1">
									{invoice.clientId}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
									Status
								</label>
								<p
									className={`text-sm font-bold inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusBadge}`}
								>
									{isPaid ? (
										<CheckCircle2 className="w-3.5 h-3.5" />
									) : (
										<XCircle className="w-3.5 h-3.5" />
									)}
									{invoice.status}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
									Created At
								</label>
								<p className="text-sm font-bold text-slate-800 mt-1">
									{formatDate(invoice.createdAt)}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
									Due Date
								</label>
								<p className="text-sm font-bold text-slate-800 mt-1">
									{formatDate(invoice.dueDate)}
								</p>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
									Total Price
								</label>
								<p className="text-sm font-bold text-slate-800 mt-1">
									${invoice.totalPrice}
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="text-sm font-bold text-slate-700 mb-4">
							Invoice Timeline
						</h4>
						<div className="group">
							<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
								Paid At
							</label>
							<p className="text-sm font-bold text-slate-800 mt-1">
								{invoice.paidAt ? formatDate(invoice.paidAt) : "Not paid yet"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
