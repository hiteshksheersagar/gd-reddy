import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti, FloatingHearts } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

interface OpenLetterSectionProps {
  onComplete: () => void;
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
  { id: 7, text: "You are loved.", x: 10, y: 85, found: false },
  { id: 8, text: "You matter.", x: 90, y: 75, found: false },
  { id: 9, text: "Believe in yourself.", x: 50, y: 90, found: false },
];

export default function OpenLetterSection({ onComplete }: OpenLetterSectionProps) {
  const [foundNotes, setFoundNotes] = useState<Set<number>>(new Set());
  const [showHearts, setShowHearts] = useState(false);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const allNotes = [
    ...notes.map(n => ({ ...n, isHidden: false })),
    ...hiddenNotes.map(n => ({ ...n, isHidden: true })),
  ];

  const handleNoteClick = (id: number, isHidden: boolean) => {
    if (isHidden && !foundNotes.has(id)) {
      const newFound = new Set(foundNotes);
      newFound.add(id);
      setFoundNotes(newFound);

      if (newFound.size === hiddenNotes.length) {
        setShowHearts(true);
        setTimeout(() => {
          setShowConfetti(true);
          setChapterComplete(true);
          onComplete();
        }, 2000);
      }
    }
  };

  const hiddenFoundCount = Array.from(foundNotes).filter(id => hiddenNotes.some(h => h.id === id)).length;

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
            className="inline-flex items-center justify-center p-4 rounded-full bg-scrapbook-rose/20 mb-6"
          >
            <Search className="w-10 h-10 text-scrapbook-rose" />
          </motion.div>

          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            CHAPTER 6
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Little <span className="text-scrapbook-rose">Notes</span>
          </h2>
          <p className="font-caveat text-xl md:text-2xl text-gray-600">
            Find the 3 hidden notes scattered around!
          </p>
        </ScrollReveal>

        {!chapterComplete ? (
          <>
            {/* Notes Area */}
            <div className="relative h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Paper texture background */}
              <div className="absolute inset-0 paper-texture opacity-30" />

              {/* All visible notes */}
              {allNotes.map((note) => {
                const isFound = foundNotes.has(note.id);
                const isHidden = note.isHidden;

                if (!isHidden) {
                  // Visible notes - always shown
                  return (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20, rotate: Math.random() * 10 - 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: note.id * 0.1 }}
                      className="absolute"
                      style={{ left: `${note.x}%`, top: `${note.y}%` }}
                    >
                      <div className="bg-scrapbook-cream p-3 rounded-lg shadow-md border-l-4 border-scrapbook-rose">
                        <p className="font-caveat text-lg text-gray-700">{note.text}</p>
                      </div>
                    </motion.div>
                  );
                }

                // Hidden notes - need to be found
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isFound ? 1 : 0.15, scale: 1 }}
                    whileHover={{ scale: isFound ? 1 : 1.2 }}
                    onClick={() => handleNoteClick(note.id, true)}
                    className={`absolute cursor-pointer ${isFound ? '' : 'animate-pulse'}`}
                    style={{ left: `${note.x}%`, top: `${note.y}%` }}
                  >
                    <div className={`p-3 rounded-lg ${isFound ? 'bg-scrapbook-sage shadow-lg' : 'bg-gray-200/50'}`}>
                      <p className={`font-caveat text-lg ${isFound ? 'text-gray-700' : 'text-gray-400'}`}>
                        {isFound ? note.text : '?'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <p className="font-caveat text-sm text-gray-400 flex items-center gap-1">
                  <Search className="w-4 h-4" />
                  Click on hidden notes to reveal them
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
                <Heart className="w-5 h-5 text-scrapbook-rose" />
                <span className="font-caveat text-xl text-gray-700">
                  Hidden notes found: {hiddenFoundCount} / {hiddenNotes.length}
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
            <div className="bg-white rounded-2xl p-8 shadow-xl inline-block">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
                All Hidden Notes Found!
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {hiddenNotes.map((note) => (
                  <div key={note.id} className="bg-scrapbook-sage/50 px-4 py-2 rounded-lg">
                    <p className="font-caveat text-lg text-gray-700">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 bg-scrapbook-sage/50 px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 text-scrapbook-rose fill-scrapbook-rose" />
              <span className="font-caveat text-xl text-gray-700">Chapter 6 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <FloatingHearts show={showHearts} />
      <Confetti show={showConfetti} />
    </section>
  );
}
