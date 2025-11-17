'use client';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    const scrollAmount = 650; // Scroll by 650px
    
    if (isBottom) {
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Scroll down by 100px
      window.scrollTo({
        top: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <button
        onClick={handleScroll}
        className="text-[#D4AF37] transition-colors hover:text-[#B8941F] cursor-pointer bg-transparent border-none p-0"
        aria-label={isBottom ? "Scroll to top" : "Scroll to bottom"}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isBottom ? <ChevronUp className="w-12 h-12" /> : <ChevronDown className="w-12 h-12" />}
        </motion.div>
      </button>
    </div>
  );
}