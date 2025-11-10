'use client';
import { motion } from 'framer-motion';
import { Upload, ActivitySquare } from 'lucide-react';
import Button from '../../atoms/Button/Button';

const ctaButtons = [
  { icon: Upload, text: 'Upload Your Case Now', variant: 'solid' as const },
  { icon: ActivitySquare, text: 'Track Manufacturing Process', variant: 'outline' as const },
];

export default function HeroCTAButtons() {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      {ctaButtons.map(({ icon: Icon, text, variant }) => (
        <Button key={text} variant={variant}>
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {text}
          </div>
        </Button>
      ))}
    </motion.div>
  );
}
