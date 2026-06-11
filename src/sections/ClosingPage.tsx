import { motion } from 'framer-motion';
import { BookOpen, Heart, Sparkles } from 'lucide-react';
import { FairyLights } from '../components/ui/FairyLights';

export default function ClosingPage() {
  return (
    <section
      id="closing"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-scrapbook-cream via-scrapbook-blush/20 to-scrapbook-lavender/20"
    >
      <FairyLights className="top-0" count={16} />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? 'rgba(201, 123, 138, 0.3)' : 'rgba(167, 196, 160, 0.3)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Scrapbook closing animation */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Book cover */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="bg-white rounded-2xl shadow-2xl p-12 md:p-16 relative"
            style={{
              border: '3px solid #E6DDD4',
              background: 'linear-gradient(135deg, #FAF6F1 0%, #FFFDFC 100%)',
            }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 paper-texture opacity-20 rounded-2xl" />

            {/* Decorative corner stickers */}
            <div className="absolute -top-3 -left-3 w-16 h-4 bg-scrapbook-sage rounded-full transform -rotate-12 shadow-sm" />
            <div className="absolute -top-3 -right-3 w-16 h-4 bg-scrapbook-lavender rounded-full transform rotate-12 shadow-sm" />
            <div className="absolute -bottom-3 -left-3 w-16 h-4 bg-scrapbook-rose rounded-full transform rotate-12 shadow-sm" />
            <div className="absolute -bottom-3 -right-3 w-16 h-4 bg-scrapbook-blush rounded-full transform -rotate-12 shadow-sm" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
                style={{ background: '#C97B8A' }}
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-playfair text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#C97B8A' }}
              >
                The End
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4 mb-8"
              >
                <p className="font-cormorant text-xl md:text-2xl" style={{ color: '#4B5563' }}>
                  Thank you for turning these pages.
                </p>
                <p className="font-cormorant text-xl md:text-2xl" style={{ color: '#4B5563' }}>
                  May the chapters ahead be even more beautiful.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="pt-6"
                style={{ borderTop: '2px dashed #E6DDD4' }}
              >
                <p className="font-caveat text-2xl md:text-3xl mb-4" style={{ color: '#6B7280' }}>
                  Happy Birthday,
                </p>
                <p className="font-playfair text-3xl md:text-4xl font-bold" style={{ color: '#1F2A44' }}>
                  Gayatri Devi Reddy
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="flex justify-center gap-4 mt-8"
              >
                {[Sparkles, Heart, Sparkles].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0], rotate: [-10, 10, -10] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#C97B8A' }} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Final decorative note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10"
            >
              <p
                className="font-caveat text-lg"
                style={{ color: '#9CA3AF' }}
              >
                A personalized scrapbook adventure, made with love
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
