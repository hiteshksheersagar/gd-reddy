import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, ClipboardList, Coffee, Moon, BookOpen, Heart, Sparkles, Check, X,
  Clock, Brain, Trophy, Activity
} from 'lucide-react';
import { useState } from 'react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

interface DoctorSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  doctorScore: number;
}

const doctorQuestions = [
  {
    question: "What anatomical structure is known as the 'pacemaker' of the heart?",
    options: ["AV Node", "SA Node", "Bundle of His", "Purkinje Fibers"],
    correct: 1,
    explanation: "The SA (Sinoatrial) Node initiates the electrical impulse!",
  },
  {
    question: "Which cranial nerve is primarily affected in Bell's Palsy?",
    options: ["Trigeminal (CN V)", "Facial (CN VII)", "Vagus (CN X)", "Optic (CN II)"],
    correct: 1,
    explanation: "Bell's Palsy affects the Facial Nerve (CN VII)!",
  },
  {
    question: "In an ECG, what does the QRS complex represent?",
    options: ["Atrial depolarization", "Ventricular depolarization", "Ventricular repolarization", "SA node firing"],
    correct: 1,
    explanation: "QRS shows ventricles contracting!",
  },
  {
    question: "What is the normal range for blood glucose (fasting) in adults?",
    options: ["50-70 mg/dL", "70-100 mg/dL", "100-126 mg/dL", "126-150 mg/dL"],
    correct: 1,
    explanation: "Normal fasting glucose is 70-100 mg/dL!",
  },
  {
    question: "Which reflex is tested by tapping the patellar tendon?",
    options: ["Biceps reflex", "Triceps reflex", "Knee jerk reflex (L2-L4)", "Achilles reflex"],
    correct: 2,
    explanation: "The knee jerk tests L2-L4 spinal segments!",
  },
  {
    question: "What is the most common type of anemia worldwide?",
    options: ["Vitamin B12 deficiency", "Iron deficiency anemia", "Sickle cell anemia", "Aplastic anemia"],
    correct: 1,
    explanation: "Iron deficiency is the most common cause!",
  },
  {
    question: "Which heart sound is associated with the closing of the AV valves?",
    options: ["S1 (LUB)", "S2 (DUB)", "S3", "S4"],
    correct: 0,
    explanation: "S1 (LUB) is AV valves closing, S2 (DUB) is semilunar valves!",
  },
  {
    question: "What is the medical term for inflammation of the appendix?",
    options: ["Gastritis", "Colitis", "Appendicitis", "Diverticulitis"],
    correct: 2,
    explanation: "Appendicitis = appendix + itis (inflammation)!",
  },
];

const survivalGuideTips = [
  {
    icon: Coffee,
    title: "The Caffeine Equation",
    content: "1 cup = 1 more patient. But after 3 cups, you're just vibrating.",
    color: '#C97B8A',
  },
  {
    icon: Moon,
    title: "Sleep Schedule",
    content: "Sleep is that thing you hear about in lectures. You'll meet it eventually.",
    color: '#B9AEDC',
  },
  {
    icon: BookOpen,
    title: "Study Strategy",
    content: "Read once. Panic. Read again. Repeat until coffee runs out.",
    color: '#A7C4A0',
  },
  {
    icon: Brain,
    title: "Mental Math",
    content: "2 AM drug calculations hit different. Calculator friends now.",
    color: '#E6B98D',
  },
  {
    icon: Clock,
    title: "Time Management",
    content: "There's always time for one more page. Just one. Maybe two.",
    color: '#F5D6D6',
  },
  {
    icon: Heart,
    title: "The Golden Rule",
    content: "Treat every patient like you'd want your family treated.",
    color: '#C97B8A',
  },
];

