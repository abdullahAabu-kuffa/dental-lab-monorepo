import React from "react";

interface NotificationCardProps {
	title: string;
	message: string;
	isRead: boolean;
	createdAt?: string;
	onClick?: () => void;
	onDelete?: () => void;
}

export default function NotificationCard({
	title,
	message,
	isRead,
	createdAt,
	onClick,
	onDelete,
}: NotificationCardProps) {
	return (
		<div
			className={[
				"rounded-xl border px-4 py-3 transition-all cursor-pointer",
				"shadow-md hover:shadow-lg",
				isRead
					? "bg-[#2A2A2A] border-[#3A3A3A]"
					: "bg-[#2A2A2A]/90 border-[#E4B441]/40 shadow-gold",
			].join(" ")}
			onClick={onClick}
		>
			{/* Header */}
			<div className="flex justify-between items-start">
				<p className="text-sm font-semibold text-[#FFD700]">{title}</p>

				{!isRead && (
					<span className="h-2.5 w-2.5 rounded-full bg-[#FFD700] shadow-gold"></span>
				)}
			</div>

			{/* Message */}
			<p className="text-xs text-[#D0D0D0] mt-1 leading-relaxed">{message}</p>

			{/* Timestamp */}
			{createdAt && (
				<p className="text-[10px] text-[#8C8C8C] mt-2">
					{new Date(createdAt).toLocaleString()}
				</p>
			)}

			{/* Delete Button */}
			{onDelete && (
				<div className="flex justify-end mt-2">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onDelete();
						}}
						className="text-[11px] text-red-400 hover:text-red-300"
					>
						Delete
					</button>
				</div>
			)}
		</div>
	);
}
