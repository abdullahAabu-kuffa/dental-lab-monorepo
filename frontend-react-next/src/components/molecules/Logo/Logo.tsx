'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { animations, hoverEffects, tapEffects } from '@/app/design-system';

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/" passHref legacyBehavior>
      <motion.a
        className="relative block group cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={hoverEffects.scaleSmall}
        whileTap={tapEffects.scaleSmall}
        transition={animations.spring}
        aria-label="Go to homepage"
      >
        {/* Logo Image with 3D Effect */}
        <motion.div
          className="relative z-10"
          animate={{
            rotateY: isHovered ? 8 : 0,
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <Image
            src="/Avanté logo black.png"
            alt="Avanté Dental Lab Logo"
            width={600}
            height={200}
            priority
            className="h-24 sm:h-32 md:h-[150px] w-auto transition-all duration-300"
          />
        </motion.div>
      </motion.a>
    </Link>
  );
}