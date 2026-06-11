import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Music, Headphones, Play, Pause, Check, Disc3, ListMusic, PenLine, Award, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface MusicSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  musicScore: number;
}

const playlist = [
  { id: 1, title: 'Enna Sona', artist: 'Arijit Singh', mood: 'Golden Hour', note: 'Golden hour song', year: '2017' },
  { id: 2, title: 'Zehnaseeb', artist: 'Chinmayi Sripada', mood: 'Warm Comfort', note: 'Comfort song', year: '2014' },
  { id: 3, title: 'Mast Magan', artist: 'Arijit Singh', mood: 'Daydreaming', note: 'Feels like falling in love', year: '2014' },
  { id: 4, title: 'Kabira Encore', artist: 'Arijit Singh', mood: 'Soulful Journey', note: 'Feels like a journey', year: '2013' },
  { id: 5, title: 'Tera Hone Laga Hoon', artist: 'Arijit Singh', mood: 'Romantic Evening', note: 'Magical melody', year: '2009' },
  { id: 6, title: 'Pee Loon', artist: 'Mohit Chauhan', mood: 'Late Night Vibes', note: 'Perfect for rain', year: '2010' },
  { id: 7, title: 'Tum Se Hi', artist: 'Mohit Chauhan', mood: 'Nostalgia', note: 'Reminds of old times', year: '2009' },
  { id: 8, title: 'Agar Tum Saath Ho', artist: 'Arijit Singh', mood: 'Emotional Depth', note: 'Tears and healing', year: '2015' },
];

const musicQuiz = [
  {
    question: "Which song is one of Gayatri's favorites?",
    options: ["Enna Sona", "Kesariya", "Ghungroo", "Apna Bana Le"],
    correct: 0,
  },
  {
    question: "Which song contains the word 'Magan' in its title?",
    options: ["Mast Magan", "Tum Se Hi", "Pee Loon", "Tera Hone Laga Hoon"],
    correct: 0,
  },
  {
    question: "Which song is often associated with journeys and nostalgia?",
    options: ["Kabira Encore", "Ghungroo", "Channa Mereya", "Raabta"],
    correct: 0,
  },
  {
    question: "Which song has 'Sona' in its title?",
    options: ["Enna Sona", "Tum Hi Ho", "Shayad", "Ilahi"],
    correct: 0,
  },
  {
    question: "Which of these songs is in Gayatri's playlist?",
    options: ["Zehnaseeb", "Malang", "Deva Deva", "Besharam Rang"],
    correct: 0,
  },
];

// Collectible Cassette Component
function Cassette({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: Math.random() * 10 - 5 }}
      className="relative"
    >
      <div
        className="rounded-md shadow-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFFDFC 0%, #F4EDE6 100%)',
          border: '2px solid #C97B8A',
          width: '80px',
        }}
      >
        {/* Cassette body */}
        <div className="p-2">
          {/* Tape reels */}
          <div className="flex justify-center gap-4 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: '#C97B8A', border: '2px solid #1F2A44' }}
            />
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: '#C97B8A', border: '2px solid #1F2A44' }}
            />
          </div>
          {/* Label */}
          <div
            className="text-center py-1 rounded"
            style={{ background: '#FAF6F1' }}
          >
            <p className="font-inter text-xs font-bold" style={{ color: '#C97B8A' }}>
              CASSETTE #{index + 1}
            </p>
          </div>
        </div>
        {/* Bottom stripe */}
        <div className="h-2" style={{ background: '#C97B8A' }} />
      </div>
    </motion.div>
  );
}

