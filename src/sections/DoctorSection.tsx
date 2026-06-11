import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ClipboardList, Coffee, Moon, BookOpen, Heart, Sparkles, Check, X, Award } from 'lucide-react';
import { useState } from 'react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

interface DoctorSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  doctorScore: number;
}

const doctorQuestions = [
  {
    question: "What is the normal resting heart rate for adults?",
    options: ["20-40 bpm", "60-100 bpm", "150-200 bpm", "110-140 bpm"],
    correct: 1,
  },
  {
    question: "Which instrument is used to listen to heart sounds?",
    options: ["Thermometer", "Stethoscope", "Syringe", "Otoscope"],
    correct: 1,
  },
  {
    question: "What does ECG stand for?",
    options: ["Electronic Cardiac Graph", "Electro Cardio Graph", "Electrocardiogram", "Electrical Heart Mapping"],
    correct: 2,
  },
  {
    question: "Which organ pumps blood throughout the body?",
    options: ["Liver", "Brain", "Lungs", "Heart"],
    correct: 3,
  },
];

const doctorStats = [
  { icon: Coffee, label: "Coffee Consumed", value: "Infinite" },
  { icon: Moon, label: "Sleep Hours", value: "Classified" },
  { icon: BookOpen, label: "Study Sessions", value: "Countless" },
  { icon: Sparkles, label: "Determination", value: "100%" },
  { icon: Heart, label: "Lives Touched", value: "Many" },
];

const prescriptionNotes = [
  "Keep Believing",
  "Keep Learning",
  "Keep Shining",
];

export default function DoctorSection({ onComplete, updateScore, doctorScore }: DoctorSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'prescription' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStartQuiz = () => {
    setPhase('quiz');
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === doctorQuestions[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      updateScore(5);
    }

    setTimeout(() => {
      if (currentQuestion < doctorQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowConfetti(true);
        setTimeout(() => {
          setPhase('prescription');
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
    };

    if (selectedAnswer === null) {
      return { ...base, background: '#FAF6F1', borderColor: '#E6DDD4' };
    }
    if (index === doctorQuestions[currentQuestion].correct) {
      return { ...base, background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, background: '#F9FAFB', borderColor: 'transparent', opacity: 0.6 };
  };

  return (
    <section
      id="doctor"
      className="relative py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-scrapbook-cream to-scrapbook-sage/20"
    >
      <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none" />
      <FairyLights className="top-8 opacity-60" count={6} />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-scrapbook-blush/50 mb-6"
          >
            <Stethoscope className="w-10 h-10 text-scrapbook-rose" />
          </motion.div>

          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            CHAPTER 2
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            The <span style={{ color: '#D8A7B1' }}>White Coat</span> Chronicles
          </h2>
          <p className="font-caveat text-xl md:text-2xl max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Let's test your medical knowledge, Doctor!
          </p>
        </ScrollReveal>

        {/* Doctor Score Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <Stethoscope className="w-5 h-5" style={{ color: '#D8A7B1' }} />
            <span className="font-caveat text-lg" style={{ color: '#6B7280' }}>
              Doctor Score: <span className="font-bold" style={{ color: '#1F2A44' }}>{doctorScore}</span> / 20
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
              className="max-w-3xl mx-auto"
            >
              {/* Scrapbook Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {doctorStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="bg-white p-5 rounded-xl shadow-lg relative"
                    style={{ borderLeft: '4px solid #D8A7B1' }}
                  >
                    <stat.icon className="w-6 h-6 mb-2" style={{ color: '#D8A7B1' }} />
                    <p className="font-caveat text-sm" style={{ color: '#6B7280' }}>{stat.label}</p>
                    <p className="font-playfair text-xl font-bold" style={{ color: '#1F2A44' }}>{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Prescription Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto mb-8"
                style={{ borderTop: '4px solid #D8A7B1' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                  <h3 className="font-playfair text-lg font-semibold" style={{ color: '#1F2A44' }}>Prescription Note</h3>
                </div>
                <div className="space-y-2">
                  {prescriptionNotes.map((note, i) => (
                    <p key={i} className="font-caveat text-lg" style={{ color: '#6B7280' }}>{note}</p>
                  ))}
                </div>
              </motion.div>

              <div className="text-center">
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
                  <span>Start Medical Quiz</span>
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
              {/* Progress bar */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                {doctorQuestions.map((_, i) => (
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
                  Question {currentQuestion + 1} of {doctorQuestions.length}
                </p>

                <h3 className="font-playfair text-xl font-semibold text-center mb-6" style={{ color: '#1F2A44' }}>
                  {doctorQuestions[currentQuestion].question}
                </h3>

                <div>
                  {doctorQuestions[currentQuestion].options.map((option, index) => (
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
                          {index === doctorQuestions[currentQuestion].correct && <Check size={18} color="#059669" />}
                          {selectedAnswer === index && !isCorrect && <X size={18} color="#DC2626" />}
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'prescription' && (
            <motion.div
              key="prescription"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-md mx-auto"
            >
              <div
                className="bg-white p-8 rounded-xl shadow-xl relative"
                style={{ borderTop: '4px solid #D8A7B1' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6" style={{ color: '#D8A7B1' }} />
                  <h3 className="font-playfair text-lg font-semibold" style={{ color: '#1F2A44' }}>
                    Quiz Complete
                  </h3>
                </div>

                <div className="text-center py-6 border-y-2 border-dashed mb-6" style={{ borderColor: '#E6DDD4' }}>
                  <p className="font-caveat text-xl mb-2" style={{ color: '#6B7280' }}>
                    Doctor Score
                  </p>
                  <p className="font-playfair text-4xl font-bold" style={{ color: '#1F2A44' }}>
                    {doctorScore} / 20
                  </p>
                  <p className="font-caveat text-lg mt-2" style={{ color: '#D8A7B1' }}>
                    {correctAnswers} correct out of {doctorQuestions.length}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                    <h4 className="font-playfair font-semibold" style={{ color: '#1F2A44' }}>Prescription Note</h4>
                  </div>
                  <div className="space-y-2">
                    {prescriptionNotes.map((note, i) => (
                      <p key={i} className="font-caveat text-lg" style={{ color: '#6B7280' }}>{note}</p>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-caveat text-sm" style={{ color: '#6B7280' }}>
                    Signed: Dr. Love
                  </p>
                </div>
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
                  marginTop: '32px',
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
                <Stethoscope className="w-5 h-5" style={{ color: '#D8A7B1' }} />
                <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>Chapter 2 Complete!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
