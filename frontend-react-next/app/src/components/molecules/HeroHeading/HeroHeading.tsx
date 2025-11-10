'use client';
import { motion } from 'framer-motion';
import { typography, colors } from '../../../../design-system/variables';

export default function HeroHeading() {
  return (
    <motion.h1 
      className={`${typography.hero} text-center mb-8`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <span style={{ color: colors.text.white }}>Egypt&apos;s First </span>
      <motion.span 
        className="block text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(to right, #FFD700, #E4B441, #C39321)',
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        Digital Dental Lab
      </motion.span>
    </motion.h1>
  );
}