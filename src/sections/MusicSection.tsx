import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Music, Headphones, Check, Disc3,
  Sparkles, Sun, Moon, Cloud, Heart, Coffee, Plane, Award
} from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface MusicSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  musicScore: number;
}

const songs = [
  { id: 1, title: 'Enna Sona', artist: 'Arijit Singh', mood: 'Golden Hour', color: '#E6B98D' },
  { id: 2, title: 'Zehnaseeb', artist: 'Chinmayi Sripada', mood: 'Warm Comfort', color: '#A7C4A0' },
  { id: 3, title: 'Mast Magan', artist: 'Arijit Singh', mood: 'Daydreaming', color: '#B9AEDC' },
  { id: 4, title: 'Kabira Encore', artist: 'Arijit Singh', mood: 'Soulful Journey', color: '#C97B8A' },
  { id: 5, title: 'Tera Hone Laga Hoon', artist: 'Arijit Singh', mood: 'Romantic Evening', color: '#F5D6D6' },
  { id: 6, title: 'Pee Loon', artist: 'Mohit Chauhan', mood: 'Late Night Vibes', color: '#1F2A44' },
  { id: 7, title: 'Tum Se Hi', artist: 'Mohit Chauhan', mood: 'Nostalgia', color: '#E6DDD4' },
  { id: 8, title: 'Agar Tum Saath Ho', artist: 'Arijit Singh', mood: 'Emotional Depth', color: '#A7C4A0' },
];

const moodCategories = [
  { id: 'golden', name: 'Golden Hour', icon: Sun, color: '#E6B98D', description: 'Warm, happy vibes' },
  { id: 'comfort', name: 'Warm Comfort', icon: Heart, color: '#A7C4A0', description: 'Safe and cozy' },
  { id: 'dream', name: 'Daydreaming', icon: Cloud, color: '#B9AEDC', description: 'Lost in thoughts' },
  { id: 'journey', name: 'Soulful Journey', icon: Plane, color: '#C97B8A', description: 'Adventure awaits' },
  { id: 'romantic', name: 'Romantic Evening', icon: Moon, color: '#F5D6D6', description: 'Love in the air' },
  { id: 'night', name: 'Late Night Vibes', icon: Coffee, color: '#1F2A44', description: 'Peaceful late hours' },
  { id: 'nostalgia', name: 'Nostalgia', icon: Heart, color: '#E6DDD4', description: 'Treasured memories' },
  { id: 'emotional', name: 'Emotional Depth', icon: Sparkles, color: '#A7C4A0', description: 'Deep feelings' },
];

// Simple hash function for consistent "correct" mood
function getCorrectMood(songId: number): string {
  const moodMap: Record<number, string> = {
    1: 'golden',
    2: 'comfort',
    3: 'dream',
    4: 'journey',
    5: 'romantic',
    6: 'night',
    7: 'nostalgia',
    8: 'emotional',
  };
  return moodMap[songId] || 'golden';
}

