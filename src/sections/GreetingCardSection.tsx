import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Heart, PartyPopper, Stethoscope, Film, Music, Sparkles,
  Cake, BookOpen, Award, BadgeCheck
} from 'lucide-react';
import { Confetti, Sparkles as SparklesEffect } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

interface GreetingCardSectionProps {
  scores: {
    doctor: number;
    movies: number;
    music: number;
    personality: number;
  };
  totalScore: number;
}

const titles = [
  { min: 100, title: 'The Main Character' },
  { min: 85, title: 'Dreamer & Healer' },
  { min: 70, title: 'Certified Movie Lover' },
  { min: 50, title: 'Story Collector' },
  { min: 0, title: 'Heart Full of Music' },
];

const journeyMoments = [
  { chapter: 'Hero', icon: BookOpen, caption: 'Where your story began' },
  { chapter: 'Doctor', icon: Stethoscope, caption: 'The white coat journey' },
  { chapter: 'Cinema', icon: Film, caption: 'Lights, camera, romance' },
  { chapter: 'Melody', icon: Music, caption: 'Songs of the heart' },
  { chapter: 'You', icon: Sparkles, caption: 'Simply wonderful' },
];

const heartMessages = [
  'Dream Big',
  'Stay Kind',
  'Love Deeply',
  'Laugh Often',
  'Be You',
  'Shine Bright',
];

