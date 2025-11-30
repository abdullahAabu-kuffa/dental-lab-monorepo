'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function NavLink({ href, icon: Icon, children }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className="relative flex items-center gap-2 text-gray-800 font-medium group px-2 py-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon*/}
      <Icon 
        className="w-5 h-5 transition-colors duration-300" 
        style={{ 
          color: isHovered ? "#d4a037ff" : "currentColor",
        }}
      />

      {/* Text */}
      <motion.span
        animate={{
          color: isHovered ? "#000000" : "#1f2937",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Animated Underline*/}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#a07916]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </motion.a>
  );
}