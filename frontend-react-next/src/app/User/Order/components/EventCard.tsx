/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Event } from "@/types";

interface EventCardProps {
	event: Event;
	index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
	// Color mapping for event categories
	const getCategoryColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "workshop":
				return "bg-blue-500 text-white border-blue-600";
			case "symposium":
				return "bg-indigo-500 text-white border-indigo-600";
			case "masterclass":
				return "bg-emerald-500 text-white border-emerald-600";
			default:
				return "bg-gray-500 text-white border-gray-600";
		}
	};

	return (
		<div className="group relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden hover:shadow-lg">
			<div className="relative">
				<img
					src={event.image}
					alt={event.title}
					className="w-full h-48 object-cover"
				/>
				<div className="absolute top-3 right-3 bg-white text-gray-800 font-medium text-sm px-3 py-1 rounded-md shadow-sm">
					{new Date(event.date).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					})}
				</div>
				<div
					className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-medium border ${getCategoryColor(
						event.category
					)}`}
				>
					{event.category}
				</div>
			</div>

			<div className="p-5">
				<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
					{event.title}
				</h3>

				<p className="text-gray-600 text-sm mb-4 line-clamp-2">
					{event.description}
				</p>

				{/* Speaker Info */}
				<div className="flex items-center gap-2 mb-3">
					<svg
						className="w-4 h-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
					<span className="text-gray-600 text-sm">
						{event.speaker?.name || "TBA"}
					</span>
				</div>

				{/* Location Info */}
				<div className="flex items-center gap-2 mb-4">
					<svg
						className="w-4 h-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span className="text-gray-600 text-sm">{event.venue || "TBA"}</span>
				</div>

				{/* Action Buttons */}
				<div className="pt-3 border-t border-gray-100">
					<div className="flex gap-2">
						<button className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
							Register Now
						</button>
						<button className="flex-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
							Not Interested
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
