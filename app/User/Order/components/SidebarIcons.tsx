"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  User,
  Plus,
  Search,
  Settings,
  CheckCircle,
  Clock,
  Calendar,
  FileText,
  Activity,
  Package
} from '../../../src/utils/UserIcons';

interface SidebarIconsProps {
  className?: string;
}

export const SidebarIcons: React.FC<SidebarIconsProps> = ({ className = "" }) => {
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const router = useRouter();

  const mainNavItems = [
    {
      id: 'orders',
      icon: User,
      label: 'Orders',
      gradient: 'from-purple-500 to-pink-500',
      hasDropdown: true,
      onClick: () => {
        if (isOrdersDropdownOpen) {
          router.push('/User/Order');
        } else {
          setIsOrdersDropdownOpen(true);
        }
      }
    },
    {
      id: 'new-order',
      icon: Plus,
      label: 'New Order',
      gradient: 'from-emerald-500 to-green-500',
      onClick: () => router.push('/User/NewOrder')
    },
    {
      id: 'events',
      icon: Calendar,
      label: 'Events',
      gradient: 'from-blue-500 to-cyan-500',
      onClick: () => router.push('/User/Events')
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      gradient: 'from-gray-500 to-gray-600',
      onClick: () => router.push('/User/Settings')
    }
  ];

  const dropdownItems = [
    {
      id: 'view-orders',
      label: 'View Orders',
      icon: FileText,
      onClick: () => {
        router.push('/User/Order');
        setIsOrdersDropdownOpen(false);
      }
    },
    {
      id: 'track',
      label: 'Track Order',
      icon: Search,
      onClick: () => {
        router.push('/User/Order?tab=track');
        setIsOrdersDropdownOpen(false);
      }
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: Activity,
      onClick: () => {
        router.push('/User/Order?tab=progress');
        setIsOrdersDropdownOpen(false);
      }
    },
    {
      id: 'stats',
      label: 'Statistics',
      icon: CheckCircle,
      onClick: () => {
        router.push('/User/Order?tab=stats');
        setIsOrdersDropdownOpen(false);
      }
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Package,
      onClick: () => {
        router.push('/User/Order?tab=archive');
        setIsOrdersDropdownOpen(false);
      }
    }
  ];

  const handleDropdownItemClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`fixed left-4 top-20 z-50 flex flex-col gap-4 pt-4 ${className}`}
    >
      {/* Main Navigation Items */}
      {mainNavItems.map((item, index) => (
        <div key={item.id} className="relative">
          <motion.div
            className="group cursor-pointer flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
          >
            <div className="relative">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 ${
                item.hasDropdown && isOrdersDropdownOpen ? 'shadow-xl' : ''
              }`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Dropdown arrow for Orders */}
              {item.hasDropdown && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                  animate={{ rotate: isOrdersDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-600"></div>
                </motion.div>
              )}
            </div>
            <p className="text-xs text-gray-600 text-center mt-2 font-medium">{item.label}</p>
          </motion.div>

          {/* Orders Dropdown */}
          {item.id === 'orders' && (
            <AnimatePresence>
              {isOrdersDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-24 top-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 min-w-48"
                >
                  {dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <motion.button
                      key={dropdownItem.id}
                      onClick={() => handleDropdownItemClick(dropdownItem.onClick)}
                      className="w-full flex items-center px-3 py-2 mx-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: dropdownIndex * 0.05 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-md flex items-center justify-center mr-3">
                        <dropdownItem.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{dropdownItem.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </motion.div>
  );
};