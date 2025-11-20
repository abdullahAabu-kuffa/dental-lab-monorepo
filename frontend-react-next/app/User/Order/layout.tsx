// app/User/Order/layout.tsx

export default function UserOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="w-full">
        {children}
      </div>
  );
}