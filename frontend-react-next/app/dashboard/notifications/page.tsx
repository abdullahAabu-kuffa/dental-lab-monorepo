"use client";

import { useState } from "react";
import { useNotification } from "../services/hookes/fetch_all_notifications";
import Loading from "../_components/@loading";
import ErrorMessage from "../_components/@displayerrors";

type Notification = {
	title: string;
	message: string;
	time: string;
	category: "Orders" | "Events" | "Users";
	isRead: boolean;
};

const initialNotifications: Notification[] = [
	{
		title: "New Event: Advanced CAD Techniques",
		message: "Join our upcoming seminar on the latest in digital dentistry. Limited spaces available!",
		time: "3 mins ago",
		category: "Events",
		isRead: false,
	},
	{
		title: "Order #0056 - 01219 is Complete",
		message: "Your Zirconia Crown order is ready for pickup.",
		time: "3 mins ago",
		category: "Orders",
		isRead: false,
	},
	{
		title: "Update on Order #0056 - 01214",
		message: "The impression for your order requires clarification. Please review the attached notes.",
		time: "2 days ago",
		category: "Orders",
		isRead: false,
	},
	{
		title: "New User Registration: Dr. Smith",
		message: "A new user has registered and is pending approval.",
		time: "2 days ago",
		category: "Users",
		isRead: false,
	},
	{
		title: "Order #0056 - 01215 is Complete",
		message: "Your Implant Bridge order is ready for pickup.",
		time: "2 days ago",
		category: "Orders",
		isRead: false,
	},
];

const filters = ["Unread", "Orders", "Events", "Users"] as const;

export default function NotificationsPage() {
	const [activeFilter, setActiveFilter] = useState<"Unread" | "Orders" | "Events" | "Users">("Unread");
	const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

	//hooks to fetch notifications from backend
	const { data, isLoading, isError, error } = useNotification();
   console.log("Fetched notifications:", data);
	if (isLoading) {
		return <Loading />;
	}

	if(isError){
		return <ErrorMessage message={error.message} />;
	}

	const handleMarkAllAsRead = () => {
		const updated = notifications.map(n => ({ ...n, isRead: true }));
		setNotifications(updated);
	};
  
	const filteredNotifications = notifications.filter(n => {
		if (activeFilter === "Unread") return !n.isRead;
		return n.category === activeFilter;
	});
	
	return (

		<div className="bg-[F5F7FA]">
			<div className="p-6">
				<h1 className="text-3xl font-bold">Managements the notifications</h1>
				<p className="text-gray-600">
					Review and read the latest notifications
				</p>
				<div className="mt-6 bg-white py-7 px-20 rounded-xl shadow-md m-auto w-full">
					<div className="flex gap-3 m-6">
						{filters.map(filter => (
							<button
								key={filter}
								onClick={() => setActiveFilter(filter)}
								className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === filter ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
									}`}
							>
								{filter}
							</button>
						))}
					</div>
					<div className="flex justify-end items-center mb-4">
						<button
							onClick={handleMarkAllAsRead}
							className="px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-medium"
						>
							Mark All as Read
						</button>
					</div>
					{filteredNotifications.length === 0 ? (
						<p className="text-gray-500 text-sm">No notifications in this category.</p>
					) : (
						<div className="space-y-4">
							{filteredNotifications.map((n, i) => (
								<div
									key={i}
									className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-1/2 h-[120px]"
								>
									<h4 className="text-blue-600 font-semibold text-sm">{n.title}</h4>
									<p className="text-gray-700 text-sm mt-1">{n.message}</p>
									<div className="text-xs text-gray-400 mt-2">{n.time}</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div >
	);
}