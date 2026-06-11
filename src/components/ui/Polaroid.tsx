import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PolaroidProps {
  image: string;
  caption?: string;
  rotation?: number;
  className?: string;
  delay?: number;
  tapeColor?: string;
  children?: ReactNode;
}

export function Polaroid({
  image,
  caption,
  rotation = 0,
  className = '',
  delay = 0,
  tapeColor = 'bg-scrapbook-beige',
  children,
}: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation * -0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{
        scale: 1.05,
        rotate: rotation + 3,
        transition: { duration: 0.3 },
      }}
      className={`relative inline-block ${className}`}
    >
      {/* Washi tape */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3 }}
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeColor} tape-shadow z-10`}
        style={{
          transform: 'translateX(-50%) rotate(-5deg)',
          background: tapeColor.includes('bg-')
            ? undefined
            : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }}
      />

      {/* Polaroid frame */}
      <div className="bg-white p-3 pb-12 polaroid-shadow rounded-sm">
        <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
          {children || (
            <img
              src={image}
              alt={caption || 'Polaroid memory'}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="absolute bottom-4 left-0 right-0 text-center font-caveat text-lg text-gray-600 px-4">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