export default function MusicSection({ onComplete, updateScore, musicScore }: MusicSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'playlist' | 'matching' | 'results' | 'complete'>('intro');
  const [discoveredSongs, setDiscoveredSongs] = useState<Set<number>>(new Set());
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [matchedSongs, setMatchedSongs] = useState<Set<number>>(new Set());
  const [correctMatches, setCorrectMatches] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleExplorePlaylist = () => {
    setPhase('playlist');
  };

  const handleSongSelect = (songId: number) => {
    if (matchedSongs.has(songId)) return;
    setSelectedSong(songId === selectedSong ? null : songId);
    setSelectedMood(null);
    if (!discoveredSongs.has(songId)) {
      setDiscoveredSongs(prev => new Set([...prev, songId]));
      updateScore(3);
    }
  };

  const handleMoodSelect = (moodId: string) => {
    if (selectedSong === null) return;
    setSelectedMood(moodId);
  };

  const handleConfirmMatch = () => {
    if (selectedSong === null || selectedMood === null) return;

    const isCorrect = getCorrectMood(selectedSong) === selectedMood;

    if (isCorrect) {
      setMatchedSongs(prev => new Set([...prev, selectedSong]));
      setCorrectMatches(prev => prev + 1);
      updateScore(3.5);
    }

    // Show feedback briefly
    setTimeout(() => {
      setSelectedSong(null);
      setSelectedMood(null);

      // Check if all songs are matched
      if (matchedSongs.size + 1 >= songs.length) {
        setShowConfetti(true);
        setTimeout(() => {
          setPhase('results');
        }, 1000);
      }
    }, 800);
  };

  const handleContinue = () => {
    setPhase('complete');
    onComplete();
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30" style={{ background: '#A7C4A0' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
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
            Explore the playlist and match songs to their perfect moods
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
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto mb-8" style={{ border: '3px solid #E6DDD4' }}>
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #1F2A44 0%, #374151 100%)' }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#C97B8A' }}>
                      <Music className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                <h3 className="font-playfair text-xl font-semibold mb-4" style={{ color: '#1F2A44' }}>
                  Gayatri's Playlist Journal
                </h3>

                <p className="font-cormorant text-lg mb-4" style={{ color: '#6B7280' }}>
                  A handpicked collection of songs that tell stories of love, longing, and beautiful moments.
                </p>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Disc3 className="w-4 h-4" style={{ color: '#C97B8A' }} />
                    <span className="font-inter text-sm" style={{ color: '#6B7280' }}>8 Songs</span>
                  </div>
                  <div className="w-1 h-4" style={{ background: '#E6DDD4' }} />
                  <div className="flex items-center gap-1">
                    <Headphones className="w-4 h-4" style={{ color: '#C97B8A' }} />
                    <span className="font-inter text-sm" style={{ color: '#6B7280' }}>8 Moods</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExplorePlaylist}
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
                <span>Open Playlist Journal</span>
              </motion.button>
            </motion.div>
          )}

          {phase === 'playlist' && (
            <motion.div
              key="playlist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Playlist Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {songs.map((song, index) => {
                  const isSelected = selectedSong === song.id;
                  const isMatched = matchedSongs.has(song.id);
                  const isDiscovered = discoveredSongs.has(song.id);

                  return (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => !isMatched && handleSongSelect(song.id)}
                      className="bg-white rounded-xl p-5 shadow-lg cursor-pointer relative overflow-hidden"
                      style={{
                        border: `2px solid ${isSelected ? '#C97B8A' : isMatched ? '#A7C4A0' : '#E6DDD4'}`,
                        transition: 'border-color 0.2s ease',
                      }}
                    >
                      {isMatched && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 rounded-full p-1"
                          style={{ background: '#A7C4A0' }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}

                      <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: `${song.color}30` }}>
                          <Music className="w-6 h-6" style={{ color: song.color }} />
                        </div>
                        <p className="font-playfair text-sm font-semibold mb-1" style={{ color: '#1F2A44' }}>
                          {song.title}
                        </p>
                        <p className="font-inter text-xs" style={{ color: '#6B7280' }}>
                          {song.artist}
                        </p>
                        {isDiscovered && !isMatched && (
                          <p className="font-caveat text-xs mt-2 italic" style={{ color: '#C97B8A' }}>
                            Pick a mood!
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Song Info */}
              <AnimatePresence>
                {selectedSong !== null && !matchedSongs.has(selectedSong) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-xl p-6 shadow-xl mb-8 max-w-md mx-auto"
                    style={{ border: '2px solid #C97B8A' }}
                  >
                    <p className="font-caveat text-lg text-center mb-3" style={{ color: '#C97B8A' }}>
                      Now Select a Mood for:
                    </p>
                    <p className="font-playfair text-xl font-semibold text-center" style={{ color: '#1F2A44' }}>
                      {songs.find(s => s.id === selectedSong)?.title}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mood Selection Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {moodCategories.map((mood) => {
                  const isSelected = selectedMood === mood.id;
                  const Icon = mood.icon;

                  return (
                    <motion.button
                      key={mood.id}
                      whileHover={{ scale: selectedSong !== null ? 1.03 : 1 }}
                      whileTap={{ scale: selectedSong !== null ? 0.97 : 1 }}
                      onClick={() => handleMoodSelect(mood.id)}
                      disabled={selectedSong === null}
                      className="bg-white rounded-lg p-4 text-center transition-all"
                      style={{
                        border: `2px solid ${isSelected ? mood.color : '#E6DDD4'}`,
                        opacity: selectedSong === null ? 0.5 : 1,
                        cursor: selectedSong === null ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: mood.color }} />
                      <p className="font-playfair text-sm font-semibold" style={{ color: '#1F2A44' }}>
                        {mood.name}
                      </p>
                      <p className="font-inter text-xs mt-1" style={{ color: '#6B7280' }}>
                        {mood.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Confirm Button */}
              <AnimatePresence>
                {selectedSong !== null && selectedMood !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConfirmMatch}
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
                        boxShadow: '0px 10px 25px rgba(31,42,68,0.15)',
                      }}
                    >
                      <Check className="w-4 h-4" />
                      <span>Confirm Match</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress */}
              <div className="flex flex-col items-center gap-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Disc3 className="w-5 h-5" style={{ color: '#C97B8A' }} />
                    <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
                      {matchedSongs.size} / 8 matched
                    </span>
                  </div>
                </div>

                {matchedSongs.size >= 8 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowConfetti(true);
                      setTimeout(() => setPhase('results'), 1000);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#A7C4A0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '16px 36px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer',
                      boxShadow: '0px 10px 25px rgba(167,196,160,0.3)',
                    }}
                  >
                    <Award className="w-5 h-5" />
                    <span>View Results</span>
                  </motion.button>
                )}
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
                    Playlist Complete!
                  </h3>
                </div>

                {/* Final Playlist */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-lg" style={{ background: '#FAF6F1' }}>
                  {songs.map((song, i) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 p-2 rounded bg-white"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${song.color}30` }}>
                        <Music className="w-4 h-4" style={{ color: song.color }} />
                      </div>
                      <div>
                        <p className="font-playfair text-xs font-semibold" style={{ color: '#1F2A44' }}>{song.title}</p>
                        <p className="font-caveat text-xs" style={{ color: '#C97B8A' }}>{song.mood}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center py-4 border-y-2 mb-6" style={{ borderColor: '#E6DDD4' }}>
                  <p className="font-caveat text-xl mb-2" style={{ color: '#6B7280' }}>Melody Score</p>
                  <p className="font-playfair text-4xl font-bold" style={{ color: '#1F2A44' }}>
                    {musicScore} / 50
                  </p>
                  <p className="font-caveat text-lg mt-2" style={{ color: '#C97B8A' }}>
                    {correctMatches} perfect mood matches
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
                  Continue to Next Chapter
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
