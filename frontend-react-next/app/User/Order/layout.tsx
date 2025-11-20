// app/User/Order/layout.tsx
import { Toaster } from "react-hot-toast";
export default function UserOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "80px", 
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {children}
    </div>
  );
}
