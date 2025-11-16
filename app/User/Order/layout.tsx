// app/User/Order/layout.tsx
"use client";
export default function UserOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <div className="user-order-layout">
      {children}
    </div>
  );
}