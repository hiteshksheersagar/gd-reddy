import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const C = { rose: '#E8B4B8', cream: '#FAF6F1' };

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        padding: '64px 16px',
        background: `linear-gradient(to bottom, ${C.rose}22, ${C.rose}55)`,
      }}
    >
      <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
        {/* Floating icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}
        >
          {[Sparkles, Heart, Star].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            >
              <Icon size={24} color={C.rose} />
            </motion.div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(22px, 4vw, 30px)',
            fontWeight: 700,
            color: '#1F2A44',
            marginBottom: '16px',
          }}
        >
          Made with love, just for you
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'Caveat, cursive', fontSize: '20px', color: '#4B5563', marginBottom: '32px' }}
        >
          Every pixel, every animation, every word—all crafted with you in mind
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ width: '128px', height: '1px', background: C.rose, margin: '0 auto 32px', opacity: 0.6 }}
        />

        {/* Quote */}
        <p style={{ fontFamily: 'Sacramento, cursive', fontSize: '26px', color: '#374151', marginBottom: '16px' }}>
          "You are my today and all of my tomorrows"
        </p>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '8px' }}
        >
          <Heart size={32} color={C.rose} fill={C.rose} />
        </motion.div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#9CA3AF', marginBottom: '48px' }}>
          With all my love, always
        </p>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9CA3AF' }}>
          A scrapbook of memories • Made with love
        </p>
      </div>
    </footer>
  );
}
