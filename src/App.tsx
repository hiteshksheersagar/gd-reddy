import { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import DoctorSection from './sections/DoctorSection';
import MovieSection from './sections/MovieSection';
import MusicSection from './sections/MusicSection';
import LittleThingsSection from './sections/LittleThingsSection';
import OpenLetterSection from './sections/OpenLetterSection';
import GreetingCardSection from './sections/GreetingCardSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, BookOpen, Stethoscope, Film, Music, Sparkles, BookMarked, Cake, Award } from 'lucide-react';
import { Confetti } from './components/CelebrationEffects';
import { ChapterProvider, useChapters } from './context/ChapterContext';

const C = {
  cream: '#FAF6F1',
  blush: '#F5D6D6',
  rose: '#D8A7B1',
  sage: '#C8DCC6',
  lavender: '#D8D2F0',
  beige: '#E9DFD2',
  navy: '#1F2A44',
};

const chapters = [
  { id: 1, title: 'The Story of Gayatri Devi Reddy', icon: BookOpen },
  { id: 2, title: 'The White Coat Chronicles', icon: Stethoscope },
  { id: 3, title: 'Romantic Cinema Challenge', icon: Film },
  { id: 4, title: 'The Soundtrack of Her Life', icon: Music },
  { id: 5, title: 'Things That Feel Like Gayatri', icon: Sparkles },
  { id: 6, title: 'Notes Found Between Pages', icon: BookMarked },
  { id: 7, title: 'The Birthday Scrapbook', icon: Cake },
];

function ScrapbookContent() {
  const {
    unlockedChapters,
    currentChapter,
    scores,
    unlockChapter,
    setCurrentChapter,
    updateScore,
    getTotalScore,
  } = useChapters();

  const [showUnlockEffect, setShowUnlockEffect] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const chapterNum = parseInt(hash.replace('#chapter-', ''));
      if (!isNaN(chapterNum) && unlockedChapters.includes(chapterNum)) {
        setCurrentChapter(chapterNum);
      }
    }
  }, []);

  const handleUnlockChapter = (chapter: number) => {
    if (!unlockedChapters.includes(chapter) && chapter <= 7) {
      setNewlyUnlocked(chapter);
      setShowUnlockEffect(true);
      setShowConfetti(true);

      setTimeout(() => {
        unlockChapter(chapter);
        setCurrentChapter(chapter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);

      setTimeout(() => {
        setShowUnlockEffect(false);
        setNewlyUnlocked(null);
        setShowConfetti(false);
      }, 3000);
    }
  };

  const handleChapterComplete = () => {
    handleUnlockChapter(currentChapter + 1);
  };

  const handleBeginJourney = () => {
    handleUnlockChapter(2);
  };

  const totalScore = getTotalScore();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.cream, overflowX: 'hidden' }}>
      {/* Global Score Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40"
      >
        <div
          className="bg-white rounded-2xl shadow-xl p-4"
          style={{ border: '3px solid #E6DDD4' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5" style={{ color: C.rose }} />
            <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
              Current Score
            </span>
          </div>
          <p className="font-playfair text-3xl font-bold text-center" style={{ color: C.navy }}>
            {totalScore} / 100
          </p>
          <div className="mt-3 pt-3 text-xs space-y-1" style={{ borderTop: '1px solid #E6DDD4' }}>
            {[
              { label: 'Doctor', score: scores.doctor, max: 20 },
              { label: 'Cinema', score: scores.movies, max: 25 },
              { label: 'Melody', score: scores.music, max: 25 },
              { label: 'Personality', score: scores.personality, max: 15 },
              { label: 'Discovery', score: scores.discovery, max: 15 },
            ].map(item => (
              <div key={item.label} className="flex justify-between">
                <span style={{ color: '#6B7280' }}>{item.label}</span>
                <span className="font-medium" style={{ color: C.navy }}>
                  {item.score}/{item.max}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scrapbook Bookmark Sidebar */}
      <div
        className="hidden md:flex"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2px',
        }}
      >
        {/* Spine line */}
        <div
          style={{
            position: 'absolute',
            left: '2px',
            top: 0,
            bottom: 0,
            width: '3px',
            background: `linear-gradient(to bottom, ${C.blush}, ${C.rose}, ${C.blush})`,
            borderRadius: '2px',
          }}
        />

        {chapters.map((chapter, index) => {
          const isUnlocked = unlockedChapters.includes(chapter.id);
          const isCurrent = currentChapter === chapter.id;
          const isComplete = isUnlocked && currentChapter > chapter.id;
          const isJustUnlocked = newlyUnlocked === chapter.id;
          const Icon = chapter.icon;

          const bookmarkBg = isCurrent
            ? C.rose
            : isComplete
            ? C.sage
            : isJustUnlocked
            ? C.navy
            : isUnlocked
            ? C.beige
            : '#CBD5E0';

          return (
            <motion.div
              key={chapter.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
              className="relative group"
              style={{ marginTop: index === 0 ? 0 : '-4px' }}
            >
              <motion.button
                whileHover={{ x: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => isUnlocked && setCurrentChapter(chapter.id)}
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '60px',
                  backgroundColor: bookmarkBg,
                  clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
                  boxShadow: isCurrent
                    ? `0 4px 16px rgba(216, 167, 177, 0.6)`
                    : '0 2px 8px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  border: 'none',
                  outline: 'none',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {isComplete ? (
                  <Check size={16} color="white" />
                ) : isUnlocked ? (
                  <motion.div
                    animate={isJustUnlocked ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={18} color={isJustUnlocked ? 'white' : C.navy} />
                  </motion.div>
                ) : (
                  <Lock size={14} color="#9CA3AF" />
                )}
              </motion.button>

              {/* Tooltip */}
              <div
                className="opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  position: 'absolute',
                  right: '52px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    background: isCurrent ? C.rose : C.navy,
                    color: C.cream,
                    padding: '8px 14px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <p style={{ fontFamily: 'Caveat, cursive', fontSize: '13px', margin: 0, opacity: 0.8 }}>
                    Ch. {chapter.id}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, margin: 0 }}>
                    {chapter.title}
                  </p>
                  {!isUnlocked && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', margin: '2px 0 0', opacity: 0.6 }}>
                      Complete previous chapter to unlock
                    </p>
                  )}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '-6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: 0,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: `6px solid ${isCurrent ? C.rose : C.navy}`,
                  }}
                />
              </div>

              {/* Sparkle unlock effect */}
              <AnimatePresence>
                {isJustUnlocked && showUnlockEffect && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos((i * 60 * Math.PI) / 180) * 24,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 24,
                          opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: [C.blush, C.rose, C.sage, C.lavender, '#F8DCC8', C.rose][i],
                          pointerEvents: 'none',
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(8px)',
          borderTop: `2px solid ${C.blush}`,
          padding: '10px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: C.rose }} />
            <span className="font-caveat text-lg" style={{ color: '#4A5568' }}>
              {totalScore} / 100
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {chapters.map((chapter) => {
              const isUnlocked = unlockedChapters.includes(chapter.id);
              const isCurrent = currentChapter === chapter.id;
              const isComplete = isUnlocked && currentChapter > chapter.id;

              return (
                <div
                  key={chapter.id}
                  style={{
                    width: isCurrent ? '20px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: isCurrent ? C.rose : isComplete ? C.sage : isUnlocked ? C.beige : '#CBD5E0',
                    border: isCurrent ? `2px solid ${C.rose}` : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? `0 0 8px ${C.rose}80` : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Unlock Toast */}
      <AnimatePresence>
        {showUnlockEffect && newlyUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 60,
              background: 'white',
              borderRadius: '20px',
              padding: '32px 48px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              textAlign: 'center',
              pointerEvents: 'none',
              border: `3px solid ${C.blush}`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: C.rose }}
            >
              {chapters[newlyUnlocked - 1] && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  {(() => {
                    const Icon = chapters[newlyUnlocked - 1].icon;
                    return <Icon size={28} color="white" />;
                  })()}
                </motion.div>
              )}
            </motion.div>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: C.rose, margin: '0 0 4px' }}>
              Chapter {newlyUnlocked} Unlocked!
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', margin: 0 }}>
              {chapters[newlyUnlocked - 1]?.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ paddingBottom: '80px' }} className="md:pb-0">
        {currentChapter >= 1 && (
          <motion.div
            key={`ch1-${currentChapter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HeroSection onBeginJourney={handleBeginJourney} />
          </motion.div>
        )}

        {currentChapter >= 2 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <DoctorSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('doctor', points)}
              doctorScore={scores.doctor}
            />
          </motion.div>
        )}

        {currentChapter >= 3 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <MovieSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('movies', points)}
              movieScore={scores.movies}
            />
          </motion.div>
        )}

        {currentChapter >= 4 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <MusicSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('music', points)}
              musicScore={scores.music}
            />
          </motion.div>
        )}

        {currentChapter >= 5 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <LittleThingsSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('personality', points)}
              personalityScore={scores.personality}
            />
          </motion.div>
        )}

        {currentChapter >= 6 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <OpenLetterSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('discovery', points)}
              discoveryScore={scores.discovery}
            />
          </motion.div>
        )}

        {currentChapter >= 7 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <GreetingCardSection scores={scores} totalScore={totalScore} />
          </motion.div>
        )}
      </main>

      <Footer />
      <Confetti show={showConfetti} />
    </div>
  );
}

function App() {
  return (
    <ChapterProvider>
      <ScrapbookContent />
    </ChapterProvider>
  );
}

export default App;
