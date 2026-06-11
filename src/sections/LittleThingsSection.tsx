import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface LittleThingsSectionProps {
  onComplete: () => void;
}

const allStickers = [
  { id: 'coffee', label: 'Coffee', emoji: '☕' },
  { id: 'books', label: 'Books', emoji: '📚' },
  { id: 'flowers', label: 'Flowers', emoji: '🌸' },
  { id: 'movies', label: 'Movies', emoji: '🎬' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'sunsets', label: 'Sunsets', emoji: '🌅' },
  { id: 'dreams', label: 'Dreams', emoji: '💭' },
  { id: 'whitecoat', label: 'White Coat', emoji: '🥼' },
  { id: 'stars', label: 'Stars', emoji: '⭐' },
  { id: 'rain', label: 'Rain', emoji: '🌧️' },
  { id: 'writing', label: 'Writing', emoji: '✍️' },
];

export default function LittleThingsSection({ onComplete }: LittleThingsSectionProps) {
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleSticker = (id: string) => {
    if (selectedStickers.includes(id)) {
      setSelectedStickers((prev) => prev.filter((s) => s !== id));
    } else if (selectedStickers.length < 5) {
      setSelectedStickers((prev) => [...prev, id]);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setChapterComplete(true);
      onComplete();
    }, 2000);
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
            className="inline-flex items-center justify-center p-4 rounded-full bg-scrapbook-blush/50 mb-6"
          >
            <Sparkles className="w-10 h-10 text-scrapbook-rose" />
          </motion.div>

          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            CHAPTER 5
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Things That Feel Like <span className="text-scrapbook-rose">Gayatri</span>
          </h2>
          <p className="font-caveat text-xl md:text-2xl text-gray-600 max-w-xl mx-auto">
            Pick 5 stickers that feel most like you
          </p>
        </ScrollReveal>

        {!chapterComplete ? (
          <>
            {/* Sticker Board */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-8">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {allStickers.map((sticker, index) => {
                  const isSelected = selectedStickers.includes(sticker.id);
                  const isDisabled = !isSelected && selectedStickers.length >= 5;

                  return (
                    <motion.button
                      key={sticker.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: isDisabled ? 1 : 1.1 }}
                      whileTap={{ scale: isDisabled ? 1 : 0.9 }}
                      onClick={() => !isDisabled && toggleSticker(sticker.id)}
                      className={`relative p-4 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-scrapbook-blush shadow-lg ring-2 ring-scrapbook-rose'
                          : isDisabled
                          ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                          : 'bg-scrapbook-cream hover:bg-scrapbook-sage/30 cursor-pointer'
                      }`}
                    >
                      <span className="text-3xl md:text-4xl block mb-1">{sticker.emoji}</span>
                      <span className="font-caveat text-sm text-gray-700">{sticker.label}</span>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-scrapbook-rose rounded-full p-1"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <span className="font-caveat text-lg text-gray-600">
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
                  className="bg-scrapbook-cream rounded-2xl p-6 shadow-xl border-2 border-dashed border-scrapbook-rose/50"
                >
                  <p className="font-caveat text-lg text-gray-600 mb-4 text-center">
                    Your Personalized Page
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedStickers.map((id) => {
                      const sticker = allStickers.find((s) => s.id === id);
                      return (
                        <motion.div
                          key={id}
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: Math.random() * 20 - 10 }}
                          className="bg-white px-4 py-2 rounded-lg shadow-md"
                        >
                          <span className="text-2xl">{sticker?.emoji}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Complete Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleComplete}
                disabled={selectedStickers.length < 5}
                style={{
                  background: selectedStickers.length >= 5 ? '#1F2A44' : '#D1D5DB',
                  color: selectedStickers.length >= 5 ? '#FAF6F1' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '14px 32px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: selectedStickers.length >= 5 ? 'pointer' : 'not-allowed',
                  boxShadow: selectedStickers.length >= 5 ? '0 8px 20px rgba(31,42,68,0.2)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {selectedStickers.length >= 5 ? 'Unlock Next Chapter' : `Select ${5 - selectedStickers.length} more`}
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl inline-block">
              <p className="font-caveat text-2xl text-gray-700 mb-4">Your Things:</p>
              <div className="flex gap-3 justify-center mb-4">
                {selectedStickers.map((id) => {
                  const sticker = allStickers.find((s) => s.id === id);
                  return (
                    <motion.span
                      key={id}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                      className="text-4xl"
                    >
                      {sticker?.emoji}
                    </motion.span>
                  );
                })}
              </div>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 bg-scrapbook-sage/50 px-6 py-3 rounded-full">
              <Sparkles className="w-5 h-5 text-scrapbook-rose" />
              <span className="font-caveat text-xl text-gray-700">Chapter 5 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
