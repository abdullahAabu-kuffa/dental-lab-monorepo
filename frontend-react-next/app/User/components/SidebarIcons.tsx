"use client";

import React from 'react';
import { Plus, Search, FileText, Home, User, Settings } from '../../src/utils/UserIcons';

interface SidebarIconsProps {
  onNewOrder?: () => void;
  onTrackOrder?: () => void;
  onShowOrdersTable?: () => void;
}

const SidebarIcons: React.FC<SidebarIconsProps> = ({
  onNewOrder,
  onTrackOrder,
  onShowOrdersTable
}) => {
  const menuItems = [
    {
      icon: Home,
      label: 'Home',
      action: () => window.location.href = '/User'
    },
    {
      icon: Plus,
      label: 'New Order',
      action: onNewOrder
    },
    {
      icon: Search,
      label: 'Track Order',
      action: onTrackOrder
    },
    {
      icon: FileText,
      label: 'Orders Table',
      action: onShowOrdersTable
    },
    {
      icon: User,
      label: 'Profile',
      action: () => window.location.href = '/User/profile'
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => window.location.href = '/User/settings'
    }
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 w-24 bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col items-center justify-center h-full py-4 space-y-6">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className="group relative p-3 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 hover:scale-105"
              title={item.label}
            >
              <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { SidebarIcons };