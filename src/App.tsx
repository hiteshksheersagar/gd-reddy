import { useState, useEffect, useCallback } from 'react';
import './App.css';
import HeroSection from './sections/HeroSection';
import DoctorSection from './sections/DoctorSection';
import MovieSection from './sections/MovieSection';
import MusicSection from './sections/MusicSection';
import LittleThingsSection from './sections/LittleThingsSection';
import GreetingCardSection from './sections/GreetingCardSection';
import ClosingPage from './sections/ClosingPage';
import { motion } from 'framer-motion';
import { Lock, Check, BookOpen, Stethoscope, Film, Music as MusicIcon, Sparkles, Cake, Award } from 'lucide-react';
import { ChapterProvider, useChapters } from './context/ChapterContext';
import { Toast } from './components/ui/Toast';

const C = {
  cream: '#FAF6F1',
  blush: '#F5D6D6',
  rose: '#C97B8A',
  sage: '#A7C4A0',
  lavender: '#B9AEDC',
  warm: '#E6B98D',
  beige: '#E9DFD2',
  navy: '#1F2A44',
  creamDark: '#F4EDE6',
  textPrimary: '#374151',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
};

const chapters = [
  { id: 1, title: 'The Story of Gayatri Devi Reddy', icon: BookOpen },
  { id: 2, title: 'The White Coat Chronicles', icon: Stethoscope },
  { id: 3, title: 'Romantic Cinema Challenge', icon: Film },
  { id: 4, title: 'The Soundtrack of Her Life', icon: MusicIcon },
  { id: 5, title: 'Things That Feel Like Gayatri', icon: Sparkles },
  { id: 6, title: 'The Birthday Scrapbook', icon: Cake },
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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', subtitle: '' });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const chapterNum = parseInt(hash.replace('#chapter-', ''));
      if (!isNaN(chapterNum) && unlockedChapters.includes(chapterNum)) {
        setCurrentChapter(chapterNum);
      }
    }
  }, []);

  const handleUnlockChapter = useCallback((chapter: number) => {
    unlockChapter(chapter);
    setCurrentChapter(chapter);

    // Show subtle toast instead of large popup
    setToastMessage({
      title: `Chapter ${chapter} Unlocked!`,
      subtitle: chapters[chapter - 1]?.title,
    });
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }, [unlockChapter, setCurrentChapter]);

  const handleChapterComplete = useCallback(() => {
    const nextChapter = currentChapter + 1;
    if (nextChapter <= 6) {
      handleUnlockChapter(nextChapter);
    }
  }, [currentChapter, handleUnlockChapter]);

  const handleBeginJourney = useCallback(() => {
    handleUnlockChapter(2);
  }, [handleUnlockChapter]);

  useEffect(() => {
    if (currentChapter > 1) {
      const sectionId = [
        'hero', 'doctor', 'movies', 'music', 'little-things', 'greeting-card'
      ][currentChapter - 1];
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [currentChapter]);

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
          style={{ border: '3px solid #E6DDD4', backgroundColor: '#FFFDFC' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5" style={{ color: C.rose }} />
            <span className="font-caveat text-lg font-semibold" style={{ color: C.textPrimary }}>
              Current Score
            </span>
          </div>
          <p className="font-playfair text-3xl font-bold text-center" style={{ color: C.navy }}>
            {totalScore} / 120
          </p>
          <div className="mt-3 pt-3 text-xs space-y-1" style={{ borderTop: '1px solid #E6DDD4' }}>
            {[
              { label: 'Doctor', score: scores.doctor, max: 20 },
              { label: 'Cinema', score: scores.movies, max: 35 },
              { label: 'Melody', score: scores.music, max: 50 },
              { label: 'Personality', score: scores.personality, max: 15 },
            ].map(item => (
              <div key={item.label} className="flex justify-between">
                <span style={{ color: C.textSecondary }}>{item.label}</span>
                <span className="font-semibold" style={{ color: C.navy }}>
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
          const Icon = chapter.icon;

          const bookmarkBg = isCurrent
            ? C.rose
            : isComplete
            ? C.sage
            : isUnlocked
            ? C.navy
            : '#CBD5E1';

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
                    ? `0 4px 16px rgba(201, 123, 138, 0.6)`
                    : '0 2px 8px rgba(0,0,0,0.15)',
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
                  <Icon size={18} color="white" />
                ) : (
                  <Lock size={14} color="#64748B" />
                )}
              </motion.button>

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
                    background: C.navy,
                    color: C.cream,
                    padding: '8px 14px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <p style={{ fontFamily: 'Caveat, cursive', fontSize: '13px', margin: 0, opacity: 0.9 }}>
                    Ch. {chapter.id}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, margin: 0 }}>
                    {chapter.title}
                  </p>
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
                    borderLeft: `6px solid ${C.navy}`,
                  }}
                />
              </div>
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
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(8px)',
          borderTop: `2px solid ${C.rose}`,
          padding: '10px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: C.rose }} />
            <span className="font-caveat text-lg font-semibold" style={{ color: C.textPrimary }}>
              {totalScore} / 120
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
                    backgroundColor: isCurrent ? C.rose : isComplete ? C.sage : isUnlocked ? C.navy : '#CBD5E1',
                    border: isCurrent ? `2px solid ${C.rose}` : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? `0 0 8px rgba(201, 123, 138, 0.5)` : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        message={toastMessage.title}
        subMessage={toastMessage.subtitle}
        icon={Sparkles}
      />

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
          <motion.div
            key="ch2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DoctorSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('doctor', points)}
              doctorScore={scores.doctor}
            />
          </motion.div>
        )}

        {currentChapter >= 3 && (
          <motion.div
            key="ch3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MovieSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('movies', points)}
              movieScore={scores.movies}
            />
          </motion.div>
        )}

        {currentChapter >= 4 && (
          <motion.div
            key="ch4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MusicSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('music', points)}
              musicScore={scores.music}
            />
          </motion.div>
        )}

        {currentChapter >= 5 && (
          <motion.div
            key="ch5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LittleThingsSection
              onComplete={handleChapterComplete}
              updateScore={(points) => updateScore('personality', points)}
              personalityScore={scores.personality}
            />
          </motion.div>
        )}

        {currentChapter >= 6 && (
          <motion.div
            key="ch6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GreetingCardSection scores={scores} totalScore={totalScore} />
          </motion.div>
        )}

        {currentChapter >= 6 && (
          <motion.div
            key="closing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ClosingPage />
          </motion.div>
        )}
      </main>
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
