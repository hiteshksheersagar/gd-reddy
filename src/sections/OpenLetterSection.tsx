import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Heart, BookMarked, Sparkles, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti, FloatingHearts } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

interface OpenLetterSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  discoveryScore: number;
}

const notes = [
  { id: 1, text: "Keep believing.", x: 15, y: 20 },
  { id: 2, text: "Keep growing.", x: 70, y: 15 },
  { id: 3, text: "Keep shining.", x: 40, y: 45 },
  { id: 4, text: "Keep healing.", x: 25, y: 70 },
  { id: 5, text: "Keep loving.", x: 65, y: 65 },
  { id: 6, text: "Keep dreaming.", x: 85, y: 40 },
];

const hiddenNotes = [
  { id: 7, text: "Keep believing.", x: 10, y: 85 },
  { id: 8, text: "Dream bigger.", x: 90, y: 75 },
  { id: 9, text: "Stay curious.", x: 50, y: 90 },
  { id: 10, text: "Keep shining.", x: 30, y: 50 },
  { id: 11, text: "Keep healing.", x: 75, y: 30 },
];

export default function OpenLetterSection({ onComplete, updateScore, discoveryScore }: OpenLetterSectionProps) {
  const [foundNotes, setFoundNotes] = useState<Set<number>>(new Set());
  const [showHearts, setShowHearts] = useState(false);
  const [phase, setPhase] = useState<'hunting' | 'complete'>('hunting');
  const [showConfetti, setShowConfetti] = useState(false);

  const allVisibleNotes = notes.map(n => ({ ...n, isHidden: false }));
  const allHiddenNotes = hiddenNotes.map(n => ({ ...n, isHidden: true }));

  const handleNoteClick = (id: number, isHidden: boolean) => {
    if (isHidden && !foundNotes.has(id)) {
      const newFound = new Set(foundNotes);
      newFound.add(id);
      setFoundNotes(newFound);
      updateScore(5);

      if (newFound.size >= 3) {
        setShowHearts(true);
        setTimeout(() => {
          setShowConfetti(true);
          setPhase('complete');
          onComplete();
        }, 2000);
      }
    }
  };

  return (
    <section
      id="letter"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-scrapbook-cream to-scrapbook-beige/30 min-h-screen"
    >
      <FairyLights className="top-0 opacity-40" count={6} />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-4 rounded-full mb-6"
            style={{ background: '#C97B8A30' }}
          >
            <Search className="w-10 h-10" style={{ color: '#C97B8A' }} />
          </motion.div>

          <p className="font-caveat text-xl mb-2" style={{ color: '#C97B8A' }}>
            CHAPTER 6
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            Notes Found <span style={{ color: '#C97B8A' }}>Between Pages</span>
          </h2>
          <p className="font-caveat text-xl md:text-2xl" style={{ color: '#6B7280' }}>
            Find at least 3 hidden notes scattered around!
          </p>
        </ScrollReveal>

        {/* Discovery Score Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <BookMarked className="w-5 h-5" style={{ color: '#C97B8A' }} />
            <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
              Discovery Score: <span className="font-bold" style={{ color: '#1F2A44' }}>{discoveryScore}</span> / 15
            </span>
          </div>
        </motion.div>

        {phase === 'hunting' ? (
          <>
            {/* Notes Area */}
            <div className="relative h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '3px solid #E6DDD4' }}>
              {/* Paper texture background */}
              <div className="absolute inset-0 paper-texture opacity-30" />

              {/* Visible notes */}
              {allVisibleNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20, rotate: Math.random() * 10 - 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: note.id * 0.1 }}
                  className="absolute"
                  style={{ left: `${note.x}%`, top: `${note.y}%` }}
                >
                  <div className="p-3 rounded-lg shadow-md" style={{ background: '#FAF6F1', borderLeft: '4px solid #C97B8A' }}>
                    <p className="font-caveat text-lg" style={{ color: '#6B7280' }}>{note.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Hidden notes */}
              {allHiddenNotes.map((note) => {
                const isFound = foundNotes.has(note.id);

                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isFound ? 1 : 0.15, scale: 1 }}
                    whileHover={{ scale: isFound ? 1 : 1.2 }}
                    onClick={() => handleNoteClick(note.id, true)}
                    className="absolute cursor-pointer"
                    style={{ left: `${note.x}%`, top: `${note.y}%` }}
                  >
                    <div
                      className="p-3 rounded-lg flex items-center gap-2"
                      style={{
                        background: isFound ? '#C8DCC6' : '#E6DDD480',
                        boxShadow: isFound ? '0 4px 12px rgba(200, 220, 198, 0.4)' : 'none',
                      }}
                    >
                      {isFound ? (
                        <>
                          <Check className="w-4 h-4" style={{ color: '#065F46' }} />
                          <p className="font-caveat text-lg" style={{ color: '#6B7280' }}>{note.text}</p>
                        </>
                      ) : (
                        <p className="font-caveat text-lg animate-pulse" style={{ color: '#9CA3AF' }}>?</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <p className="font-caveat text-sm flex items-center gap-1" style={{ color: '#9CA3AF' }}>
                  <Search className="w-4 h-4" />
                  Click on hidden notes to reveal them
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
                <Heart className="w-5 h-5" style={{ color: '#C97B8A' }} />
                <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>
                  Hidden notes found: {foundNotes.size} / {hiddenNotes.length} (need 3)
                </span>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl inline-block mb-6" style={{ border: '3px solid #E6DDD4' }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: '#C8DCC6' }}
              >
                <BookMarked className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: '#1F2A44' }}>
                Hidden Notes Discovered!
              </h3>
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                {Array.from(foundNotes).slice(0, 3).map((id) => {
                  const note = hiddenNotes.find(n => n.id === id);
                  if (!note) return null;
                  return (
                    <div key={id} className="px-4 py-2 rounded-lg flex items-center gap-2" style={{ background: '#C8DCC650' }}>
                      <Check className="w-4 h-4" style={{ color: '#065F46' }} />
                      <p className="font-caveat text-lg" style={{ color: '#6B7280' }}>{note.text}</p>
                    </div>
                  );
                })}
              </div>
              <p className="font-caveat text-xl" style={{ color: '#C97B8A' }}>
                Discovery Score: {discoveryScore} / 15
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#C8DCC650' }}>
              <Sparkles className="w-5 h-5" style={{ color: '#C97B8A' }} />
              <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>Chapter 6 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <FloatingHearts show={showHearts} />
      <Confetti show={showConfetti} />
    </section>
  );
}
