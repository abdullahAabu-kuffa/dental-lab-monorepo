'use client';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function ScrollIndicator() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setIsBottom(window.scrollY > doc.scrollHeight - window.innerHeight - 200);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScrollTo = useCallback((targetY: number) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();
    const duration = 800; // Duration in milliseconds

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + (difference * easedProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const handleScrollClick = useCallback(() => {
    if (isBottom) {
      // Scroll to top
      smoothScrollTo(0);
    } else {
      // Scroll down by viewport height minus some padding
      const targetY = window.scrollY + (window.innerHeight * 0.8);
      smoothScrollTo(targetY);
    }
  }, [isBottom, smoothScrollTo]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <motion.button
        onClick={handleScrollClick}
        className="text-[#D4AF37] hover:text-[#B8941F] transition-colors duration-300 rounded-full p-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {isBottom ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
      </motion.button>
    </div>
  );
}