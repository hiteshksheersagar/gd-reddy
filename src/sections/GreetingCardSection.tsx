import { motion } from 'framer-motion';
import { useState } from 'react';
import { Gift, Heart, PartyPopper } from 'lucide-react';
import { Confetti, Sparkles as SparklesEffect } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

export default function GreetingCardSection() {
  const [phase, setPhase] = useState<'gift' | 'untying' | 'opening' | 'card' | 'candle' | 'blow' | 'final'>('gift');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleRibbonClick = () => {
    setPhase('untying');
    setTimeout(() => {
      setPhase('opening');
      setTimeout(() => {
        setPhase('card');
      }, 800);
    }, 600);
  };

  const handleCandleClick = () => {
    setPhase('blow');
    setShowConfetti(true);
    setTimeout(() => {
      setShowSparkles(true);
      setTimeout(() => {
        setPhase('final');
      }, 1000);
    }, 1500);
  };

  return (
    <section
      id="greeting-card"
      className="relative py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-scrapbook-beige/30 to-scrapbook-rose/30 min-h-screen"
    >
      <FairyLights className="top-0" count={12} />

      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            FINAL CHAPTER
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800">
            The <span className="text-scrapbook-rose">Scrapbook</span> Greeting Card
          </h2>
        </motion.div>

        {/* Gift Box Phase */}
        {phase === 'gift' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer"
              onClick={handleRibbonClick}
            >
              {/* Gift box */}
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-scrapbook-rose to-scrapbook-blush rounded-2xl shadow-2xl relative">
                {/* Box lid */}
                <div className="absolute -top-4 left-0 right-0 h-8 bg-scrapbook-rose rounded-t-xl" />

                {/* Horizontal ribbon */}
                <div className="absolute top-1/2 left-0 right-0 h-12 bg-scrapbook-lavender -translate-y-1/2" />

                {/* Vertical ribbon */}
                <div className="absolute top-0 bottom-0 left-1/2 w-12 bg-scrapbook-lavender -translate-x-1/2" />

                {/* Ribbon bow */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8"
                >
                  <div className="relative">
                    <div className="w-16 h-10 bg-scrapbook-lavender rounded-full absolute -left-10" />
                    <div className="w-16 h-10 bg-scrapbook-lavender rounded-full absolute left-10" />
                    <div className="w-8 h-8 bg-scrapbook-lavender rounded-full" />
                  </div>
                  <p className="font-caveat text-sm text-white mt-2 text-center animate-pulse">
                    Click to untie
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Untying animation */}
        {phase === 'untying' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-64 h-64 mx-auto flex items-center justify-center"
            >
              <Gift className="w-24 h-24 text-scrapbook-rose animate-pulse" />
            </motion.div>
          </motion.div>
        )}

        {/* Opening Card */}
        {phase === 'opening' && (
          <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-6xl">🎁</span>
            </motion.div>
          </motion.div>
        )}

        {/* Card Content */}
        {phase === 'card' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Left Page */}
            <div className="grid md:grid-cols-2">
              <div className="p-6 md:p-8 bg-scrapbook-cream/50 border-r border-dashed border-scrapbook-rose/30">
                <p className="font-caveat text-lg text-gray-500 mb-4">From Your Scrapbook</p>

                {/* Sticker collection */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {['🎬', '🎵', '🥼', '❤️', '🌸', '☕'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: Math.random() * 20 - 10 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-2xl bg-white rounded-lg p-1 shadow-sm"
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Doodle hearts */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-scrapbook-rose fill-scrapbook-rose opacity-50" />
                </motion.div>
              </div>

              {/* Right Page */}
              <div className="p-6 md:p-8 bg-white flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-sacramento text-2xl text-gray-700 mb-4">
                    For Gayatri Devi Reddy
                  </p>

                  <p className="font-cormorant text-lg text-gray-600 mb-6 leading-relaxed">
                    On this special day, every page of your scrapbook tells a story
                    of dreams, healing, love, and beautiful memories.
                  </p>

                  {/* Candle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    onClick={handleCandleClick}
                    className="cursor-pointer relative mx-auto w-fit"
                  >
                    <div className="relative">
                      {/* Candle body */}
                      <div className="w-8 h-20 bg-gradient-to-b from-scrapbook-peach to-scrapbook-rose rounded-t-sm mx-auto" />

                      {/* Flame */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2"
                      >
                        <div className="w-4 h-8 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full" />
                      </motion.div>

                      {/* Glow */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-200/50 rounded-full blur-lg" />
                    </div>

                    <p className="font-caveat text-lg text-gray-500 mt-4 animate-pulse">
                      Click to blow the candle
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blowing Candle Effect */}
        {phase === 'blow' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="text-6xl">💨</span>
            </motion.div>
          </motion.div>
        )}

        {/* Final Message */}
        {phase === 'final' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-8"
            >
              <PartyPopper className="w-16 h-16 text-scrapbook-rose mx-auto" />
            </motion.div>

            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="font-playfair text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            >
              Happy Birthday<br />
              <span className="bg-gradient-to-r from-scrapbook-rose via-scrapbook-sage to-scrapbook-lavender bg-clip-text text-transparent">
                Gayatri Devi Reddy!
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-cormorant text-xl md:text-2xl text-gray-600 mb-8 max-w-lg mx-auto"
            >
              "May your story always be filled with beautiful chapters."
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="space-y-4"
            >
              <p className="font-sacramento text-3xl text-scrapbook-rose">
                THE END
              </p>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                💌
              </motion.div>

              <p className="font-caveat text-lg text-gray-500">
                A personalized scrapbook adventure, made with love
              </p>

              {/* All chapters summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center gap-2 mt-8"
              >
                {['📖', '🥼', '🎬', '🎵', '✨', '💌', '🎂'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + i * 0.1 }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
      <SparklesEffect show={showSparkles} />
    </section>
  );
}
