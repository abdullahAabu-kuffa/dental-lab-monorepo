// app/User/Order/layout.tsx
import { requireRole } from "@/lib/dal/session";
import { Toaster } from "react-hot-toast";


export default async function UserOrderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireRole(["CLIENT","ADMIN", "OWNER"]);
	return (
		<div className="w-full relative min-h-screen">
			{/* Fixed User Profile Dropdown - positioned at top right with high z-index */}

			{/* Toaster for notifications */}
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: "#333",
						color: "#fff",
					},
				}}
			/>

			{/* Page content - no padding at top to avoid overlap */}
			<div className="w-full px-4 md:px-8 lg:px-12 pt-4">{children}</div>
		</div>
	);
}
