import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';
import { FairyLights } from '../components/ui/FairyLights';
import { Sticker } from '../components/ui/Sticker';
import { Envelope } from '../components/Envelope';
import { Confetti } from '../components/CelebrationEffects';

interface HeroSectionProps {
  onBeginJourney: () => void;
}

export default function HeroSection({ onBeginJourney }: HeroSectionProps) {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBeginJourney = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onBeginJourney();
    }, 1500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-scrapbook-cream via-white to-scrapbook-blush/30"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-scrapbook-sage/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Fairy lights at top */}
      <FairyLights className="top-0" />

      {!showEnvelope ? (
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Sticker decorations */}
          <div className="absolute -top-8 -left-4 md:left-0">
            <Sticker delay={0.5} rotation={-15} color="scrapbook-sage">
              <Sparkles className="w-5 h-5 text-gray-700" />
            </Sticker>
          </div>

          <div className="absolute -top-4 -right-4 md:right-10">
            <Sticker delay={0.7} rotation={12} color="scrapbook-lavender">
              <Star className="w-5 h-5 text-gray-700" />
            </Sticker>
          </div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="font-caveat text-2xl md:text-3xl text-scrapbook-rose mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              CHAPTER 1
            </motion.p>

            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4 leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                The Story of
              </motion.span>{' '}
              <motion.span
                className="block bg-gradient-to-r from-scrapbook-rose via-scrapbook-sage to-scrapbook-lavender bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                Gayatri Devi Reddy
              </motion.span>
            </h1>

            <motion.p
              className="font-cormorant text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              A personalized scrapbook adventure created especially for you
            </motion.p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-scrapbook-rose" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-scrapbook-rose fill-scrapbook-rose" />
            </motion.div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-scrapbook-rose" />
          </motion.div>

          {/* CTA */}
          <motion.button
            onClick={() => setShowEnvelope(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#1F2A44',
              color: '#FAF6F1',
              border: 'none',
              borderRadius: '9999px',
              padding: '16px 36px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(31,42,68,0.2)',
            }}
          >
            <span>Begin The Journey</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      ) : (
        <Envelope
          onOpen={handleBeginJourney}
          message="Ready to discover what's waiting for you, Gayatri?"
          buttonText="Let's Begin!"
        />
      )}

      <Confetti show={showConfetti} />
    </section>
  );
}