export default function GreetingCardSection({ scores, totalScore }: GreetingCardSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleGiftClick = () => setStep(2);
  const handleSealClick = () => setStep(3);
  const handleCardReveal = () => setStep(4);
  const handlePolaroidOne = () => setStep(5);
  const handlePolaroidTwo = () => setStep(6);
  const handleHearts = () => setStep(7);
  const handleMessage = () => setStep(8);
  const handleBlowCandle = () => {
    setShowConfetti(true);
    setShowSparkles(true);
    setTimeout(() => setStep(9), 1500);
  };

  const getTitle = () => {
    for (const t of titles) {
      if (totalScore >= t.min) return t.title;
    }
    return titles[titles.length - 1].title;
  };

  return (
    <section
      id="greeting-card"
      className="relative py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-scrapbook-beige/30 to-scrapbook-rose/30 min-h-screen"
    >
      <FairyLights className="top-0" count={12} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              background: i % 2 === 0 ? '#C97B8A40' : '#B9AEDC40',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-xl mb-2" style={{ color: '#C97B8A' }}>
            FINAL CHAPTER
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: '#1F2A44' }}>
            The <span style={{ color: '#C97B8A' }}>Birthday</span> Scrapbook
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Magical Gift Box */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={handleGiftClick}
                className="cursor-pointer relative"
              >
                {/* Shimmer effect */}
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, #FFFFFF50 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Gift box */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl relative" style={{ background: 'linear-gradient(135deg, #C97B8A, #F5D6D6)' }}>
                  {/* Box lid */}
                  <div className="absolute -top-4 left-0 right-0 h-8 rounded-t-xl" style={{ background: '#C97B8A' }} />

                  {/* Horizontal ribbon */}
                  <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2" style={{ background: '#D8D2F0' }} />

                  {/* Vertical ribbon */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-12 -translate-x-1/2" style={{ background: '#D8D2F0' }} />

                  {/* Ribbon bow */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8"
                  >
                    <div className="relative">
                      <div className="w-16 h-10 rounded-full absolute -left-10" style={{ background: '#D8D2F0' }} />
                      <div className="w-16 h-10 rounded-full absolute left-10" style={{ background: '#D8D2F0' }} />
                      <div className="w-8 h-8 rounded-full" style={{ background: '#D8D2F0' }} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <p className="font-caveat text-xl mt-6 animate-pulse" style={{ color: '#6B7280' }}>
                Click to open your gift...
              </p>
            </motion.div>
          )}

          {/* Step 2: Decorative Seal */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center justify-center"
              onClick={handleSealClick}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer relative"
              >
                <div
                  className="w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-2xl relative"
                  style={{
                    background: 'linear-gradient(135deg, #C97B8A, #E6B98D)',
                    border: '6px double #FAF6F1',
                  }}
                >
                  <BadgeCheck className="w-16 h-16 text-white mb-2" />
                  <p className="font-playfair text-xl font-bold text-white">For Gayatri</p>
                  <p className="font-caveat text-sm text-white/80 mt-1">With Love</p>

                  {/* Decorative corners */}
                  {[-1, 1].map((x, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-full"
                      style={{ top: '15%', [x === -1 ? 'left' : 'right']: '15%' }}
                    />
                  ))}
                </div>
              </motion.div>

              <p className="font-caveat text-lg mt-4" style={{ color: '#C97B8A' }}>
                Click to reveal your card...
              </p>
            </motion.div>
          )}

          {/* Step 3: Handwritten Card Preview */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
              onClick={handleCardReveal}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 cursor-pointer relative max-w-md"
                style={{ border: '3px solid #E6DDD4' }}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 paper-texture opacity-30 rounded-2xl" />

                {/* Washi tape decorations */}
                <div className="absolute -top-3 left-8 w-20 h-5 rounded-md" style={{ background: '#C97B8A', transform: 'rotate(-3deg)' }} />

                <div className="relative text-center">
                  <p className="font-caveat text-2xl mb-4" style={{ color: '#C97B8A' }}>
                    A Birthday Letter
                  </p>
                  <p className="font-cormorant text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                    For someone who makes every page beautiful...
                  </p>

                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-6"
                  >
                    <Heart className="w-8 h-8 mx-auto" style={{ color: '#C97B8A', fill: '#C97B8A20' }} />
                  </motion.div>
                </div>
              </motion.div>

              <p className="font-caveat text-lg mt-4" style={{ color: '#6B7280' }}>
                Click to see your journey unfold...
              </p>
            </motion.div>
          )}

          {/* Step 4: First Polaroid */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ rotate: 2, scale: 1.02 }}
                className="inline-block bg-white p-4 pb-12 rounded shadow-xl cursor-pointer mx-auto"
                style={{ transform: 'rotate(-3deg)' }}
                onClick={handlePolaroidOne}
              >
                <div className="w-48 h-48 mb-3 rounded flex items-center justify-center" style={{ background: '#FAF6F1' }}>
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mb-2" style={{ color: '#C97B8A' }} />
                    <p className="font-playfair font-semibold" style={{ color: '#1F2A44' }}>Chapter 1</p>
                    <p className="font-caveat text-sm" style={{ color: '#6B7280' }}>Your Story</p>
                  </div>
                </div>
                <p className="font-caveat text-lg text-center" style={{ color: '#4B5563' }}>
                  "Every great story begins with...
                </p>
              </motion.div>

              <p className="font-caveat text-lg mt-6" style={{ color: '#C97B8A' }}>
                Click for the next memory...
              </p>
            </motion.div>
          )}

          {/* Step 5: Second Polaroid */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="flex flex-wrap justify-center gap-4">
                {journeyMoments.slice(0, 3).map((moment, i) => (
                  <motion.div
                    key={moment.chapter}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ rotate: i % 2 === 0 ? 3 : -3, scale: 1.05 }}
                    className="bg-white p-3 pb-10 rounded shadow-xl cursor-pointer"
                    style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
                    onClick={handlePolaroidTwo}
                  >
                    <div className="w-36 h-36 mb-2 rounded flex items-center justify-center" style={{ background: '#FAF6F1' }}>
                      <moment.icon className="w-12 h-12" style={{ color: '#C97B8A' }} />
                    </div>
                    <p className="font-playfair text-sm font-semibold text-center" style={{ color: '#1F2A44' }}>
                      {moment.chapter}
                    </p>
                    <p className="font-caveat text-xs text-center" style={{ color: '#6B7280' }}>
                      {moment.caption}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="font-caveat text-lg mt-6" style={{ color: '#C97B8A' }}>
                Click to collect more moments...
              </p>
            </motion.div>
          )}

          {/* Step 6: Heart Sticker Collection */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-6"
                onClick={handleHearts}
              >
                {heartMessages.map((msg, i) => (
                  <motion.div
                    key={msg}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="cursor-pointer"
                  >
                    <div
                      className="px-4 py-2 rounded-full shadow-md"
                      style={{
                        background: i % 2 === 0 ? '#C97B8A' : '#F5D6D6',
                        color: i % 2 === 0 ? 'white' : '#C97B8A',
                      }}
                    >
                      <p className="font-caveat text-lg font-semibold">{msg}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Polaroids row */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {journeyMoments.slice(3, 5).map((moment, i) => (
                  <motion.div
                    key={moment.chapter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white p-3 pb-10 rounded shadow-lg"
                    style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
                  >
                    <div className="w-28 h-28 mb-2 rounded flex items-center justify-center" style={{ background: '#FAF6F1' }}>
                      <moment.icon className="w-10 h-10" style={{ color: '#C97B8A' }} />
                    </div>
                    <p className="font-caveat text-xs text-center" style={{ color: '#6B7280' }}>
                      {moment.caption}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="font-caveat text-lg" style={{ color: '#C97B8A' }}>
                Click to see your final message...
              </p>
            </motion.div>
          )}

          {/* Step 7: Scorecard and Message */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl mb-6" style={{ border: '3px solid #E6DDD4' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: '#C97B8A' }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#1F2A44' }}>
                  Your Scrapbook Scorecard
                </h3>

                {/* Score breakdown */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: 'Doctor', score: scores.doctor, max: 20 },
                    { label: 'Cinema', score: scores.movies, max: 35 },
                    { label: 'Melody', score: scores.music, max: 50 },
                    { label: 'Personality', score: scores.personality, max: 15 },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between px-4 py-2 rounded"
                      style={{ background: '#FAF6F1' }}
                    >
                      <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>{item.label}</span>
                      <span className="font-playfair font-bold" style={{ color: '#1F2A44' }}>{item.score}/{item.max}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Total */}
                <div className="py-4 border-y-2 mb-4" style={{ borderColor: '#E6DDD4' }}>
                  <p className="font-playfair text-4xl font-bold" style={{ color: '#1F2A44' }}>
                    {totalScore} / 120
                  </p>
                  <p className="font-caveat text-xl mt-2" style={{ color: '#C97B8A' }}>
                    {getTitle()}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMessage}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#1F2A44',
                    color: '#FAF6F1',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '14px 32px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  <Cake className="w-5 h-5" />
                  <span>Light the Candle</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 8: Birthday Candle */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-auto" style={{ border: '3px solid #E6DDD4' }}>
                <p className="font-sacramento text-2xl mb-4" style={{ color: '#C97B8A' }}>
                  Make a Wish, Gayatri...
                </p>

                {/* Candle */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={handleBlowCandle}
                  className="cursor-pointer relative mx-auto w-fit"
                >
                  <div className="relative">
                    {/* Candle body */}
                    <div className="w-10 h-28 rounded-t-sm mx-auto" style={{ background: 'linear-gradient(to bottom, #F8DCC8, #C97B8A)' }} />

                    {/* Flame */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2"
                    >
                      <div className="w-6 h-12 rounded-full" style={{ background: 'linear-gradient(to top, #FB923C, #FCD34D, #FEF3C7)' }} />
                    </motion.div>

                    {/* Glow */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-xl" style={{ background: '#FEF3C780' }} />
                  </div>

                  <p className="font-caveat text-lg mt-6 animate-pulse" style={{ color: '#6B7280' }}>
                    Click to blow out the candle
                  </p>
                </motion.div>

                {/* Confirmed match indicator */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6"
                >
                  <p className="font-cormorant text-lg italic" style={{ color: '#4B5563' }}>
                    "Close your eyes and make a wish..."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Step 9: Final Message */}
          {step === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="mb-6"
              >
                <PartyPopper className="w-16 h-16 mx-auto" style={{ color: '#C97B8A' }} />
              </motion.div>

              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="font-playfair text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#1F2A44' }}
              >
                Happy Birthday<br />
                <span style={{ color: '#C97B8A' }}>Gayatri Devi Reddy!</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-cormorant text-xl md:text-2xl mb-6 max-w-lg mx-auto"
                style={{ color: '#4B5563' }}
              >
                "May this new chapter bring you endless joy, beautiful stories, and all the happiness you deserve."
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="mb-6"
              >
                <p className="font-sacramento text-3xl" style={{ color: '#C97B8A' }}>
                  THE END
                </p>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-6"
                style={{ background: '#C97B8A' }}
              >
                <Heart className="w-7 h-7 text-white" style={{ fill: 'white' }} />
              </motion.div>

              <p className="font-caveat text-xl" style={{ color: '#6B7280' }}>
                A birthday scrapbook made with love, just for you
              </p>

              {/* All chapters summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center gap-2 mt-8"
              >
                {[BookOpen, Stethoscope, Film, Music, Sparkles, Cake].map((Icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + i * 0.1 }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
                    style={{ background: '#FAF6F1' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#C97B8A' }} />
                  </motion.div>
                ))}
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
