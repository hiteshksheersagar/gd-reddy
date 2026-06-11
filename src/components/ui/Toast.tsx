import { motion, AnimatePresence } from 'framer-motion';
import { Check, Video as LucideIcon } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  subMessage?: string;
  icon?: LucideIcon;
}

export function Toast({ show, message, subMessage, icon: Icon = Check }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-20 md:bottom-8 left-1/2 z-50 pointer-events-none"
        >
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-full shadow-lg"
            style={{
              background: 'rgba(255, 253, 252, 0.98)',
              border: '2px solid #C8DCC6',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#C8DCC6' }}
            >
              <Icon className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <p className="font-caveat text-lg font-semibold" style={{ color: '#1F2A44' }}>
                {message}
              </p>
              {subMessage && (
                <p className="font-inter text-xs" style={{ color: '#6B7280' }}>
                  {subMessage}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
