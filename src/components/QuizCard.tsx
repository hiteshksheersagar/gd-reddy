import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, X, Award } from 'lucide-react';
import { Stamp } from './CelebrationEffects';

const C = {
  cream: '#FAF6F1',
  blush: '#F5D6D6',
  rose: '#E8B4B8',
  sage: '#D8E2D0',
};

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizCardProps {
  title: string;
  questions: Question[];
  onComplete: () => void;
  completionStamp?: string;
}

export function QuizCard({ title, questions, onComplete, completionStamp = 'Approved!' }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showStamp, setShowStamp] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);
    if (correct) setCorrectAnswers((p) => p + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((p) => p + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowStamp(true);
        setTimeout(() => {
          setIsComplete(true);
          onComplete();
        }, 1500);
      }
    }, 1300);
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
    };

    if (selectedAnswer === null) {
      return { ...base, background: C.cream, borderColor: '#E5E7EB' };
    }
    if (index === questions[currentQuestion].correct) {
      return { ...base, background: '#D1FAE5', borderColor: '#6EE7B7', color: '#065F46' };
    }
    if (selectedAnswer === index) {
      return { ...base, background: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' };
    }
    return { ...base, background: '#F9FAFB', borderColor: 'transparent', opacity: 0.6 };
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '480px',
          margin: '0 auto',
          border: `3px solid ${C.blush}`,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: C.sage }}
        >
          <Award className="w-8 h-8 text-white" />
        </motion.div>
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '24px',
            fontWeight: 700,
            color: '#1F2A44',
            marginBottom: '8px',
          }}
        >
          {completionStamp}
        </h3>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '20px', color: '#6B7280' }}>
          {correctAnswers} out of {questions.length} correct!
        </p>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'white',
        padding: '32px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        maxWidth: '520px',
        margin: '0 auto',
        position: 'relative',
        border: `3px solid ${C.blush}`,
      }}
    >
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {questions.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              background:
                i < currentQuestion ? C.sage : i === currentQuestion ? C.rose : '#E5E7EB',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Question counter */}
      <p
        style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '18px',
          color: C.rose,
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        Question {currentQuestion + 1} of {questions.length}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '20px',
          fontWeight: 700,
          color: '#1F2A44',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>

      {/* Question */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#374151',
          textAlign: 'center',
          marginBottom: '24px',
          lineHeight: 1.5,
        }}
      >
        {currentQ.question}
      </p>

      {/* Options */}
      <div>
        {currentQ.options.map((option, index) => (
          <motion.button
            key={`${currentQuestion}-${index}`}
            whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
            whileTap={{ scale: selectedAnswer === null ? 0.97 : 1 }}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            style={getOptionStyle(index)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{option}</span>
              {selectedAnswer !== null && (
                <>
                  {index === currentQ.correct && <Check size={18} color="#059669" />}
                  {selectedAnswer === index && !isCorrect && <X size={18} color="#DC2626" />}
                </>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <Stamp show={showStamp && currentQuestion === questions.length - 1} text="Doctor Approved" />
    </motion.div>
  );
}
