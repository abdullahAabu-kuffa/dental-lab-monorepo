import React, { useEffect, useState, useRef } from "react";
import NotificationCard from "../../atoms/NotificationCard";
const HostIp = process.env.NEXT_PUBLIC_AUTH_LOCAL_IP;
interface ApiNotification {
	id: number;
	userId: number;
	type: string;
	title: string;
	message: string;
	data?: Record<string, unknown>;
	isRead: boolean;
	readAt?: string | null;
	emailSent: boolean;
	createdAt: string;
	updatedAt: string;
}

interface NotificationsMenuProps {
	isOpen: boolean;
	onUnreadChange?: (count: number) => void;
	onClose?: () => void;
}

export default function NotificationsMenu({
	isOpen,
	onUnreadChange,
	onClose,
}: NotificationsMenuProps) {
	const [items, setItems] = useState<ApiNotification[]>([]);
	const [loading, setLoading] = useState(true);
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				onClose?.();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);
	useEffect(() => {
		const unread = items.filter((n) => !n.isRead).length;
		onUnreadChange?.(unread);
		async function fetchNotifications() {
			try {
				const res = await fetch(
					`${HostIp}/api/notifications-test/send-welcome`,
					{
						method: "POST",
						credentials: "include",
					}
				);

				if (!res.ok) {
					setLoading(false);
					return;
				}

				const json = await res.json();
				const data = Array.isArray(json.data) ? json.data : [json.data];

				setItems(data);
				const unread = data.filter((n: ApiNotification) => !n.isRead).length;
				onUnreadChange?.(unread);
			} catch (error) {
				console.error("Failed to load notifications", error);
			} finally {
				setLoading(false);
			}
		}

		fetchNotifications();
	}, []);
	useEffect(() => {
		const unread = items.filter((n) => !n.isRead).length;
		onUnreadChange?.(unread);
	}, [items, onUnreadChange]);

	async function markAsRead(id: number) {
		setItems((prev) => {
			const target = prev.find((n) => n.id === id);
			if (!target || target.isRead) return prev;

			return prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
		});

		try {
			await fetch(`${HostIp}/api/notifications/${id}/read/`, {
				method: "PATCH",
				credentials: "include",
			});
		} catch (error) {
			console.error("Failed to mark as read", error);
		}
	}

	async function deleteNotification(id: number) {
		setItems((prev) => prev.filter((n) => n.id !== id));

		try {
			await fetch(`${HostIp}/api/notifications/${id}`, {
				method: "DELETE",
				credentials: "include",
			});
		} catch (error) {
			console.error("Failed to delete notification", error);
		}
	}

	return (
		<div
			ref={menuRef}
			className={[
				"absolute right-0 mt-3 w-96 origin-top-right rounded-2xl",
				"border border-[#3A3A3A] bg-[#1E1E1E] shadow-[0_8px_20px_rgba(0,0,0,0.35)]",
				"transition-all duration-200 z-50",
				isOpen
					? "scale-100 opacity-100 pointer-events-auto"
					: "scale-95 opacity-0 pointer-events-none",
			].join(" ")}
		>
			<div className="flex items-center justify-between px-4 py-3 border-b border-[#3A3A3A]">
				<div>
					<p className="text-sm font-semibold text-[#FFD700] tracking-wide">
						Notifications
					</p>
					<p className="text-[11px] text-[#B8B8B8]">Latest updates & alerts</p>
				</div>

				<button
					onClick={onClose}
					className="text-[#B8B8B8] hover:text-[#FFD700] transition text-lg"
				>
					✕
				</button>
			</div>

			<div className="max-h-80 overflow-y-auto p-3 custom-scroll">
				{loading ? (
					<div className="py-6 text-center text-xs text-[#A9A9A9]">
						Loading...
					</div>
				) : items.length === 0 ? (
					<div className="py-6 text-center text-xs text-[#A9A9A9]">
						No notifications
					</div>
				) : (
					<div className="flex flex-col gap-3">
						{items.map((item) => (
							<NotificationCard
								key={item.id}
								title={item.title}
								message={item.message}
								createdAt={item.createdAt}
								isRead={item.isRead}
								onClick={() => markAsRead(item.id)}
								onDelete={() => deleteNotification(item.id)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
