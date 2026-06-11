import { motion } from 'framer-motion';

interface FairyLightsProps {
  count?: number;
  className?: string;
}

export function FairyLights({ count = 12, className = '' }: FairyLightsProps) {
  const colors = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-200',
    'bg-green-200',
    'bg-purple-200',
    'bg-orange-200',
  ];

  return (
    <div className={`absolute w-full ${className}`}>
      <svg
        viewBox="0 0 800 40"
        className="w-full h-10"
        preserveAspectRatio="none"
      >
        {/* Wire */}
        <path
          d="M 0 20 Q 100 40 200 20 Q 300 0 400 20 Q 500 40 600 20 Q 700 0 800 20"
          fill="none"
          stroke="currentColor"
          className="text-gray-800"
          strokeWidth="1"
        />
      </svg>

      <div className="flex justify-around items-start px-8 -mt-6">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]} shadow-lg`}
            style={{
              boxShadow: `0 0 8px ${colors[i % colors.length].replace('bg-', '')}, 0 0 16px currentColor`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
