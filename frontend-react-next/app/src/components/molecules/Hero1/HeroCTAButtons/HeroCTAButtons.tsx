'use client';

import { motion } from 'framer-motion';
import { Upload, ActivitySquare } from 'lucide-react';
import Button from '../../../atoms/Button/Button';

const ctaButtons = [
  { icon: Upload, text: 'Upload Your Case Now', variant: 'solid' as const },
  { icon: ActivitySquare, text: 'Track Manufacturing Process', variant: 'outline' as const },
];

export default function HeroCTAButtons() {
  return (
   <motion.div 
  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.9, duration: 0.5 }} 
>
  {ctaButtons.map(({ icon: Icon, text, variant }) => (
    <Button 
      key={text} 
      variant={variant} 
      className="shadow-none" 
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {text}
      </div>
    </Button>
  ))}
</motion.div>
  );
}