'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

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
      className="relative flex items-center gap-2 text-gray-800 font-medium group px-2 py-1"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        z: 50,
      }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 3D Background Card */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#E4B441]/10 to-[#C39321]/10 rounded-lg -z-10"
        animate={{
          scaleY: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          transformOrigin: "top",
        }}
      />

      {/* Icon with 3D Rotation */}
      <motion.div
        animate={{
          rotateY: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <Icon
          className="w-5 h-5"
          style={{
            color: isHovered ? "#E4B441" : "currentColor",
            filter: isHovered ? "drop-shadow(0 0 8px rgba(228,180,65,0.6))" : "none"
          }}
        />
      </motion.div>

      {/* Text */}
      <motion.span
        animate={{
          color: isHovered ? "#E4B441" : "#1f2937",
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Animated Underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#E4B441] to-[#C39321]"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}