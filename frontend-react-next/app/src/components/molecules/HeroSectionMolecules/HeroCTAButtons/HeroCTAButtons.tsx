'use client';
import { motion } from 'framer-motion';
import { Upload, ActivitySquare } from 'lucide-react';
import Button from '../../../atoms/Button/Button';

export default function HeroCTAButtons() {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <Button variant="yellowTextHoverBlack" className="group">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-white group-hover:text-black" />
          <span className="text-white group-hover:text-black">Upload Your Case Now</span>
        </div>
      </Button>
  
      <Button variant="whiteBgYellowTextHoverBlack" className="group">
        <div className="flex items-center gap-2">
          <ActivitySquare className="w-5 h-5 text-yellow-500 group-hover:text-white" />
          <span className="text-yellow-500 group-hover:text-white">Track Manufacturing Process</span>
        </div>
      </Button>
    </motion.div>
  );
}