const prescriptionNote = {
  doctor: "Dr. Future",
  patient: "Dr. Gayatri Devi Reddy (in training)",
  advice: [
    "Take one deep breath when stressed",
    "Drink water between patients",
    "Eat on time (your stomach will thank you)",
    "Sleep is not optional, it's medicine",
    "You've got this, Doctor!",
  ],
};

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
      setCorrectAnswers((prev) => prev + 1);
      updateScore(2.5);
    }

    setTimeout(() => {
      if (currentQuestion < doctorQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowConfetti(true);
        setTimeout(() => {
          setPhase('prescription');
        }, 1000);
      }
    }, 1500);
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
      fontSize: '14px',
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
      className="relative py-24 py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-scrapbook-cream to-scrapbook-sage/20"
    >
      <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none" />
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: '#C97B8A15' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-scrapbook-blush/50 mb-6"
          >
            <Stethoscope className="w-10 h-10 text-scrapbook-rose" />
          </motion.div>

          <p className="font-caveat text-xl text-scrapbook-rose mb-2">
            CHAPTER 2
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            The <span style={{ color: '#C97B8A' }}>White Coat</span> Chronicles
          </h2>
          <p className="font-caveat text-xl md:text-2xl max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            The Survival Guide to Becoming Dr. Gayatri
          </p>
        </ScrollReveal>

        {/* Doctor Score Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <Stethoscope className="w-5 h-5" style={{ color: '#C97B8A' }} />
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
              className="max-w-4xl mx-auto"
            >
              {/* Survival Guide Title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-10"
              >
                <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md" style={{ border: '2px dashed #C97B8A' }}>
                  <p className="font-caveat text-lg" style={{ color: '#C97B8A' }}>"Essential wisdom for the journey"</p>
                </div>
              </motion.div>

              {/* Survival Guide Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {survivalGuideTips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className="bg-white p-5 rounded-xl shadow-lg relative"
                    style={{ borderLeft: `4px solid ${tip.color}` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <tip.icon className="w-5 h-5" style={{ color: tip.color }} />
                      <h3 className="font-playfair text-sm font-semibold" style={{ color: '#1F2A44' }}>
                        {tip.title}
                      </h3>
                    </div>
                    <p className="font-caveat text-base" style={{ color: '#6B7280' }}>
                      {tip.content}
                    </p>

                    {/* Decorative corner */}
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full opacity-30"
                      style={{ background: tip.color }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Motivational Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto mb-8"
                style={{ borderTop: '4px solid #C97B8A' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" style={{ color: '#C97B8A' }} />
                  <h3 className="font-playfair text-lg font-semibold" style={{ color: '#1F2A44' }}>
                    A Note for the Journey
                  </h3>
                </div>
                <p className="font-cormorant text-lg italic" style={{ color: '#6B7280' }}>
                  "The art of medicine consists of amusing the patient while nature cures the disease."
                </p>
                <p className="font-caveat text-sm mt-2 text-right" style={{ color: '#C97B8A' }}>
                  — Voltaire
                </p>
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
                  <span>Test Your Medical Knowledge</span>
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
                      background:
                        i < currentQuestion
                          ? '#C8DCC6'
                          : i === currentQuestion
                          ? '#C97B8A'
                          : '#E6DDD4',
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
                  <Activity className="w-5 h-5" style={{ color: '#C97B8A' }} />
                  <p className="font-caveat text-lg" style={{ color: '#C97B8A' }}>
                    Medical Challenge
                  </p>
                </div>

                <p className="font-inter text-sm text-center mb-2" style={{ color: '#6B7280' }}>
                  Question {currentQuestion + 1} of {doctorQuestions.length}
                </p>

                <h3 className="font-playfair text-lg font-semibold text-center mb-6" style={{ color: '#1F2A44' }}>
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
                          {index === doctorQuestions[currentQuestion].correct && (
                            <Check size={18} color="#059669" />
                          )}
                          {selectedAnswer === index && !isCorrect && <X size={18} color="#DC2626" />}
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Explanation after answer */}
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg text-center"
                    style={{ background: '#FAF6F1' }}
                  >
                    <p className="font-caveat text-base" style={{ color: '#C97B8A' }}>
                      {doctorQuestions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
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
              {/* Prescription Paper */}
              <div
                className="bg-white p-8 rounded-xl shadow-xl relative overflow-hidden"
                style={{ border: '3px solid #E6DDD4' }}
              >
                {/* Rx Symbol */}
                <div className="absolute top-4 left-4 text-4xl font-serif font-bold opacity-20" style={{ color: '#C97B8A' }}>
                  Rx
                </div>

                {/* Paper texture overlay */}
                <div className="absolute inset-0 paper-texture opacity-20" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4 justify-center">
                    <Trophy className="w-6 h-6" style={{ color: '#C97B8A' }} />
                    <h3 className="font-playfair text-lg font-semibold" style={{ color: '#1F2A44' }}>
                      Quiz Complete!
                    </h3>
                  </div>

                  <div className="text-center py-4 border-y-2 mb-4" style={{ borderColor: '#E6DDD4' }}>
                    <p className="font-caveat text-xl mb-2" style={{ color: '#6B7280' }}>
                      Doctor Score
                    </p>
                    <p className="font-playfair text-4xl font-bold" style={{ color: '#1F2A44' }}>
                      {doctorScore} / 20
                    </p>
                    <p className="font-caveat text-lg mt-2" style={{ color: '#C97B8A' }}>
                      {correctAnswers} correct out of {doctorQuestions.length}
                    </p>
                  </div>

                  {/* Prescription */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <ClipboardList className="w-5 h-5" style={{ color: '#C97B8A' }} />
                      <h4 className="font-playfair font-semibold" style={{ color: '#1F2A44' }}>
                        Prescription Note
                      </h4>
                    </div>

                    <div
                      className="p-4 rounded-lg"
                      style={{ background: '#FAF6F1', border: '1px dashed #C97' }}
                    >
                      <p className="font-cormorant text-sm mb-3" style={{ color: '#6B7280' }}>
                        For: {prescriptionNote.patient}
                      </p>
                      <ul className="space-y-2">
                        {prescriptionNote.advice.map((item, i) => (
                          <li
                            key={i}
                            className="font-caveat text-lg flex items-start gap-2"
                            style={{ color: '#4B5563' }}
                          >
                            <span style={{ color: '#C97B8A', fontWeight: 'bold' }}>{i + 1}.</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-right mt-4 pt-4" style={{ borderTop: '1px dashed #E6DDD4' }}>
                    <p className="font-caveat text-sm" style={{ color: '#6B7280' }}>
                      Signed with love,
                    </p>
                    <p className="font-sacramento text-xl" style={{ color: '#C97B8A' }}>
                      {prescriptionNote.doctor}
                    </p>
                  </div>
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
                Continue to Next Chapter
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
                <Stethoscope className="w-5 h-5" style={{ color: '#C97B8A' }} />
                <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>
                  Chapter 2 Complete!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
