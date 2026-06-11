import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Film, Ticket, Check, X, Award } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface MovieSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  movieScore: number;
}

const movieQuestions = [
  {
    question: "Which movie features Krish and Ananya's intercultural love story?",
    options: ["OK Jaanu", "2 States", "Sita Ramam", "Ye Maaya Chesave"],
    correct: 1,
  },
  {
    question: "Which movie follows Adi and Tara navigating a live-in relationship?",
    options: ["Dear Comrade", "Dum Laga Ke Haisha", "OK Jaanu", "Geetha Govindam"],
    correct: 2,
  },
  {
    question: "Which Telugu romantic classic stars Naga Chaitanya and Samantha?",
    options: ["Majili", "Orange", "Ye Maaya Chesave", "Fidaa"],
    correct: 2,
  },
  {
    question: "In which movie does Ram write letters to Sita?",
    options: ["Hi Nanna", "Sita Ramam", "Love Story", "Majili"],
    correct: 1,
  },
  {
    question: "Which movie features Bhanumathi and Balakrishna?",
    options: ["Fidaa", "Geetha Govindam", "Sita Ramam", "Orange"],
    correct: 0,
  },
];

export default function MovieSection({ onComplete, updateScore, movieScore }: MovieSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'results' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [collectedTickets, setCollectedTickets] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStartQuiz = () => {
    setPhase('quiz');
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === movieQuestions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      updateScore(5);
      setCollectedTickets(prev => [...prev, currentQuestion]);
    }

    setTimeout(() => {
      if (currentQuestion < movieQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
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

  const getOptionStyle = (index: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '12px',
      textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      fontSize: '15px',
      cursor: selectedAnswer === null ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      border: '2px solid transparent',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#FAF6F1',
    };

    if (selectedAnswer === null) {
      return { ...base, borderColor: '#E6DDD4' };
    }
    if (index === movieQuestions[currentQuestion].correct) {
      return { ...base, background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, background: '#F9FAFB', borderColor: 'transparent', opacity: 0.6 };
  };

  return (
    <section
      id="movies"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-scrapbook-sage/20 to-scrapbook-blush/30"
    >
      <div className="absolute top-0 left-0 right-0 h-4" style={{ background: '#1F2A4410' }} />

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ rotate: -180 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 rounded-full mb-6"
            style={{ background: '#D8D2F050' }}
          >
            <Film className="w-10 h-10" style={{ color: '#D8A7B1' }} />
          </motion.div>

          <p className="font-caveat text-xl mb-2" style={{ color: '#D8A7B1' }}>
            CHAPTER 3
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            Romantic <span style={{ color: '#D8A7B1' }}>Cinema</span> Challenge
          </h2>
          <p className="font-caveat text-xl md:text-2xl max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Match the romantic movies to collect all tickets!
          </p>
        </ScrollReveal>

        {/* Cinema Score Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <Film className="w-5 h-5" style={{ color: '#D8A7B1' }} />
            <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
              Cinema Score: <span className="font-bold" style={{ color: '#1F2A44' }}>{movieScore}</span> / 25
            </span>
          </div>
        </motion.div>

        {/* Collected Tickets Display */}
        <div className="flex justify-center gap-2 mb-12">
          {movieQuestions.map((_, i) => (
            <motion.div
              key={i}
              className="w-16 h-12 rounded-lg flex items-center justify-center border-2"
              style={{
                background: collectedTickets.includes(i) ? '#FFFDFC' : '#F4EDE6',
                borderColor: collectedTickets.includes(i) ? '#D8A7B1' : '#E6DDD4',
                borderStyle: collectedTickets.includes(i) ? 'solid' : 'dashed',
              }}
              animate={collectedTickets.includes(i) ? { rotate: [-3, 3, -3] } : {}}
              transition={{ duration: 0.3 }}
            >
              {collectedTickets.includes(i) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <Ticket className="w-4 h-4" style={{ color: '#D8A7B1' }} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto mb-8">
                <div className="flex justify-center gap-4 mb-4">
                  {['#D8A7B1', '#C8DCC6', '#D8D2F0'].map((color, i) => (
                    <motion.div
                      key={i}
                      initial={{ rotate: -10 }}
                      animate={{ rotate: 0 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-12 rounded-lg shadow-md flex items-center justify-center relative overflow-hidden"
                      style={{ background: '#FFFDFC' }}
                    >
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-6 rounded-full"
                        style={{ background: `${color}40` }}
                      />
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-6 rounded-full"
                        style={{ background: `${color}40` }}
                      />
                      <Ticket className="w-4 h-4" style={{ color }} />
                    </motion.div>
                  ))}
                </div>
                <p className="font-caveat text-lg" style={{ color: '#6B7280' }}>
                  Collect 5 movie tickets by answering correctly
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartQuiz}
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
                <span>Start Cinema Quiz</span>
              </motion.button>
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
              {/* Progress bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                {movieQuestions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '6px',
                      borderRadius: '3px',
                      background: i < currentQuestion ? '#C8DCC6' : i === currentQuestion ? '#D8A7B1' : '#E6DDD4',
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
                <p className="font-caveat text-lg text-center mb-2" style={{ color: '#D8A7B1' }}>
                  Question {currentQuestion + 1} of {movieQuestions.length}
                </p>

                <h3 className="font-playfair text-xl font-semibold text-center mb-6" style={{ color: '#1F2A44' }}>
                  {movieQuestions[currentQuestion].question}
                </h3>

                <div>
                  {movieQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={`${currentQuestion}-${index}`}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedAnswer === null ? 0.97 : 1 }}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      style={getOptionStyle(index)}
                    >
                      <span>{option}</span>
                      {selectedAnswer !== null && (
                        <>
                          {index === movieQuestions[currentQuestion].correct && <Check size={18} color="#059669" />}
                          {selectedAnswer === index && !isCorrect && <X size={18} color="#DC2626" />}
                        </>
                      )}
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
              className="max-w-md mx-auto"
            >
              <div
                className="bg-white p-8 rounded-xl shadow-xl"
                style={{ borderTop: '4px solid #D8A7B1' }}
              >
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <Award className="w-6 h-6" style={{ color: '#D8A7B1' }} />
                  <h3 className="font-playfair text-lg font-semibold" style={{ color: '#1F2A44' }}>
                    Quiz Complete
                  </h3>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-white rounded-xl p-6 shadow-lg mb-6"
                  style={{ border: '2px dashed #E6DDD4' }}
                >
                  <div className="flex justify-center gap-2 mb-4">
                    {collectedTickets.map((_, i) => (
                      <Ticket key={i} className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                    ))}
                  </div>
                  <p className="font-caveat text-xl text-center mb-2" style={{ color: '#6B7280' }}>
                    Cinema Score
                  </p>
                  <p className="font-playfair text-4xl font-bold text-center" style={{ color: '#1F2A44' }}>
                    {movieScore} / 25
                  </p>
                  <p className="font-caveat text-lg text-center mt-2" style={{ color: '#D8A7B1' }}>
                    {correctAnswers} correct out of {movieQuestions.length}
                  </p>
                </motion.div>

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
                <Film className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>Chapter 3 Complete!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
