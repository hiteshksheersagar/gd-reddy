import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Music, Headphones, Play, Pause, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface MusicSectionProps {
  onComplete: () => void;
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

export default function MusicSection({ onComplete }: MusicSectionProps) {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listenedSongs, setListenedSongs] = useState<Set<number>>(new Set());
  const [chapterComplete, setChapterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelectSong = (index: number) => {
    setSelectedSong(index);
    setIsPlaying(true);
  };

  const handleStopSong = () => {
    if (selectedSong !== null && isPlaying) {
      setListenedSongs((prev) => new Set([...prev, selectedSong]));
    }
    setIsPlaying(false);
  };

  const allListened = listenedSongs.size >= songs.length;

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setChapterComplete(true);
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
        <div className="absolute top-20 left-10 w-32 h-32 bg-scrapbook-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-scrapbook-blush/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-scrapbook-sage/50 mb-6"
          >
            <Music className="w-10 h-10 text-scrapbook-rose" />
          </motion.div>

          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            CHAPTER 4
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            The <span className="text-scrapbook-rose">Soundtrack</span> of Her Life
          </h2>
          <p className="font-caveat text-xl md:text-2xl text-gray-600 max-w-xl mx-auto">
            Click on each vinyl to listen. Discover all 4 songs!
          </p>
        </ScrollReveal>

        {!chapterComplete ? (
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
                      className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full bg-gray-900 shadow-2xl flex items-center justify-center"
                    >
                      {/* Grooves */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-gray-700"
                          style={{
                            width: `${(i + 1) * 16}%`,
                            height: `${(i + 1) * 16}%`,
                          }}
                        />
                      ))}

                      {/* Center label */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-gray-800">
                        <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />

                      {/* Listened checkmark */}
                      {listenedSongs.has(index) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-1 -right-1 bg-scrapbook-sage rounded-full p-1"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>

                  <p className="font-playfair text-sm font-semibold text-gray-800 mt-3">
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
                  className="bg-white rounded-2xl p-6 shadow-xl max-w-md mx-auto"
                >
                  {/* Waveform animation */}
                  {isPlaying && (
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-scrapbook-rose rounded-full"
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
                    <h3 className="font-playfair text-xl font-semibold text-gray-800">
                      {songs[selectedSong].title}
                    </h3>
                    <p className="font-inter text-sm text-gray-500 mb-2">
                      {songs[selectedSong].artist}
                    </p>
                    <p className="font-caveat text-lg text-scrapbook-rose">
                      Mood: {songs[selectedSong].mood}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 bg-scrapbook-rose rounded-full text-white"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleStopSong}
                      className="p-3 bg-gray-200 rounded-full text-gray-700"
                    >
                      <Headphones className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Floating music notes */}
                  {isPlaying && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      {['♪', '♫', '♬'].map((note, i) => (
                        <motion.span
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
                          className="absolute text-2xl text-scrapbook-rose/60"
                        >
                          {note}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <span className="font-caveat text-lg text-gray-600">
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
                  padding: '14px 32px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: allListened ? 'pointer' : 'not-allowed',
                  boxShadow: allListened ? '0 8px 20px rgba(31,42,68,0.2)' : 'none',
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-6xl mb-4"
            >
              🎵
            </motion.div>
            <div className="inline-flex items-center gap-2 bg-scrapbook-sage/50 px-6 py-3 rounded-full">
              <Music className="w-5 h-5 text-scrapbook-rose" />
              <span className="font-caveat text-xl text-gray-700">Chapter 4 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
