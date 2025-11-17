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

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div
        className="text-[#D4AF37] transition-colors pointer-events-none"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'default'
        }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isBottom ? <ChevronUp className="w-12 h-12" /> : <ChevronDown className="w-12 h-12" />}
        </motion.div>
      </div>
    </div>
  );
}