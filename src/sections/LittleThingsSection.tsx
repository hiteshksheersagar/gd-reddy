import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Sparkles, Check, Coffee, Book, Flower2, Film, Music, Plane,
  Moon, Heart, Star, PenLine, Stethoscope, Building2
} from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface LittleThingsSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  personalityScore: number;
}

const allStickers = [
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'books', label: 'Books', icon: Book },
  { id: 'flowers', label: 'Flowers', icon: Flower2 },
  { id: 'movies', label: 'Movies', icon: Film },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'night', label: 'Night Sky', icon: Moon },
  { id: 'stars', label: 'Stars', icon: Star },
  { id: 'dreams', label: 'Dreams', icon: Heart },
  { id: 'writing', label: 'Writing', icon: PenLine },
  { id: 'whitecoat', label: 'White Coat', icon: Stethoscope },
  { id: 'city', label: 'City Lights', icon: Building2 },
];

export default function LittleThingsSection({ onComplete, updateScore, personalityScore }: LittleThingsSectionProps) {
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [phase, setPhase] = useState<'selecting' | 'complete'>('selecting');
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleSticker = (id: string) => {
    if (selectedStickers.includes(id)) {
      setSelectedStickers((prev) => prev.filter((s) => s !== id));
    } else if (selectedStickers.length < 5) {
      setSelectedStickers((prev) => [...prev, id]);
    }
  };

  const handleComplete = () => {
    if (selectedStickers.length >= 5) {
      updateScore(15);
      setShowConfetti(true);
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 2000);
    }
  };

  return (
    <section
      id="little-things"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-scrapbook-lavender/20 to-scrapbook-cream"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-4 rounded-full mb-6"
            style={{ background: '#F5D6D650' }}
          >
            <Sparkles className="w-10 h-10" style={{ color: '#D8A7B1' }} />
          </motion.div>

          <p className="font-caveat text-xl mb-2" style={{ color: '#D8A7B1' }}>
            CHAPTER 5
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            Things That Feel Like <span style={{ color: '#D8A7B1' }}>Gayatri</span>
          </h2>
          <p className="font-caveat text-xl md:text-2xl max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Select 5 things that describe you best
          </p>
        </ScrollReveal>

        {/* Personality Score Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <Sparkles className="w-5 h-5" style={{ color: '#D8A7B1' }} />
            <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
              Personality Score: <span className="font-bold" style={{ color: '#1F2A44' }}>{personalityScore}</span> / 15
            </span>
          </div>
        </motion.div>

        {phase === 'selecting' ? (
          <>
            {/* Sticker Board */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-8" style={{ border: '3px solid #E6DDD4' }}>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {allStickers.map((sticker, index) => {
                  const isSelected = selectedStickers.includes(sticker.id);
                  const isDisabled = !isSelected && selectedStickers.length >= 5;
                  const Icon = sticker.icon;

                  return (
                    <motion.button
                      key={sticker.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: isDisabled ? 1 : 1.1, rotate: isDisabled ? 0 : 5 }}
                      whileTap={{ scale: isDisabled ? 1 : 0.9 }}
                      onClick={() => !isDisabled && toggleSticker(sticker.id)}
                      className="relative p-4 rounded-xl transition-all"
                      style={{
                        background: isSelected ? '#F5D6D630' : isDisabled ? '#F4EDE6' : '#FAF6F1',
                        boxShadow: isSelected ? '0 4px 12px rgba(216, 167, 177, 0.3)' : 'none',
                        border: `2px solid ${isSelected ? '#D8A7B1' : isDisabled ? '#E6DDD4' : '#E6DDD4'}`,
                        opacity: isDisabled ? 0.5 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <Icon
                        className="w-8 h-8 mx-auto mb-2"
                        style={{ color: isSelected ? '#D8A7B1' : '#6B7280' }}
                      />
                      <span className="font-caveat text-sm block" style={{ color: '#2E3440' }}>{sticker.label}</span>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 rounded-full p-1"
                          style={{ background: '#D8A7B1' }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
                  Selected: {selectedStickers.length} / 5
                </span>
              </div>
            </div>

            {/* Scrapbook Preview */}
            <AnimatePresence>
              {selectedStickers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-6 shadow-xl mb-8"
                  style={{
                    background: '#FAF6F1',
                    border: '2px dashed #D8A7B1',
                  }}
                >
                  <p className="font-caveat text-lg text-center mb-4" style={{ color: '#6B7280' }}>
                    Your Personalized Page
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedStickers.map((id) => {
                      const sticker = allStickers.find((s) => s.id === id);
                      if (!sticker) return null;
                      const Icon = sticker.icon;
                      return (
                        <motion.div
                          key={id}
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: Math.random() * 20 - 10 }}
                          className="bg-white px-4 py-3 rounded-lg shadow-md"
                        >
                          <Icon className="w-6 h-6" style={{ color: '#D8A7B1' }} />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Complete Button */}
            <div className="text-center">
              <motion.button
                whileHover={selectedStickers.length >= 5 ? { scale: 1.05, y: -2 } : {}}
                whileTap={selectedStickers.length >= 5 ? { scale: 0.95 } : {}}
                onClick={handleComplete}
                disabled={selectedStickers.length < 5}
                style={{
                  background: selectedStickers.length >= 5 ? '#1F2A44' : '#D1D5DB',
                  color: selectedStickers.length >= 5 ? '#FAF6F1' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '16px 36px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: selectedStickers.length >= 5 ? 'pointer' : 'not-allowed',
                  boxShadow: selectedStickers.length >= 5 ? '0px 10px 25px rgba(31,42,68,0.15)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {selectedStickers.length >= 5 ? 'Unlock Next Chapter' : `Select ${5 - selectedStickers.length} more`}
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl inline-block mb-6">
              <p className="font-caveat text-2xl mb-4" style={{ color: '#6B7280' }}>Your Things:</p>
              <div className="flex gap-4 justify-center mb-4">
                {selectedStickers.map((id) => {
                  const sticker = allStickers.find((s) => s.id === id);
                  if (!sticker) return null;
                  const Icon = sticker.icon;
                  return (
                    <motion.div
                      key={id}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                      className="bg-white rounded-lg shadow-md p-3"
                    >
                      <Icon className="w-8 h-8" style={{ color: '#D8A7B1' }} />
                    </motion.div>
                  );
                })}
              </div>
              <p className="font-caveat text-xl" style={{ color: '#D8A7B1' }}>
                Personality Score: {personalityScore} / 15
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#C8DCC650' }}>
              <Sparkles className="w-5 h-5" style={{ color: '#D8A7B1' }} />
              <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>Chapter 5 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
