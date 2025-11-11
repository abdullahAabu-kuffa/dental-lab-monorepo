'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import HeroText from '../../../atoms/HeroText/HeroText';

export default function HighlightBadge() {
  return (
    <motion.div 
      className="flex items-center justify-center gap-3 mb-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Zap 
          className="w-8 h-8"
          style={{ color: '#FFD700', fill: '#FFD700' }}
        />
      </motion.div>
      <HeroText
        text="The only lab in Egypt with a fully digital workflow"
        className="font-bold text-xl md:text-2xl"
        style={{ color: '#E4B441' }}
        delay={0}
      />
    </motion.div>
  );
}