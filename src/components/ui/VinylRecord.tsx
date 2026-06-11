import { motion } from 'framer-motion';

interface VinylRecordProps {
  title: string;
  artist: string;
  coverImage: string;
  rotation?: number;
  className?: string;
}

export function VinylRecord({
  title,
  artist,
  coverImage,
  rotation = 0,
  className = '',
}: VinylRecordProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      className={`relative perspective ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-900 shadow-2xl flex items-center justify-center overflow-hidden"
      >
        {/* Grooves */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gray-700"
            style={{
              width: `${(i + 1) * 20}%`,
              height: `${(i + 1) * 20}%`,
            }}
          />
        ))}

        {/* Album cover in center */}
        <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gray-800">
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <p className="font-playfair text-sm font-semibold text-gray-800">{title}</p>
        <p className="font-caveat text-sm text-gray-600">{artist}</p>
      </motion.div>
    </motion.div>
  );
}
