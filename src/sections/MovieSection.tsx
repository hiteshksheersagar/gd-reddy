import { motion } from 'framer-motion';
import { useState } from 'react';
import { Film, Star, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface MovieSectionProps {
  onComplete: () => void;
}

const movieChallenge = [
  {
    question: "Which movie is about a live-in couple navigating life and love?",
    movies: [
      { title: "OK Jaanu", correct: true },
      { title: "2 States", correct: false },
      { title: "Dum Laga Ke Haisha", correct: false },
    ],
    correctIndex: 0,
  },
  {
    question: "Which movie follows a couple from different cultural backgrounds?",
    movies: [
      { title: "OK Jaanu", correct: false },
      { title: "Dum Laga Ke Haisha", correct: false },
      { title: "2 States", correct: true },
    ],
    correctIndex: 2,
  },
  {
    question: "Which movie celebrates imperfect people finding confidence?",
    movies: [
      { title: "2 States", correct: false },
      { title: "Dum Laga Ke Haisha", correct: true },
      { title: "OK Jaanu", correct: false },
    ],
    correctIndex: 1,
  },
];

export default function MovieSection({ onComplete }: MovieSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedTickets.includes(currentQuestion)) return;

    const isCorrect = index === movieChallenge[currentQuestion].correctIndex;

    if (isCorrect) {
      setSelectedTickets((prev) => [...prev, currentQuestion]);
    }

    setTimeout(() => {
      if (currentQuestion < movieChallenge.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else if (selectedTickets.length + 1 >= movieChallenge.length) {
        setShowConfetti(true);
        setTimeout(() => {
          setChapterComplete(true);
          onComplete();
        }, 1500);
      }
    }, 1000);
  };

  return (
    <section
      id="movies"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-scrapbook-sage/20 to-scrapbook-blush/30"
    >
      <div className="absolute top-0 left-0 right-0 h-4 bg-gray-900/10" />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ rotate: -180 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-scrapbook-lavender/50 mb-6"
          >
            <Film className="w-10 h-10 text-scrapbook-rose" />
          </motion.div>

          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            CHAPTER 3
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Movie <span className="text-scrapbook-rose">Therapy</span>
          </h2>
          <p className="font-caveat text-xl md:text-2xl text-gray-600 max-w-xl mx-auto">
            Match the movies to collect all tickets!
          </p>
        </ScrollReveal>

        {/* Collected Tickets Display */}
        <div className="flex justify-center gap-4 mb-12">
          {movieChallenge.map((_, i) => (
            <motion.div
              key={i}
              className={`w-20 h-12 rounded-lg border-2 ${
                selectedTickets.includes(i)
                  ? 'bg-scrapbook-cream border-scrapbook-rose'
                  : 'bg-gray-100 border-dashed border-gray-300'
              } flex items-center justify-center`}
              animate={selectedTickets.includes(i) ? { rotate: [-5, 5, -5] } : {}}
              transition={{ duration: 0.3 }}
            >
              {selectedTickets.includes(i) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-4 h-4 text-scrapbook-rose" />
                  <span className="font-caveat text-sm">✓</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {!chapterComplete ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-6 text-center">
              {movieChallenge[currentQuestion].question}
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {movieChallenge[currentQuestion].movies.map((movie, index) => (
                <motion.div
                  key={movie.title}
                  className="relative"
                >
                  {/* Movie Ticket */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(index)}
                    className="bg-scrapbook-cream rounded-lg p-4 cursor-pointer shadow-lg border-2 border-transparent hover:border-scrapbook-rose relative overflow-hidden"
                  >
                    {/* Perforations */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-8 bg-scrapbook-sage/30 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-4 h-8 bg-scrapbook-sage/30 rounded-full" />

                    <div className="text-center py-2 border-y border-dashed border-gray-300 my-2">
                      <h4 className="font-playfair text-lg font-semibold text-gray-800">
                        {movie.title}
                      </h4>
                    </div>

                    <div className="flex justify-center mt-2">
                      <Star className="w-4 h-4 text-scrapbook-rose" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6">
              <span className="font-caveat text-lg text-gray-500">
                Question {currentQuestion + 1} of {movieChallenge.length}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-6xl mb-4"
              >
                🎬
              </motion.div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                All Tickets Collected!
              </h3>
              <p className="font-caveat text-xl text-gray-600">
                You're a true cinema lover!
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 bg-scrapbook-sage/50 px-6 py-3 rounded-full">
              <Film className="w-5 h-5 text-scrapbook-rose" />
              <span className="font-caveat text-xl text-gray-700">Chapter 3 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
