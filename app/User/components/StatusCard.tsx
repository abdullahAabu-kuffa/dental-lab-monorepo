// app/User/Order/components/StatusCard.tsx
"use client";

import React from 'react';
import { ORDER_COLORS, CARD_STYLES, TEXT_STYLES } from '../../design-system/orderStyles';
import { ICON_MAP } from '../../src/utils/UnifiedIcons';

interface StatusBadgeProps {
  status: 'In Progress' | 'Completed' | 'Pending Approval' | 'Rejected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    'In Progress': { ...ORDER_COLORS.inProgress, icon: ICON_MAP.inProgress },
    'Completed': { ...ORDER_COLORS.completed, icon: ICON_MAP.completed },
    'Pending Approval': { ...ORDER_COLORS.pending, icon: ICON_MAP.pending },
    'Rejected': { ...ORDER_COLORS.rejected, icon: ICON_MAP.rejected }
  };

  const config = statusMap[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

interface StatusCardProps {
  orderId: string;
  patientName: string;
  date: string;
  type: string;
  material: string;
  price: string;
  status: 'In Progress' | 'Completed' | 'Pending Approval' | 'Rejected';
  isSelected?: boolean;
  onClick?: () => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  orderId,
  patientName,
  date,
  type,
  material,
  price,
  status,
  isSelected = false,
  onClick
}) => {
  const statusMap = {
    'In Progress': ORDER_COLORS.inProgress,
    'Completed': ORDER_COLORS.completed,
    'Pending Approval': ORDER_COLORS.pending,
    'Rejected': ORDER_COLORS.rejected
  };

  const indicatorColor = statusMap[status].bg;

  return (
    <div
      onClick={onClick}
      className={`
        ${CARD_STYLES.base}
        ${CARD_STYLES.hover}
        bg-white
        ${isSelected ? CARD_STYLES.selected : CARD_STYLES.unselected}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${indicatorColor}`} />
          <span className="text-blue-600 font-semibold text-sm">{orderId}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Patient Info */}
      <h3 className="font-bold text-gray-900 mb-1">{patientName}</h3>
      <p className={TEXT_STYLES.label + ' mb-3'}>{date}</p>

      {/* Details Grid */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className={TEXT_STYLES.label}>Type:</span>
          <span className={TEXT_STYLES.value}>{type}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className={TEXT_STYLES.label}>Material:</span>
          <span className={TEXT_STYLES.value}>{material}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className={TEXT_STYLES.label}>Price:</span>
          <span className={TEXT_STYLES.price}>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;