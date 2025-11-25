"use client";
import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, Calendar, Settings, FileText, User, File, LucideIcon } from "lucide-react";
import { componentStyles } from "@/app/design-system";
import { useNavigation } from "@/app/src/utils/pageUtils";
import { useRouter } from "next/navigation";

interface NavigationItem {
  icon: LucideIcon;
  label: string;
  path?: string;
  styleClass?: string;
  onClick?: () => void;
}

interface NavigationUserIconProps {
  className?: string;
  customItems?: NavigationItem[];
  showDefaultItems?: boolean;
}

export const NavigationUserIcon: React.FC<NavigationUserIconProps> = ({ 
  className = "",
  customItems = [],
  showDefaultItems = true
}) => {
  const { navigateToForm } = useNavigation();
  const router = useRouter();

  const handleNewOrder = () => {
    navigateToForm();
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Default navigation items - kept for backwards compatibility
  const defaultNavigationItems = [
    {
      icon: User,
      label: "Orders",
      path: "/User/Order/orders-list",
      styleClass: componentStyles.statusIcons.newOrderButton,
      onClick: () => handleNavigation("/User/Order/orders-list")
    },
    {
      icon: PlusCircle,
      label: "New Order",
      styleClass: componentStyles.statusIcons.newOrderButton,
      onClick: handleNewOrder
    },
    {
      icon: Calendar,
      label: "Events",
      styleClass: componentStyles.statusIcons.eventButton,
      onClick: () => handleNavigation("/User/Order/Event")
    },
    {
      icon: FileText,
      label: "Invoices",
      styleClass: componentStyles.statusIcons.allOrdersButton,
      onClick: () => handleNavigation("/User/Order/invoice")
    },
    {
      icon: File, 
      label: "Drafts",
      styleClass: componentStyles.statusIcons.allOrdersButton,
      onClick: () => handleNavigation("/User/Order/Drafts")
    },
    {
      icon: Settings,
      label: "Settings",
      styleClass: componentStyles.statusIcons.eventButton,
      onClick: () => handleNavigation("/User/Order/Setting")
    }
  ];

  // Combine default and custom items
  const navigationItems = [
    ...(showDefaultItems ? defaultNavigationItems : []),
    ...customItems
  ];

  return (
    <div className={`flex items-center gap-3 justify-end ${className}`}>
      {navigationItems.map((item, index) => (
        <motion.button
          key={index}
          onClick={item.onClick}
          className={item.styleClass}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <div className="relative w-full h-full flex items-center justify-center rounded-full">
            <item.icon className={componentStyles.statusIcons.icon} strokeWidth={2} />
          </div>

          {/* Tooltip */}
          <div className={componentStyles.statusIcons.tooltip}>
            <span>{item.label}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default NavigationUserIcon;
