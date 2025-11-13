'use client';
import { motion } from 'framer-motion';
import { Upload, ActivitySquare } from 'lucide-react';
import Button from '../../atoms/Button/Button';

const ctaButtons = [
  { 
    icon: Upload, 
    text: 'Upload Your Case Now', 
    variant: 'primary' as const,
    ariaLabel: 'Upload your dental case'
  },
  { 
    icon: ActivitySquare, 
    text: 'Track Manufacturing Process', 
    variant: 'secondary' as const,
    ariaLabel: 'Track your case manufacturing status'
  },
];

export default function HeroCTAButtons() {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 w-full sm:w-auto px-4 sm:px-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      {ctaButtons.map(({ icon: Icon, text, variant, ariaLabel }) => (
        <Button 
          key={text} 
          variant={variant}
          className="w-full sm:w-auto"
          aria-label={ariaLabel}
        >
          <span className="flex items-center justify-center gap-2">
            <Icon className="w-5 h-5" />
            <span>{text}</span>
          </span>
        </Button>
      ))}
    </motion.div>
  );
}