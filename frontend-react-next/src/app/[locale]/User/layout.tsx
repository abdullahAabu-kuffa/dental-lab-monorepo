"use client";
import React from "react";


export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1 w-full ">{children}</main>
		</div>
	);
}
