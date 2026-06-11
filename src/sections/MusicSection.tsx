import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Music, Headphones, Play, Pause, Check, Disc3 } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface MusicSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  musicScore: number;
}

const songs = [
  {
    title: 'Enna Sona',
    artist: 'Arijit Singh',
    mood: 'Golden Hour',
    cover: 'https://images.pexels.com/photos/164823/pexels-photo-164823.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'Zehnaseeb',
    artist: 'Chinmayi Sripada',
    mood: 'Warm Comfort',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'Mast Magan',
    artist: 'Arijit Singh',
    mood: 'Daydreaming',
    cover: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'Kabira Encore',
    artist: 'Arijit Singh',
    mood: 'Soulful Journey',
    cover: 'https://images.pexels.com/photos/338972/pexels-photo-338972.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function MusicSection({ onComplete, updateScore, musicScore }: MusicSectionProps) {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listenedSongs, setListenedSongs] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<'playing' | 'complete'>('playing');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelectSong = (index: number) => {
    setSelectedSong(index);
    setIsPlaying(true);
  };

  const handleStopSong = () => {
    if (selectedSong !== null && isPlaying) {
      const newListened = new Set([...listenedSongs, selectedSong]);
      if (!listenedSongs.has(selectedSong)) {
        updateScore(5);
      }
      setListenedSongs(newListened);
    }
    setIsPlaying(false);
  };

  const allListened = listenedSongs.size >= songs.length;

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 1500);
  };

  return (
    <section
      id="music"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-scrapbook-blush/30 to-scrapbook-lavender/20"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl" style={{ background: '#C8DCC630' }} />
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full blur-3xl" style={{ background: '#F5D6D630' }} />
      </div>

      <div className="max-w-5xl mx-auto">
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
            Click on each vinyl to listen. Discover all 4 songs!
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
              Melody Score: <span className="font-bold" style={{ color: '#1F2A44' }}>{musicScore}</span> / 25
            </span>
          </div>
        </motion.div>

        {phase === 'playing' ? (
          <>
            {/* Vinyl records grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              {songs.map((song, index) => (
                <motion.div
                  key={song.title}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center"
                >
                  <motion.div
                    onClick={() => handleSelectSong(index)}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer relative"
                  >
                    {/* Vinyl record */}
                    <motion.div
                      animate={selectedSong === index && isPlaying ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 3,
                        repeat: selectedSong === index && isPlaying ? Infinity : 0,
                        ease: 'linear',
                      }}
                      className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full shadow-2xl flex items-center justify-center"
                      style={{ background: '#1F1F1F' }}
                    >
                      {/* Grooves */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            width: `${(i + 1) * 16}%`,
                            height: `${(i + 1) * 16}%`,
                            border: '1px solid #333333',
                          }}
                        />
                      ))}

                      {/* Center label */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden" style={{ border: '4px solid #2A2A2A' }}>
                        <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />

                      {/* Listened checkmark */}
                      {listenedSongs.has(index) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-1 -right-1 rounded-full p-1"
                          style={{ background: '#C8DCC6' }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>

                  <p className="font-playfair text-sm font-semibold mt-3" style={{ color: '#1F2A44' }}>
                    {song.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Selected song player */}
            <AnimatePresence>
              {selectedSong !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-6 shadow-xl max-w-md mx-auto relative"
                  style={{ border: '3px solid #E6DDD4' }}
                >
                  {/* Waveform animation */}
                  {isPlaying && (
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ background: '#C97B8A' }}
                          animate={{
                            height: [20, 40 + Math.random() * 30, 20],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="font-playfair text-xl font-semibold" style={{ color: '#1F2A44' }}>
                      {songs[selectedSong].title}
                    </h3>
                    <p className="font-inter text-sm mb-2" style={{ color: '#6B7280' }}>
                      {songs[selectedSong].artist}
                    </p>
                    <p className="font-caveat text-lg" style={{ color: '#C97B8A' }}>
                      Mood: {songs[selectedSong].mood}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 rounded-full text-white"
                      style={{ background: '#C97B8A' }}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleStopSong}
                      className="p-3 rounded-full"
                      style={{ background: '#E6DDD4', color: '#6B7280' }}
                    >
                      <Headphones className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Floating music symbols */}
                  {isPlaying && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      {[Music, Disc3, Music].map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: -30,
                            x: (i - 1) * 20,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                          className="absolute"
                          style={{ color: '#C97B8A60' }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex flex-col items-center gap-4 mt-8">
              <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
                {listenedSongs.size} / {songs.length} songs discovered
              </span>
              <button
                onClick={handleComplete}
                disabled={!allListened}
                style={{
                  background: allListened ? '#1F2A44' : '#D1D5DB',
                  color: allListened ? '#FAF6F1' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '16px 36px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: allListened ? 'pointer' : 'not-allowed',
                  boxShadow: allListened ? '0px 10px 25px rgba(31,42,68,0.15)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                Unlock Next Chapter
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="bg-white p-8 rounded-xl shadow-xl inline-block mb-6">
              <div className="flex justify-center gap-4 mb-4">
                {songs.map((_, i) => (
                  <Disc3 key={i} className="w-5 h-5" style={{ color: '#C97B8A' }} />
                ))}
              </div>
              <p className="font-caveat text-2xl mb-2" style={{ color: '#6B7280' }}>Melody Score</p>
              <p className="font-playfair text-4xl font-bold" style={{ color: '#1F2A44' }}>
                {musicScore} / 25
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#C8DCC650' }}>
              <Music className="w-5 h-5" style={{ color: '#C97B8A' }} />
              <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>Chapter 4 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
