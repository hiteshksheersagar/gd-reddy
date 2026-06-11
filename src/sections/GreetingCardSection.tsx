import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Gift, Heart, PartyPopper, Stethoscope, Film, Music, Sparkles,
  BookMarked, Cake, BookOpen, Award, PenLine
} from 'lucide-react';
import { Confetti, Sparkles as SparklesEffect } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

interface GreetingCardSectionProps {
  scores: {
    doctor: number;
    movies: number;
    music: number;
    personality: number;
    discovery: number;
  };
  totalScore: number;
}

const titles = [
  { min: 90, title: "The Main Character" },
  { min: 75, title: "Dreamer & Healer" },
  { min: 60, title: "Certified Movie Lover" },
  { min: 40, title: "Story Collector" },
  { min: 0, title: "Heart Full of Music" },
];

export default function GreetingCardSection({ scores, totalScore }: GreetingCardSectionProps) {
  const [phase, setPhase] = useState<'gift' | 'untying' | 'opening' | 'card' | 'candle' | 'blow' | 'scorecard' | 'final'>('gift');
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
        setPhase('scorecard');
      }, 1000);
    }, 1500);
  };

  const handleViewFinal = () => {
    setPhase('final');
  };

  const getTitle = () => {
    for (const t of titles) {
      if (totalScore >= t.min) return t.title;
    }
    return titles[titles.length - 1].title;
  };

  const maxScores = {
    doctor: 20,
    movies: 25,
    music: 25,
    personality: 15,
    discovery: 15,
  };

  const chapterIcons = [BookOpen, Stethoscope, Film, Music, Sparkles, BookMarked, Cake];

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
          <p className="font-caveat text-xl mb-2" style={{ color: '#D8A7B1' }}>
            FINAL CHAPTER
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: '#1F2A44' }}>
            The <span style={{ color: '#D8A7B1' }}>Birthday</span> Scrapbook
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
                onClick={handleRibbonClick}
              >
                {/* Gift box */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #D8A7B1, #F5D6D6)' }}>
                  {/* Box lid */}
                  <div className="absolute -top-4 left-0 right-0 h-8 rounded-t-xl" style={{ background: '#D8A7B1' }} />

                  {/* Horizontal ribbon */}
                  <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2" style={{ background: '#D8D2F0' }} />

                  {/* Vertical ribbon */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-12 -translate-x-1/2" style={{ background: '#D8D2F0' }} />

                  {/* Ribbon bow */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8"
                  >
                    <div className="relative">
                      <div className="w-16 h-10 rounded-full absolute -left-10" style={{ background: '#D8D2F0' }} />
                      <div className="w-16 h-10 rounded-full absolute left-10" style={{ background: '#D8D2F0' }} />
                      <div className="w-8 h-8 rounded-full" style={{ background: '#D8D2F0' }} />
                    </div>
                    <p className="font-caveat text-sm text-white mt-2 text-center animate-pulse">
                      Click to untie
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {phase === 'untying' && (
            <motion.div
              key="untying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-64 h-64 mx-auto flex items-center justify-center"
              >
                <Gift className="w-24 h-24 animate-pulse" style={{ color: '#D8A7B1' }} />
              </motion.div>
            </motion.div>
          )}

          {phase === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 0.8 }}
                className="w-20 h-20 mx-auto rounded-xl flex items-center justify-center"
                style={{ background: '#D8D2F0' }}
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
          )}

          {phase === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{ border: '3px solid #E6DDD4' }}
            >
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 relative" style={{ background: '#FAF6F180' }}>
                  <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #E6DDD4 4px, #E6DDD4 8px)' }} />

                  <p className="font-caveat text-lg mb-4" style={{ color: '#6B7280' }}>From Your Scrapbook</p>

                  {/* Sticker collection */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {[Film, Music, Stethoscope, Heart, Sparkles, PenLine].map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: Math.random() * 20 - 10 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white rounded-lg p-2 shadow-sm"
                        >
                          <Icon className="w-6 h-6" style={{ color: '#D8A7B1' }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Doodle hearts */}
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8 opacity-50" style={{ color: '#D8A7B1', fill: '#D8A7B1' }} />
                  </motion.div>
                </div>

                {/* Right Page */}
                <div className="p-6 md:p-8 bg-white flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="font-sacramento text-2xl mb-4" style={{ color: '#6B7280' }}>
                      For Gayatri Devi Reddy
                    </p>

                    <p className="font-cormorant text-lg leading-relaxed mb-6" style={{ color: '#6B7280' }}>
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
                        <div className="w-8 h-20 rounded-t-sm mx-auto" style={{ background: 'linear-gradient(to bottom, #F8DCC8, #D8A7B1)' }} />

                        {/* Flame */}
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2"
                        >
                          <div className="w-4 h-8 rounded-full" style={{ background: 'linear-gradient(to top, #FB923C, #FCD34D, #FEF3C7)' }} />
                        </motion.div>

                        {/* Glow */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full blur-lg" style={{ background: '#FEF3C780' }} />
                      </div>

                      <p className="font-caveat text-lg mt-4 animate-pulse" style={{ color: '#6B7280' }}>
                        Click to blow the candle
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'blow' && (
            <motion.div
              key="blow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#E6DDD4' }}>
                  <Sparkles className="w-8 h-8" style={{ color: '#6B7280' }} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {phase === 'scorecard' && (
            <motion.div
              key="scorecard"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8" style={{ border: '3px solid #E6DDD4' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: '#D8A7B1' }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="font-playfair text-2xl font-semibold mb-6" style={{ color: '#1F2A44' }}>
                  Your Scrapbook Scorecard
                </h3>

                {/* Individual scores */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Doctor Score', score: scores.doctor, max: maxScores.doctor, icon: Stethoscope },
                    { label: 'Cinema Score', score: scores.movies, max: maxScores.movies, icon: Film },
                    { label: 'Melody Score', score: scores.music, max: maxScores.music, icon: Music },
                    { label: 'Personality Score', score: scores.personality, max: maxScores.personality, icon: Sparkles },
                    { label: 'Discovery Score', score: scores.discovery, max: maxScores.discovery, icon: BookMarked },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between px-4 py-2 rounded-lg"
                      style={{ background: '#FAF6F1' }}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                        <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>{item.label}</span>
                      </div>
                      <span className="font-playfair font-bold" style={{ color: '#1F2A44' }}>
                        {item.score} / {item.max}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Total */}
                <div className="py-4 border-y-2 mb-4" style={{ borderColor: '#E6DDD4' }}>
                  <p className="font-caveat text-xl mb-2" style={{ color: '#6B7280' }}>Final Total</p>
                  <p className="font-playfair text-5xl font-bold" style={{ color: '#1F2A44' }}>
                    {totalScore} / 100
                  </p>
                </div>

                {/* Title */}
                <div className="py-2 px-4 rounded-lg inline-block" style={{ background: '#D8D2F050' }}>
                  <p className="font-playfair text-xl font-semibold" style={{ color: '#1F2A44' }}>
                    {getTitle()}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewFinal}
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
                  boxShadow: '0px 10px 25px rgba(31,42,68,0.15)',
                }}
              >
                <span>View Final Message</span>
              </motion.button>
            </motion.div>
          )}

          {phase === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mb-8"
              >
                <PartyPopper className="w-16 h-16 mx-auto" style={{ color: '#D8A7B1' }} />
              </motion.div>

              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="font-playfair text-4xl md:text-6xl font-bold mb-6"
                style={{ color: '#1F2A44' }}
              >
                Happy Birthday<br />
                <span style={{ color: '#D8A7B1' }}>
                  Gayatri Devi Reddy!
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-cormorant text-xl md:text-2xl mb-8 max-w-lg mx-auto"
                style={{ color: '#6B7280' }}
              >
                "May your story always be filled with beautiful chapters."
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="space-y-4"
              >
                <p className="font-sacramento text-3xl" style={{ color: '#D8A7B1' }}>
                  THE END
                </p>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: '#D8A7B1' }}
                >
                  <Heart className="w-6 h-6 text-white" style={{ fill: 'white' }} />
                </motion.div>

                <p className="font-caveat text-lg" style={{ color: '#6B7280' }}>
                  A personalized scrapbook adventure, made with love
                </p>

                {/* All chapters summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="flex justify-center gap-2 mt-8"
                >
                  {chapterIcons.map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2 + i * 0.1 }}
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: '#FAF6F1' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
      <SparklesEffect show={showSparkles} />
    </section>
  );
}
