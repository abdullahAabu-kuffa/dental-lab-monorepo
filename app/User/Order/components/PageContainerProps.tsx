"use client";

import React from 'react';
import { gradients, AnimatedBackground } from '../../../design-system';
import { SidebarIcons } from './SidebarIcons';

interface PageContainerProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  onNewOrder?: () => void;
  onTrackOrder?: () => void;
  onShowOrdersTable?: () => void;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  showSidebar = true,
  onNewOrder,
  onTrackOrder,
  onShowOrdersTable
}) => {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: gradients.lightBg }}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Sidebar Icons */}
      {showSidebar && (
        <SidebarIcons
          onNewOrder={onNewOrder}
          onTrackOrder={onTrackOrder}
          onShowOrdersTable={onShowOrdersTable}
        />
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${showSidebar ? 'p-4 pl-32' : 'p-4'}`}>
        {children}
      </div>
    </div>
  );
};