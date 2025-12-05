import React from "react";

interface NotificationBadgeProps {
	count: number;
}

export default function NotificationBadge({ count }: NotificationBadgeProps) {
	if (count <= 0) return null;

	return (
		<span className="absolute -top-1 -right-1 min-w-[18px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-semibold text-white shadow-sm">
			{count > 9 ? "9+" : count}
		</span>
	);
}
