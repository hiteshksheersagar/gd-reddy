import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WashiTapeProps {
  color?: string;
  rotation?: number;
  width?: string;
  className?: string;
  children?: ReactNode;
}

export function WashiTape({
  color = 'scrapbook-blush',
  rotation = -5,
  width = 'w-20',
  className = '',
  children,
}: WashiTapeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative ${width} h-5 bg-${color} tape-shadow ${className}`}
      style={{
        background: `linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.4) 0%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 100%
        )`,
      }}
    >
      {children}
    </motion.div>
  );
}
