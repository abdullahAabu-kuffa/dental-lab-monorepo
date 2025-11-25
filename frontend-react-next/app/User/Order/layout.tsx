// app/User/Order/layout.tsx
import { Toaster } from "react-hot-toast";
import NavigationUserIcon from "../Component/NavigatUserIcon";

export default function UserOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full relative">
      {/* Fixed Floating Navigation Icon Bar, moved down a bit */}
      <div className="fixed top-20 right-4 z-50">
        <NavigationUserIcon 
          className="flex justify-end bg-white shadow-lg rounded-full p-2"
        />
      </div>

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

      {/* Page content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
