import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles as SparklesIcon, Heart } from 'lucide-react';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

export function Confetti({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      const colors = ['#E8B4B8', '#D8E2D0', '#E6E1F5', '#F8DCC8', '#F5D6D6'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: `${particle.x}vw`,
                y: '-10vh',
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: '110vh',
                rotate: particle.rotation + 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: particle.color }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

interface SparklesProps {
  show: boolean;
}

export function Sparkles({ show }: SparklesProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: 2,
              }}
              className="absolute"
            >
              <SparklesIcon className="w-6 h-6" style={{ color: '#D8A7B1' }} />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

interface StampProps {
  show: boolean;
  text: string;
  color?: string;
}

export function Stamp({ show, text, color = '#E8B4B8' }: StampProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: -15 + Math.random() * 30 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute -top-2 -right-2 z-10"
        >
          <div
            className="px-4 py-2 rounded-lg border-2 font-caveat text-lg font-bold"
            style={{
              borderColor: color,
              color: color,
              transform: 'rotate(-10deg)',
            }}
          >
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FloatingHeartsProps {
  show: boolean;
}

export function FloatingHearts({ show }: FloatingHeartsProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: '100vh',
                x: Math.random() * window.innerWidth,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: '-20vh',
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
              className="absolute"
            >
              <Heart className="w-8 h-8" style={{ color: '#D8A7B1', fill: '#D8A7B1' }} />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
