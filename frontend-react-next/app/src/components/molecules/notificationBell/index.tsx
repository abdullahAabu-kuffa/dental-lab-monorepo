import { useState } from "react";
import { Bell } from "lucide-react";

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
			onClick={onClick}
			aria-label="Notifications"
			style={{
				position: "relative",
				background: "transparent",
				border: "none",
				cursor: "pointer",
			}}
		>
			<Bell size={22} />

			{unreadCount > 0 && (
				<span
					style={{
						position: "absolute",
						top: "-4px",
						right: "-4px",
						background: "red",
						color: "white",
						borderRadius: "50%",
						padding: "2px 6px",
						fontSize: "20px",
					}}
				>
					{unreadCount}
				</span>
			)}
		</button>
	);
}
