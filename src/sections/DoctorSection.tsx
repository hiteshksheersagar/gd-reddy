import { motion } from 'framer-motion';
import { Stethoscope, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { QuizCard } from '../components/QuizCard';
import { Confetti, Stamp } from '../components/CelebrationEffects';
import { FairyLights } from '../components/ui/FairyLights';

interface DoctorSectionProps {
  onComplete: () => void;
}

const doctorQuestions = [
  {
    question: "What is the normal resting heart rate for adults?",
    options: ["20-40 bpm", "60-100 bpm", "150-200 bpm"],
    correct: 1,
  },
  {
    question: "Which instrument is commonly used to listen to heart sounds?",
    options: ["Thermometer", "Stethoscope", "Syringe"],
    correct: 1,
  },
  {
    question: "What does ECG stand for?",
    options: [
      "Electrocardiogram",
      "Electronic Chest Graph",
      "Energy Center Gauge"
    ],
    correct: 0,
  },
];

export default function DoctorSection({ onComplete }: DoctorSectionProps) {
  const [quizComplete, setQuizComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);

  const handleQuizComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowPrescription(true);
    }, 1000);
  };

  const handleContinue = () => {
    setQuizComplete(true);
    onComplete();
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
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            The <span className="text-scrapbook-rose">White Coat</span> Chronicles
          </h2>
          <p className="font-caveat text-xl md:text-2xl text-gray-600 max-w-xl mx-auto">
            Let's test your medical knowledge, Doctor!
          </p>
        </ScrollReveal>

        {!quizComplete ? (
          <div className="mb-12">
            {!showPrescription ? (
              <QuizCard
                title="Doctor's Quick Check"
                questions={doctorQuestions}
                onComplete={handleQuizComplete}
                completionStamp="Doctor Approved"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                {/* Prescription Pad */}
                <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-scrapbook-rose relative">
                  <div className="absolute top-4 right-4">
                    <Stamp show={true} text="✓ Approved" color="#D8E2D0" />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardList className="w-6 h-6 text-scrapbook-rose" />
                    <h3 className="font-playfair text-lg font-semibold text-gray-800">
                      Prescription
                    </h3>
                  </div>

                  <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                    <p className="font-caveat text-sm text-gray-500 mb-2">
                      Patient: Gayatri Devi Reddy
                    </p>
                    <p className="font-caveat text-sm text-gray-500">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-center py-6">
                    <p className="font-sacramento text-2xl text-scrapbook-rose mb-2">
                      Approved for
                    </p>
                    <p className="font-playfair text-3xl font-bold text-gray-800">
                      Unlimited Happiness
                    </p>
                  </div>

                  <div className="text-right mt-4">
                    <p className="font-caveat text-sm text-gray-500">
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
                    boxShadow: '0 8px 20px rgba(31,42,68,0.2)',
                  }}
                >
                  Unlock Next Chapter
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-scrapbook-sage/50 px-6 py-3 rounded-full">
              <Stethoscope className="w-5 h-5 text-scrapbook-rose" />
              <span className="font-caveat text-xl text-gray-700">Chapter 2 Complete!</span>
            </div>
          </motion.div>
        )}
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}
