import { motion } from 'framer-motion';

interface FilmStripProps {
  images: string[];
  title?: string;
  className?: string;
}

export function FilmStrip({ images, title, className = '' }: FilmStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      {/* Film frame */}
      <div className="flex gap-2 overflow-hidden pb-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="flex-shrink-0 relative"
          >
            <div className="bg-gray-900 p-1 rounded">
              {/* Perforations */}
              <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1 bg-white/20 rounded-sm mx-0.5"
                  />
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1 bg-white/20 rounded-sm mx-0.5"
                  />
                ))}
              </div>

              <img
                src={img}
                alt={`Film frame ${index + 1}`}
                className="w-36 h-24 object-cover rounded-sm mx-2"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {title && (
        <p className="font-caveat text-lg text-gray-700 mt-2 text-center">
          {title}
        </p>
      )}
    </motion.div>
  );
}
