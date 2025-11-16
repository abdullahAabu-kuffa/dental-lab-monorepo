"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import WelcomePage from './Order/components/WelcomePage';

// Default export for Next.js page - This is the main User welcome page
export default function Page() {
  const router = useRouter();

  const handleStartOrder = () => {
    router.push('/User/NewOrder');
  };

  const handleViewOrders = () => {
    router.push('/User/Order');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomePage
        onStartOrder={handleStartOrder}
        onViewOrders={handleViewOrders}
        onNewOrder={handleStartOrder}
      />
    </div>
  );
}
