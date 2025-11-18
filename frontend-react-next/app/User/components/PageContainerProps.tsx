"use client";

import React from 'react';
import { SidebarIcons } from '../Order/components/SidebarIst';
import { PageContainerProps } from '../../src/types';

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  showSidebar = true,
  onNewOrder,
  onTrackOrder,
  onShowOrdersTable,
  onShowStatusOrders
}) => {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* Simplified Sidebar */}
      {showSidebar && (
        <SidebarIcons
          onNewOrder={onNewOrder}
          onTrackOrder={onTrackOrder}
          onShowOrdersTable={onShowOrdersTable}
          onShowStatusOrders={onShowStatusOrders}
        />
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${showSidebar ? 'p-4 pl-24' : 'p-4'}`}>
        {children}
      </div>
    </div>
  );
};