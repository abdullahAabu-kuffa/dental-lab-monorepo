import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Dashboard - Avanté Dental Lab',
  description: 'User dashboard for managing orders and appointments',
};

export default function UserOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}