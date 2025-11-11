'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { motionVariants } from '../../../../../design-system/animations';
import { gradients } from '../../../../../design-system/gradients';
interface HeroLogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  delay?: number;
}

export default function HeroLogo({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  delay = 0
}: HeroLogoProps) {
  return (
    <motion.div
      className="text-center" 
      {...motionVariants.fadeInDown(delay)}
    >
      <div className="inline-block relative">
        <motion.div
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} mx-auto relative z-10`}
            priority
          />
        </motion.div>

        <motion.div
          className="mt-6 mx-auto"
          style={{
            width: '70%',
            height: '2px',
            background: gradients.goldUnderline,
            opacity: 0.6
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: delay + 0.6 }}
        />
      </div>
    </motion.div>
  );
}
