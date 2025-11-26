import React, { useEffect, useState } from "react";
const HostIP = process.env.NEXT_PUBLIC_AUTH_LOCAL_IP;
interface NotificationItem {
	id: number;
	title: string;
	message: string;
	createdAt: string;
	isRead: boolean;
}

export default function NotificationsMenu() {
	const [items, setItems] = useState<NotificationItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchNotifications() {
			try {
				const res = await fetch(
					`${HostIP}/api/notifications-test/send-welcome`,
					{
						method: "POST",
						credentials: "include",
					}
				);

				if (!res.ok) return;

				const json = await res.json();
				const data = Array.isArray(json.data) ? json.data : [json.data];

				setItems(data);
			} catch (error) {
				console.error("Failed to load notifications", error);
			} finally {
				setLoading(false);
			}
		}

		fetchNotifications();
	}, []);

	if (loading) {
		return (
			<div style={containerStyle}>
				<p style={{ fontSize: "14px" }}>Loading...</p>
			</div>
		);
	}

	return (
		<div style={containerStyle}>
			{items.length === 0 && (
				<p style={{ fontSize: "14px" }}>No notifications</p>
			)}

			{items.map((item) => (
				<div key={item.id} style={cardStyle}>
					<p style={{ fontWeight: "600", marginBottom: "4px" }}>{item.title}</p>

					<p style={{ fontSize: "14px", marginBottom: "6px" }}>
						{item.message}
					</p>

					<span style={{ fontSize: "12px", opacity: 0.6 }}>
						{new Date(item.createdAt).toLocaleString()}
					</span>
				</div>
			))}
		</div>
	);
}

const containerStyle: React.CSSProperties = {
	position: "absolute",
	top: "50px",
	right: "0px",
	width: "320px",
	background: "white",
	border: "1px solid #eee",
	borderRadius: "8px",
	padding: "12px",
	boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
	zIndex: 50,
};

const cardStyle = {
	background: "#fafafa",
	borderRadius: "6px",
	padding: "10px",
	marginBottom: "8px",
	border: "1px solid #e5e5e5",
};
