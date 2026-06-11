import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, MailOpen } from 'lucide-react';

const C = {
  cream: '#FAF6F1',
  blush: '#F5D6D6',
  rose: '#E8B4B8',
  navy: '#1F2A44',
};

interface EnvelopeProps {
  onOpen: () => void;
  message?: string;
  buttonText?: string;
}

export function Envelope({
  onOpen,
  message = "Ready to discover what's waiting for you?",
  buttonText = 'Open Letter',
}: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 400);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '0 16px',
      }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            onClick={handleOpen}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ position: 'relative', width: '280px', height: '200px' }}
            >
              {/* Envelope body */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '160px',
                  backgroundColor: C.blush,
                  borderRadius: '12px',
                  boxShadow: '0 12px 40px rgba(232, 180, 184, 0.4)',
                }}
              />

              {/* Side folds */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '160px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <svg viewBox="0 0 280 160" width="280" height="160">
                  {/* Left fold */}
                  <polygon points="0,0 140,95 0,160" fill="rgba(232,180,184,0.35)" />
                  {/* Right fold */}
                  <polygon points="280,0 140,95 280,160" fill="rgba(232,180,184,0.25)" />
                  {/* Bottom fold */}
                  <polygon points="0,160 140,80 280,160" fill="rgba(245,214,214,0.5)" />
                </svg>
              </div>

              {/* Flap */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '90px',
                  overflow: 'hidden',
                }}
              >
                <svg viewBox="0 0 280 90" width="280" height="90">
                  <polygon points="0,0 280,0 140,90" fill={C.rose} />
                </svg>
              </div>

              {/* Wax seal */}
              <div
                style={{
                  position: 'absolute',
                  top: '60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#1F2A44',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(31,42,68,0.3)',
                  zIndex: 2,
                }}
              >
                <Mail size={22} color={C.cream} />
              </div>

              {/* Click hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  bottom: '-36px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Caveat, cursive',
                    fontSize: '18px',
                    color: '#6B7280',
                  }}
                >
                  Click to open
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}
          >
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{
                    background: 'white',
                    padding: '40px 36px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                    border: `3px solid ${C.blush}`,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: C.rose }}
                  >
                    <MailOpen size={28} color="white" />
                  </motion.div>

                  <p
                    style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: '22px',
                      color: '#374151',
                      marginBottom: '24px',
                      lineHeight: 1.4,
                    }}
                  >
                    {message}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onOpen}
                    style={{
                      background: C.navy,
                      color: C.cream,
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '14px 36px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(31,42,68,0.2)',
                      transition: 'background 0.2s',
                    }}
                  >
                    {buttonText}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
