import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StickerProps {
  children: ReactNode;
  rotation?: number;
  delay?: number;
  className?: string;
  color?: string;
}

export function Sticker({
  children,
  rotation = 0,
  delay = 0,
  className = '',
  color = 'scrapbook-blush',
}: StickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.2,
        rotate: rotation + 10,
        transition: { duration: 0.2 },
      }}
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 bg-${color} shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}