// Vinyl Record Component
function VinylRecord({
  song,
  isPlaying,
  isSelected,
  onClick,
}: {
  song: typeof playlist[0];
  isPlaying: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer relative"
    >
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: 'linear',
        }}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl flex items-center justify-center"
        style={{ background: '#1F1F1F' }}
      >
        {/* Grooves */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${(i + 1) * 12}%`,
              height: `${(i + 1) * 12}%`,
              border: '1px solid #333333',
            }}
          />
        ))}

        {/* Center label */}
        <div
          className="w-14 h-14 md:w-18 md:h-18 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #C97B8A 0%, #E8B4B8 100%)',
            border: '3px solid #2A2A2A',
          }}
        >
          <Music className="w-5 h-5 text-white" />
        </div>

        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />

        {/* Selected indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 rounded-full p-1"
            style={{ background: '#C8DCC6' }}
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.div>

      <p
        className="font-playfair text-sm font-semibold mt-3 text-center"
        style={{ color: isSelected ? '#C97B8A' : '#1F2A44' }}
      >
        {song.title}
      </p>
    </motion.div>
  );
}

export default function MusicSection({ onComplete, updateScore, musicScore }: MusicSectionProps) {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [discoveredSongs, setDiscoveredSongs] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<'explore' | 'quiz' | 'results' | 'complete'>('explore');
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [collectedCassettes, setCollectedCassettes] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSongSelect = (index: number) => {
    setSelectedSong(index);
    setIsPlaying(true);
  };

  const handleStopSong = () => {
    if (selectedSong !== null && isPlaying) {
      const newDiscovered = new Set([...discoveredSongs, selectedSong]);
      if (!discoveredSongs.has(selectedSong)) {
        updateScore(5);
      }
      setDiscoveredSongs(newDiscovered);
    }
    setIsPlaying(false);
  };

  const handleStartQuiz = () => {
    if (discoveredSongs.size >= 4) {
      setPhase('quiz');
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === musicQuiz[currentQuizQuestion].correct;

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      updateScore(5);
      setCollectedCassettes(prev => [...prev, currentQuizQuestion]);
    }

    setTimeout(() => {
      if (currentQuizQuestion < musicQuiz.length - 1) {
        setCurrentQuizQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowConfetti(true);
        setTimeout(() => {
          setPhase('results');
        }, 1000);
      }
    }, 1200);
  };

  const handleContinue = () => {
    setPhase('complete');
    onComplete();
  };

  const allDiscovered = discoveredSongs.size >= 4;

  const getOptionStyle = (index: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      cursor: selectedAnswer === null ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      border: '2px solid transparent',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#FAF6F1',
    };

    if (selectedAnswer === null) {
      return { ...base, borderColor: '#E6DDD4' };
    }
    if (index === musicQuiz[currentQuizQuestion].correct) {
      return { ...base, background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, background: '#F9FAFB', borderColor: 'transparent', opacity: 0.6 };
  };

  return (
    <section
      id="music"
      className="relative py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-scrapbook-blush/30 to-scrapbook-lavender/20"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl" style={{ background: '#C97B8A20' }} />
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full blur-3xl" style={{ background: '#B9AEDC20' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 rounded-full mb-6"
            style={{ background: '#C8DCC650' }}
          >
            <Music className="w-10 h-10" style={{ color: '#C97B8A' }} />
          </motion.div>

          <p className="font-caveat text-xl mb-2" style={{ color: '#C97B8A' }}>
            CHAPTER 4
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            The <span style={{ color: '#C97B8A' }}>Soundtrack</span> of Her Life
          </h2>
          <p className="font-caveat text-xl md:text-2xl max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Explore the playlist journal, collect vinyl records, and test your music knowledge!
          </p>
        </ScrollReveal>

        {/* Melody Score Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <Music className="w-5 h-5" style={{ color: '#C97B8A' }} />
            <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
              Melody Score: <span className="font-bold" style={{ color: '#1F2A44' }}>{musicScore}</span> / 50
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Main Grid Layout */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Left Side - Playlist Journal */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-xl relative"
                  style={{ border: '3px solid #E6DDD4' }}
                >
                  {/* Washi tape decorations */}
                  <div className="absolute -top-3 left-8 w-20 h-5 rounded-md" style={{ background: '#C97B8A', transform: 'rotate(-3deg)' }} />
                  <div className="absolute -top-3 right-8 w-20 h-5 rounded-md" style={{ background: '#B9AEDC', transform: 'rotate(3deg)' }} />

                  {/* Paper texture */}
                  <div className="absolute inset-0 paper-texture opacity-20 rounded-2xl" />

                  <div className="relative">
                    {/* Journal Header */}
                    <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: '2px dashed #E6DDD4' }}>
                      <ListMusic className="w-5 h-5" style={{ color: '#C97B8A' }} />
                      <h3 className="font-playfair text-xl font-semibold" style={{ color: '#1F2A44' }}>
                        Gayatri's Playlist
                      </h3>
                    </div>

                    {/* Playlist Entries */}
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {playlist.map((song, index) => {
                        const isDiscovered = discoveredSongs.has(index);
                        return (
                          <motion.div
                            key={song.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSongSelect(index)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className={`p-3 rounded-lg cursor-pointer relative ${
                              selectedSong === index ? 'ring-2 ring-offset-2 ring-scrapbook-rose' : ''
                            }`}
                            style={{
                              background: isDiscovered ? '#C8DCC620' : selectedSong === index ? '#C97B8A20' : '#FAF6F1',
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: isDiscovered ? '#C8DCC6' : '#E6DDD4' }}
                              >
                                {isDiscovered ? (
                                  <Check className="w-4 h-4 text-white" />
                                ) : selectedSong === index && isPlaying ? (
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                  >
                                    <Music className="w-4 h-4" style={{ color: '#C97B8A' }} />
                                  </motion.div>
                                ) : (
                                  <span className="font-inter text-xs font-bold" style={{ color: '#6B7280' }}>
                                    {index + 1}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-playfair text-sm font-semibold truncate" style={{ color: '#1F2A44' }}>
                                  {song.title}
                                </p>
                                <p className="font-inter text-xs" style={{ color: '#6B7280' }}>
                                  {song.artist}
                                </p>
                                {isDiscovered && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <PenLine className="w-3 h-3" style={{ color: '#C97B8A' }} />
                                    <p className="font-caveat text-sm italic" style={{ color: '#C97B8A' }}>
                                      "{song.note}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Vinyl Collection */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <div className="text-center mb-4">
                    <h3 className="font-playfair text-lg font-semibold" style={{ color: '#1F2A44' }}>
                      Vinyl Collection
                    </h3>
                    <p className="font-caveat text-sm" style={{ color: '#6B7280' }}>
                      Click to play, discover songs!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {playlist.slice(0, 4).map((song, index) => (
                      <VinylRecord
                        key={song.id}
                        song={song}
                        isPlaying={selectedSong === index && isPlaying}
                        isSelected={discoveredSongs.has(index)}
                        onClick={() => handleSongSelect(index)}
                      />
                    ))}
                  </div>

                  {/* Now Playing Card */}
                  <AnimatePresence>
                    {selectedSong !== null && isPlaying && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="mt-6 bg-white rounded-xl p-4 shadow-lg"
                        style={{ border: '3px solid #C97B8A' }}
                      >
                        <p className="font-caveat text-lg text-center mb-2" style={{ color: '#C97B8A' }}>
                          Now Playing
                        </p>
                        <h4 className="font-playfair text-xl font-semibold text-center" style={{ color: '#1F2A44' }}>
                          {playlist[selectedSong].title}
                        </h4>
                        <p className="font-inter text-sm text-center mb-1" style={{ color: '#6B7280' }}>
                          {playlist[selectedSong].artist}
                        </p>
                        <p className="font-caveat text-center mb-3" style={{ color: '#C97B8A' }}>
                          Mood: {playlist[selectedSong].mood}
                        </p>

                        {/* Waveform */}
                        <div className="flex justify-center gap-1 mb-3">
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 rounded-full"
                              style={{ background: '#C97B8A' }}
                              animate={{ height: [10, 25 + Math.random() * 20, 10] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                            />
                          ))}
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-3 rounded-full text-white"
                            style={{ background: '#C97B8A' }}
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleStopSong}
                            className="p-3 rounded-full"
                            style={{ background: '#E6DDD4' }}
                          >
                            <Headphones className="w-5 h-5" style={{ color: '#6B7280' }} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Progress */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Disc3 className="w-5 h-5" style={{ color: '#C97B8A' }} />
                    <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
                      {discoveredSongs.size} / 8 songs discovered
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={allDiscovered ? { scale: 1.05, y: -2 } : {}}
                  whileTap={allDiscovered ? { scale: 0.95 } : {}}
                  onClick={handleStartQuiz}
                  disabled={!allDiscovered}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: allDiscovered ? '#1F2A44' : '#D1D5DB',
                    color: allDiscovered ? '#FAF6F1' : '#9CA3AF',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '16px 36px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: allDiscovered ? 'pointer' : 'not-allowed',
                    boxShadow: allDiscovered ? '0px 10px 25px rgba(31,42,68,0.15)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {allDiscovered ? 'Start Music Quiz (+25 pts)' : `Discover ${4 - discoveredSongs.size} more songs`}
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto"
            >
              {/* Cassette Collection */}
              <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[60px]">
                {collectedCassettes.length > 0 ? (
                  collectedCassettes.map((_, i) => (
                    <Cassette key={i} index={i} />
                  ))
                ) : (
                  <p className="font-caveat text-lg" style={{ color: '#9CA3AF' }}>
                    Answer correctly to collect cassettes!
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                {musicQuiz.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '6px',
                      borderRadius: '3px',
                      background: i < currentQuizQuestion ? '#C8DCC6' : i === currentQuizQuestion ? '#C97B8A' : '#E6DDD4',
                      transition: 'background 0.3s ease',
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  background: 'white',
                  padding: '32px',
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '3px solid #E6DDD4',
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5" style={{ color: '#C97B8A' }} />
                  <p className="font-caveat text-lg" style={{ color: '#C97B8A' }}>
                    Music Quiz
                  </p>
                </div>

                <p className="font-inter text-sm text-center mb-2" style={{ color: '#6B7280' }}>
                  Question {currentQuizQuestion + 1} of {musicQuiz.length}
                </p>

                <h3 className="font-playfair text-lg font-semibold text-center mb-6" style={{ color: '#1F2A44' }}>
                  {musicQuiz[currentQuizQuestion].question}
                </h3>

                <div>
                  {musicQuiz[currentQuizQuestion].options.map((option, index) => (
                    <motion.button
                      key={`${currentQuizQuestion}-${index}`}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedAnswer === null ? 0.97 : 1 }}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      style={getOptionStyle(index)}
                    >
                      <span>{option}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-lg mx-auto"
            >
              <div
                className="bg-white p-8 rounded-xl shadow-xl"
                style={{ borderTop: '4px solid #C97B8A' }}
              >
                <div className="flex items-center gap-2 mb-6 justify-center">
                  <Award className="w-6 h-6" style={{ color: '#C97B8A' }} />
                  <h3 className="font-playfair text-xl font-semibold" style={{ color: '#1F2A44' }}>
                    Music Collection Complete!
                  </h3>
                </div>

                {/* Cassette Collection Display */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap justify-center gap-3 mb-6 p-4 rounded-lg"
                  style={{ background: '#FAF6F1' }}
                >
                  {collectedCassettes.map((_, i) => (
                    <Cassette key={i} index={i} />
                  ))}
                </motion.div>

                <div className="text-center py-4 border-y-2 mb-6" style={{ borderColor: '#E6DDD4' }}>
                  <p className="font-caveat text-xl mb-2" style={{ color: '#6B7280' }}>Melody Score</p>
                  <p className="font-playfair text-4xl font-bold" style={{ color: '#1F2A44' }}>
                    {musicScore} / 50
                  </p>
                  <p className="font-caveat text-lg mt-2" style={{ color: '#C97B8A' }}>
                    {discoveredSongs.size} songs + {correctAnswers} quiz correct
                  </p>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    background: '#1F2A44',
                    color: '#FAF6F1',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '16px 36px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: 'pointer',
                    boxShadow: '0px 10px 25px rgba(31,42,68,0.15)',
                  }}
                >
                  Unlock Next Chapter
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#C8DCC650' }}>
                <Music className="w-5 h-5" style={{ color: '#C97B8A' }} />
                <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>Chapter 4 Complete!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
