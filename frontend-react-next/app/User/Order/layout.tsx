// app/User/Order/layout.tsx
import { Toaster } from "react-hot-toast";
import NavigationUserIcon from "../Component/NavigatUserIcon";

export default function UserOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {/* Reusable Navigation Icon Bar */}
      <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <NavigationUserIcon 
            className="justify-end"
            // You can customize navigation items here if needed:
            // customItems={[
            //   {
            //     icon: YourCustomIcon,
            //     label: "Custom Action",
            //     onClick: () => console.log("Custom action")
            //   }
            // ]}
            // Or hide default items:
            // showDefaultItems={false}
          />
        </div>
      </div>
      
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {children}
    </div>
  );
}
