"use client";

import React from "react";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Order } from "@/types";
import {
	getStatusColors,
	getUrgencyColors,
} from "../../../../design-system/orderStyles";
import { formatDate } from "@/utils/formatDate";
import UniversalStatusCard from "../../../Component/UniCard";

interface OrderCardProps {
	order: Order;
	isSelected?: boolean;
	onClick?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
	order,
	isSelected = false,
	onClick,
}) => {
	const statusColors = getStatusColors(order.status);
	const urgencyColors = getUrgencyColors(order.urgency);

	const getStatusDisplay = (status: string) => {
		switch (status.toLowerCase()) {
			case "in progress":
				return "In Progress";
			case "completed":
				return "Completed";
			case "pending":
				return "Pending";
			case "cancelled":
				return "Cancelled";
			default:
				return status;
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "in progress":
				return <Clock className="w-6 h-6" />;
			case "completed":
				return <CheckCircle2 className="w-6 h-6" />;
			case "pending":
				return <AlertCircle className="w-6 h-6" />;
			case "cancelled":
				return <AlertCircle className="w-6 h-6" />;
			default:
				return <Package className="w-6 h-6" />;
		}
	};

	const getPatientName = () => {
		return order.patientName || order.options?.patientName || "Unknown Patient";
	};

	return (
		<UniversalStatusCard
			title={getPatientName()}
			subtitle={`#${order.id} • ${order.orderType}`}
			icon={getStatusIcon(order.status)}
			statusLabel={getStatusDisplay(order.status)}
			statusBadgeClass={statusColors.badge}
			urgency={order.urgency}
			urgencyClass={urgencyColors.text}
			footer={formatDate(
				typeof order.createdAt === "string"
					? order.createdAt
					: order.createdAt.toISOString()
			)}
			isSelected={isSelected}
			selectedCardClass={statusColors.card}
			selectedIconClass={statusColors.icon}
			onClick={onClick}
			// paymentStatus={order.paymentStatus}
		/>
	);
};
