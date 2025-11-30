import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationBadge from "../../atoms/NotificationBadge";

interface NotificationBellProps {
	unreadCount: number;
	onClick: () => void;
}

export default function NotificationBell({
	unreadCount,
	onClick,
}: NotificationBellProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label="Notifications"
			className={[
				"relative flex h-9 w-9 items-center justify-center rounded-full",
				"border border-[#E4B441]/70 bg-[#1F1F1F]",
				"text-[#FFD700] shadow-[0_0_8px_rgba(0,0,0,0.35)]",
				"transition-transform transition-colors duration-150",
				"hover:scale-105 hover:border-[#FFD700] hover:text-[#FFE78A]",
				"focus:outline-none focus:ring-2 focus:ring-[#E4B441]/80 focus:ring-offset-2 focus:ring-offset-[#1C1C1C]",
			].join(" ")}
		>
			<Bell className="h-5 w-5" />
			<NotificationBadge count={unreadCount} />
		</button>
	);
}
