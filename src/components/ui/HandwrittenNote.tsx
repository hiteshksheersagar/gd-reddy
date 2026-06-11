import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HandwrittenNoteProps {
  children: ReactNode;
  rotation?: number;
  className?: string;
  paperColor?: string;
}

export function HandwrittenNote({
  children,
  rotation = 0,
  className = '',
  paperColor = 'bg-scrapbook-cream',
}: HandwrittenNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation * 0.3 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.02, rotate: rotation + 1 }}
      className={`relative ${className}`}
    >
      {/* Paper texture */}
      <div
        className={`${paperColor} p-6 shadow-lg rounded-sm paper-texture`}
        style={{
          boxShadow:
            '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Tape corner */}
        <div className="absolute -top-2 -right-2 w-12 h-4 bg-scrapbook-beige tape-shadow rotate-6 opacity-80" />

        {children}
      </div>
    </motion.div>
  );
}
