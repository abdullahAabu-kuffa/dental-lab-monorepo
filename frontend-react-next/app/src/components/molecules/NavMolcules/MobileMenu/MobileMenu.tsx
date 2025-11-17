'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, getIcon } from '../../../../utils/UnifiedIcons';
import type { LucideIcon } from 'lucide-react';
import NavLink from '../NavLink/NavLink';
import Button from '../../../atoms/Button/Button';
import { LEGACY_NAV_ITEMS as NAV_ITEMS } from '../../../../config/LandingData/navigation';

interface MobileMenuProps {
  navItems?: typeof NAV_ITEMS;
  onClose?: () => void;
}

const MobileMenu = memo(function MobileMenu({ navItems = NAV_ITEMS, onClose }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onClose && !isOpen) onClose();
  };

  const closeMenu = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className="lg:hidden text-gray-800 relative z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              style={{ top: '0', left: '0', right: '0', bottom: '0', zIndex: 40 }}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white lg:hidden"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ zIndex: 50 }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                </div>
                
                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {navItems.map((item, index) => {
                      const IconComponent = getIcon(item.icon) as LucideIcon;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 50, opacity: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <div className="transform hover:translate-x-[-4px] transition-transform duration-200" onClick={handleNavClick}>
                            <NavLink href={item.href} icon={IconComponent}>
                              {item.label}
                            </NavLink>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Footer Buttons */}
                <motion.div 
                  className="p-6 border-t border-gray-200 space-y-3"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button variant="whiteBlackHover" className="w-full" onClick={handleNavClick}>Login</Button>
                  <Button variant="primary" className="w-full" onClick={handleNavClick}>Get Started</Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

export default MobileMenu;