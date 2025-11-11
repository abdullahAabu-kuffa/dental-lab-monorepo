'use client';

import { motion } from 'framer-motion';
import { componentStyles } from '../../../../design-system';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 
    | 'primary'
    | 'secondary'
    | 'whiteBlackHover'
    | 'yellowTextHoverBlack'
    | 'whiteBgYellowTextHoverBlack'
    | 'beigeSolid'
    | 'beigeOutline';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  style,
}: ButtonProps) {
  const buttonClass = componentStyles.buttons[variant] || componentStyles.buttons.primary;

  return (
    <motion.button
      onClick={onClick}
      className={`${buttonClass} ${className}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
